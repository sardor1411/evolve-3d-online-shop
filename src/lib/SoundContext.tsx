import React, { createContext, useContext, useState } from 'react';
import { audioEngine } from './audio';

interface SoundContextType {
  playPrimaryHover: () => void;
  playTransition: () => void;
  playCartAdd: () => void;
  enableAudio: () => void;
  isAudioEnabled: boolean;
}

const SoundContext = createContext<SoundContextType | null>(null);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  const enableAudio = () => {
    audioEngine.init();
    setIsAudioEnabled(true);
  };

  const playPrimaryHover = () => {
    if (!isAudioEnabled) return;
    audioEngine.playPrimaryHover();
  };

  const playTransition = () => {
    if (!isAudioEnabled) return;
    audioEngine.playTransition();
  };

  const playCartAdd = () => {
    if (!isAudioEnabled) return;
    audioEngine.playCartAdd();
  };

  return (
    <SoundContext.Provider value={{ playPrimaryHover, playTransition, playCartAdd, enableAudio, isAudioEnabled }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useUISounds = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useUISounds must be used within a SoundProvider');
  }
  return context;
};
