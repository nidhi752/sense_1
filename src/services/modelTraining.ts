import * as tf from '@tensorflow/tfjs';

// Create a simple model for demonstration
export async function createAndSaveModel() {
  // Create a simple model that takes hand landmarks (21 points × 3 coordinates = 63 inputs)
  const model = tf.sequential();
  
  model.add(tf.layers.dense({
    inputShape: [63],
    units: 128,
    activation: 'relu'
  }));
  
  model.add(tf.layers.dropout({ rate: 0.2 }));
  
  model.add(tf.layers.dense({
    units: 64,
    activation: 'relu'
  }));
  
  model.add(tf.layers.dense({
    units: 5, // Number of signs we want to recognize
    activation: 'softmax'
  }));

  // Compile the model
  model.compile({
    optimizer: 'adam',
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
  });

  // Save the model
  await model.save('file:///public/models/sign_language_model');
  
  return model;
}