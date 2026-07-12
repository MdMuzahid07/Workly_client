/**
 * Chat Notification Sound Utility
 *
 * Sourcing & Best Practice Guidelines (GDC / Enterprise Standards):
 * 1. Preloads high-quality compressed audio assets (.webm / .mp3) for instant playback.
 * 2. Next.js SSR-Safe: Checks for `window` before constructing instances to prevent build/SSR issues.
 * 3. Graceful Degradation: Plays nothing (fails silently in console) if blocked by browser autoplay rules
 *    or offline status, relying entirely on visual indicators (toasts/badges) instead of jarring synthesized beeps.
 * 4. Spam Prevention: Throttles audio triggers to prevent overlapping chimes (minimum 1-second delay).
 * 5. Full Type-Safety: Utilizes the Redux RootState from store for user preference synchronization.
 */

import { Howl } from 'howler';
import { store, RootState } from '../redux/store';

let sentSound: Howl | null = null;
let receivedSound: Howl | null = null;
let lastPlayReceivedTime = 0;

/**
 * Lazy initializer for message-sent sound.
 * Prevents SSR crashes in Next.js.
 */
const getSentSound = (): Howl | null => {
  if (typeof window === 'undefined') return null;

  if (!sentSound) {
    sentSound = new Howl({
      src: ['/sounds/message-sent.webm', '/sounds/message-sent.mp3'],
      volume: 0.5,
      preload: true,
    });

    sentSound.on('playerror', (id, err) => {
      console.warn('[Audio] Sent sound playback blocked or failed:', err);
    });
  }
  return sentSound;
};

/**
 * Lazy initializer for message-received sound.
 * Prevents SSR crashes in Next.js.
 */
const getReceivedSound = (): Howl | null => {
  if (typeof window === 'undefined') return null;

  if (!receivedSound) {
    receivedSound = new Howl({
      src: ['/sounds/message-received.webm', '/sounds/message-received.mp3'],
      volume: 0.5,
      preload: true,
    });

    receivedSound.on('playerror', (id, err) => {
      console.warn('[Audio] Received sound playback blocked or failed:', err);
    });
  }
  return receivedSound;
};

/**
 * Play sound for sent messages.
 */
export const playSent = (): void => {
  if (typeof window === 'undefined') return;

  const state = store.getState() as RootState;
  const isEnabled = state.notificationSound?.enabled ?? true;
  const volume = state.notificationSound?.volume ?? 0.5;

  if (!isEnabled) return;

  const sound = getSentSound();
  if (sound) {
    sound.volume(volume);
    sound.play();
  }
};

/**
 * Play sound for received messages with throttling to prevent overlapping sounds.
 */
export const playReceived = (): void => {
  if (typeof window === 'undefined') return;

  const state = store.getState() as RootState;
  const isEnabled = state.notificationSound?.enabled ?? true;
  const volume = state.notificationSound?.volume ?? 0.5;

  if (!isEnabled) return;

  // Throttle playbacks within 1 second to prevent "machine gun" sound spam
  const now = Date.now();
  if (now - lastPlayReceivedTime < 1000) {
    return;
  }
  lastPlayReceivedTime = now;

  const sound = getReceivedSound();
  if (sound) {
    sound.volume(volume);
    sound.play();
  }
};
