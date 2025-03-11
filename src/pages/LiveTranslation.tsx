import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Mic, Volume2, Languages } from 'lucide-react';
import { HandTrackingService } from '../services/handTracking';

const LiveTranslation = () => {
  const webcamRef = useRef<Webcam>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [handTracker, setHandTracker] = useState<HandTrackingService | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const frameProcessorRef = useRef<number>();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' }
  ];

  useEffect(() => {
    const tracker = new HandTrackingService();
    setHandTracker(tracker);

    return () => {
      if (frameProcessorRef.current) {
        cancelAnimationFrame(frameProcessorRef.current);
      }
      tracker.stopProcessing();
    };
  }, []);

  const processFrame = async () => {
    if (!isTranslating || !webcamRef.current?.video || !handTracker) return;

    try {
      const prediction = await handTracker.processFrame(webcamRef.current.video);
      if (prediction !== 'No hands detected') {
        setTranslatedText(prediction);
      }
    } catch (error) {
      console.error('Error processing frame:', error);
    }

    frameProcessorRef.current = requestAnimationFrame(processFrame);
  };

  const startTranslation = async () => {
    if (!handTracker) return;

    setIsInitializing(true);
    try {
      await handTracker.initialize();
      setIsTranslating(true);
      frameProcessorRef.current = requestAnimationFrame(processFrame);
    } catch (error) {
      console.error('Error initializing hand tracking:', error);
    } finally {
      setIsInitializing(false);
    }
  };

  const stopTranslation = async () => {
    setIsTranslating(false);
    if (frameProcessorRef.current) {
      cancelAnimationFrame(frameProcessorRef.current);
    }
    if (handTracker) {
      await handTracker.stopProcessing();
    }
  };

  const speakTranslation = () => {
    if ('speechSynthesis' in window && translatedText) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = selectedLanguage;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Live Translation</h2>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative aspect-video mb-6">
          <Webcam
            ref={webcamRef}
            className="rounded-lg w-full"
            mirrored={true}
            videoConstraints={{
              width: 1280,
              height: 720,
              facingMode: "user",
            }}
          />
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button
              onClick={isTranslating ? stopTranslation : startTranslation}
              disabled={isInitializing}
              className={`px-4 py-2 rounded-lg ${
                isTranslating
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } text-white transition disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isInitializing ? 'Initializing...' : isTranslating ? 'Stop Translation' : 'Start Translation'}
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Translation Output</h3>
            <div className="flex space-x-2">
              <button 
                className="p-2 hover:bg-gray-200 rounded-full"
                onClick={speakTranslation}
                disabled={!translatedText}
              >
                <Volume2 className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-full">
                <Languages className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          <p className="text-lg min-h-[100px] p-4 bg-white rounded-lg border">
            {translatedText || 'Translation will appear here...'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Translations</h3>
        <div className="space-y-4">
          {/* Placeholder for recent translations */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No recent translations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTranslation;