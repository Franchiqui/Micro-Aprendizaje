'use client';

import { create } from 'zustand';

export type RepeatMode = 'off' | 'one' | 'all';

export interface TrackItem {
  id: string;
  title: string;
  url: string;
  artist?: string;
  artwork?: string;
  duration?: number; // segundos
}

interface AudioStoreState {
  // Nota: NO controlar reproducción aquí (no isPlaying/setIsPlaying). Usa el hook de audio (play/pause).
  playlist: TrackItem[];
  currentIndex: number; // -1 si vacío
  volume: number; // 0..1
  muted: boolean;
  shuffle: boolean;
  repeat: RepeatMode;

  // Selectors
  currentTrack: () => TrackItem | undefined;

  // Actions (sin play/pause)
  setPlaylist: (items: TrackItem[], startIndex?: number) => void;
  setCurrentIndex: (index: number) => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  setShuffle: (on: boolean) => void;
  setRepeat: (mode: RepeatMode) => void;
  nextIndex: () => number;
  prevIndex: () => number;
}

export const useAudioStore = create<AudioStoreState>((set, get) => ({
  playlist: [],
  currentIndex: -1,
  volume: 1,
  muted: false,
  shuffle: false,
  repeat: 'off',

  currentTrack: () => {
    const { playlist, currentIndex } = get();
    return currentIndex >= 0 && currentIndex < playlist.length
      ? playlist[currentIndex]
      : undefined;
  },

  setPlaylist: (items, startIndex = 0) =>
    set(() => ({
      playlist: items,
      currentIndex: items.length > 0 ? Math.max(0, Math.min(startIndex, items.length - 1)) : -1,
    })),

  setCurrentIndex: (index) =>
    set(({ playlist }) => ({
      currentIndex: playlist.length > 0 ? Math.max(0, Math.min(index, playlist.length - 1)) : -1,
    })),

  setVolume: (v) => set(() => ({ volume: Math.max(0, Math.min(1, v)) })),

  toggleMute: () => set((s) => ({ muted: !s.muted })),

  setShuffle: (on) => set(() => ({ shuffle: on })),

  setRepeat: (mode) => set(() => ({ repeat: mode })),

  nextIndex: () => {
    const { playlist, currentIndex, shuffle, repeat } = get();
    if (playlist.length === 0) return -1;
    if (shuffle) {
      if (playlist.length === 1) return currentIndex;
      let next = currentIndex;
      while (next === currentIndex) {
        next = Math.floor(Math.random() * playlist.length);
      }
      return next;
    }
    const next = currentIndex + 1;
    if (next < playlist.length) return next;
    if (repeat === 'all') return 0;
    return -1; // fin de la lista
  },

  prevIndex: () => {
    const { playlist, currentIndex, shuffle, repeat } = get();
    if (playlist.length === 0) return -1;
    if (shuffle) {
      if (playlist.length === 1) return currentIndex;
      let prev = currentIndex;
      while (prev === currentIndex) {
        prev = Math.floor(Math.random() * playlist.length);
      }
      return prev;
    }
    const prev = currentIndex - 1;
    if (prev >= 0) return prev;
    if (repeat === 'all') return playlist.length - 1;
    return -1; // inicio de la lista
  },
}));

// Importa este store como: import { useAudioStore } from '@/lib/store/audio-store';
// Controla la reproducción con un hook (p.ej., useAudioPlayer) que exponga play()/pause().
