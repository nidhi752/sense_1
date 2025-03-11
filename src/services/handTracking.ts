import * as tf from '@tensorflow/tfjs';
import { Hands } from '@mediapipe/hands';

export class HandTrackingService {
  private hands: Hands;
  private model: tf.LayersModel | null = null;
  private isInitialized = false;
  private signMap = ['Hello', 'Thank you', 'Yes', 'No', 'Please'];

  constructor() {
    this.hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      }
    });

    this.hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // Initialize MediaPipe Hands
    await this.hands.initialize();

    try {
      // Load the model from the correct path
      this.model = await tf.loadLayersModel('/models/sign_language_model/model.json');
      console.log('Model loaded successfully');
      this.isInitialized = true;
    } catch (error) {
      console.error('Error loading the model:', error);
      // Create a new model if loading fails
      try {
        const { createAndSaveModel } = await import('./modelTraining');
        this.model = await createAndSaveModel();
        console.log('New model created and saved successfully');
        this.isInitialized = true;
      } catch (saveError) {
        console.error('Error creating and saving model:', saveError);
        // For demo purposes, we'll continue without the model
        this.isInitialized = true;
      }
    }
  }

  async processFrame(videoElement: HTMLVideoElement): Promise<string> {
    if (!this.isInitialized) {
      throw new Error('HandTrackingService not initialized');
    }

    return new Promise((resolve) => {
      this.hands.onResults((results) => {
        if (results.multiHandLandmarks && results.multiHandLandmarks[0]) {
          const prediction = this.predictSign(results.multiHandLandmarks[0]);
          resolve(prediction);
        } else {
          resolve('No hands detected');
        }
      });

      this.hands.send({ image: videoElement });
    });
  }

  private predictSign(landmarks: any): string {
    if (!landmarks || !this.model) return 'No hand landmarks detected';

    try {
      // Flatten landmarks into a 1D array of coordinates
      const coordinates = landmarks.flatMap((point: { x: number; y: number; z: number }) => [
        point.x, point.y, point.z
      ]);

      // Create a tensor from the coordinates
      const input = tf.tensor2d([coordinates]);

      // Get prediction
      const prediction = this.model.predict(input) as tf.Tensor;
      const predictionArray = prediction.dataSync();
      
      // Get the index of the highest probability
      const maxIndex = predictionArray.indexOf(Math.max(...Array.from(predictionArray)));
      
      // Cleanup tensors
      input.dispose();
      prediction.dispose();

      return this.signMap[maxIndex];
    } catch (error) {
      console.error('Error during prediction:', error);
      return 'Error processing sign';
    }
  }

  async stopProcessing(): Promise<void> {
    await this.hands.close();
    this.isInitialized = false;
  }
}