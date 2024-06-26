import React, { useState, useEffect } from 'react';
import './Transcript.css';

const Transcript = ({ text, audioRef }) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;

    const handleTimeUpdate = () => {
      const currentTime = audioRef.current.currentTime;
      const index = findHighlightedIndex(currentTime);
      setHighlightedIndex(index);
    };

    const findHighlightedIndex = (currentTime) => {
      let totalDuration = 0;
      for (let i = 0; i < text.length; i++) {
        totalDuration += getParagraphDuration(i);
        if (currentTime < totalDuration) {
          return i;
        }
      }
      return -1;
    };

    const getParagraphDuration = (index) => {
      // Define custom durations for each paragraph
      const customDurations = [
        7, // Duration for the first paragraph
        7, // Duration for the second paragraph
        5, // Duration for the third paragraph
        7, // Duration for the fourth paragraph
        7, // Duration for the fifth paragraph
        5, // Duration for the sixth paragraph
        5, // Duration for the seventh paragraph
        8, // Duration for the eighth paragraph
        2, // Duration for the ninth paragraph
      ];
      // Return the duration for the corresponding paragraph index
      return customDurations[index] || 0;
    };

    const handleAudioPause = () => {
      setIsPaused(true);
    };

    const handleAudioPlay = () => {
      setIsPaused(false);
    };

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('pause', handleAudioPause);
    audioRef.current.addEventListener('play', handleAudioPlay);

    return () => {
      audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.removeEventListener('pause', handleAudioPause);
      audioRef.current.removeEventListener('play', handleAudioPlay);
    };
  }, [audioRef, text]);

  return (
    <div className={`transcript ${isPaused ? 'paused' : ''}`}>
      {text.map((sentence, index) => (
        <p key={index} role="paragraph" className={index === highlightedIndex ? 'highlighted' : ''}>
          {sentence}
        </p>
      ))}
    </div>
  );
};

export default Transcript;
