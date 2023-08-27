import React, { useEffect, useRef } from 'react';

export default function IntroTheme() {
  const audioRef = useRef(null);
  const pathToTheme = '../music/INTRO_David_Renda_2021-08-30_-_Boss_Time_-_www.FesliyanStudios.com.mp3'

  useEffect(() => {
    audioRef.current.play();
  }, []);

  return (
    <div>
      <audio ref={audioRef}>
        <source src={ pathToTheme } type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

