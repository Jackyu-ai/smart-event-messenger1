import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, MicOff } from 'lucide-react';
import { Event, EventType } from '../types';

interface VoiceInputProps {
  onAddEvent: (event: Omit<Event, 'id'>) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onAddEvent }) => {
  const [isListening, setIsListening] = useState(false);
  const [eventDetails, setEventDetails] = useState<Partial<Event>>({});
  const [currentQuestion, setCurrentQuestion] = useState<string>('');

  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      processVoiceInput(transcript);
    }
  }, [transcript]);

  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
      askNextQuestion();
    }
    setIsListening(!isListening);
  };

  const askNextQuestion = () => {
    if (!eventDetails.title) {
      setCurrentQuestion("What's the event title?");
    } else if (!eventDetails.date) {
      setCurrentQuestion("When is the event?");
    } else if (!eventDetails.type) {
      setCurrentQuestion("What type of event is this?");
    } else if (!eventDetails.recipient) {
      setCurrentQuestion("Who is this event for?");
    } else if (eventDetails.type === 'reminder' && !eventDetails.notes) {
      setCurrentQuestion("Any additional notes for this reminder?");
    } else {
      finishEventCreation();
    }
  };

  const processVoiceInput = (input: string) => {
    if (!eventDetails.title) {
      setEventDetails({ ...eventDetails, title: input });
    } else if (!eventDetails.date) {
      // Simple date parsing, you might want to use a more robust solution
      setEventDetails({ ...eventDetails, date: input });
    } else if (!eventDetails.type) {
      setEventDetails({ ...eventDetails, type: input as EventType });
    } else if (!eventDetails.recipient) {
      setEventDetails({ ...eventDetails, recipient: input });
    } else if (eventDetails.type === 'reminder' && !eventDetails.notes) {
      setEventDetails({ ...eventDetails, notes: input });
    }

    resetTranscript();
    askNextQuestion();
  };

  const finishEventCreation = () => {
    if (eventDetails.title && eventDetails.date && eventDetails.type && eventDetails.recipient) {
      onAddEvent(eventDetails as Omit<Event, 'id'>);
      setEventDetails({});
      setIsListening(false);
      SpeechRecognition.stopListening();
      setCurrentQuestion('');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Add Event by Voice</h2>
      <button
        onClick={toggleListening}
        className={`${
          isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        } text-white px-4 py-2 rounded flex items-center`}
      >
        {isListening ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      {currentQuestion && (
        <p className="mt-4 text-lg">
          <strong>Current question:</strong> {currentQuestion}
        </p>
      )}
      {transcript && (
        <p className="mt-4">
          <strong>You said:</strong> {transcript}
        </p>
      )}
    </div>
  );
};

export default VoiceInput;