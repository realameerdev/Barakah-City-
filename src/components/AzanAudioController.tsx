import React, { useEffect, useRef } from 'react';
import azanAudioUrl from '../assets/audio/azan.mp3';

interface AzanAudioControllerProps {
  activeView: 'landing' | 'dashboard';
  isFading?: boolean;
}

// Subtle, atmospheric ambient background level
// In the dashboard/game, plays gently underneath gameplay so all coin chimes and action SFX remain prominent
const LANDING_VOLUME = 0.22;
const DASHBOARD_VOLUME = 0.14;
const PUBLIC_FALLBACK_AUDIO_PATH = '/assets/audio/azan.mp3';

// Singleton instance to prevent duplicate audio elements across fast refreshes or rerenders
let globalAudioInstance: HTMLAudioElement | null = null;
let globalFadeInterval: number | null = null;

export const AzanAudioController: React.FC<AzanAudioControllerProps> = ({
  activeView,
  isFading = false,
}) => {
  const isMutedRef = useRef(false);

  // Clear any active volume fading interval safely
  const clearFadeInterval = () => {
    if (globalFadeInterval !== null) {
      window.clearInterval(globalFadeInterval);
      globalFadeInterval = null;
    }
  };

  // Smoothly adjust audio volume to targetVol
  const fadeTo = (audio: HTMLAudioElement, targetVol: number, durationMs = 1000) => {
    clearFadeInterval();
    const currentVol = audio.volume;
    const diff = targetVol - currentVol;

    if (Math.abs(diff) < 0.01) {
      audio.volume = targetVol;
      if (targetVol <= 0.01) {
        audio.pause();
      }
      return;
    }

    const steps = 20;
    const intervalMs = Math.max(20, Math.floor(durationMs / steps));
    const stepIncrement = diff / steps;

    globalFadeInterval = window.setInterval(() => {
      if (!globalAudioInstance || globalAudioInstance !== audio) {
        clearFadeInterval();
        return;
      }
      const nextVol = Math.max(0, Math.min(1, globalAudioInstance.volume + stepIncrement));
      globalAudioInstance.volume = nextVol;

      if ((stepIncrement > 0 && nextVol >= targetVol) || (stepIncrement < 0 && nextVol <= targetVol)) {
        globalAudioInstance.volume = targetVol;
        if (targetVol <= 0.01) {
          globalAudioInstance.pause();
        }
        clearFadeInterval();
      }
    }, intervalMs);
  };

  useEffect(() => {
    // 1. Initialize single shared Audio instance once
    if (!globalAudioInstance && typeof window !== 'undefined') {
      const audio = new Audio();
      audio.src = azanAudioUrl || PUBLIC_FALLBACK_AUDIO_PATH;
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = 0;

      // Gracefully handle source error by falling back to public static path
      audio.onerror = () => {
        if (audio.src !== window.location.origin + PUBLIC_FALLBACK_AUDIO_PATH) {
          audio.src = PUBLIC_FALLBACK_AUDIO_PATH;
          audio.load();
        }
      };

      globalAudioInstance = audio;
    }

    const audio = globalAudioInstance;
    if (!audio) return;

    // Determine target background volume:
    // When in dashboard/game: plays gently underneath (DASHBOARD_VOLUME)
    // When on landing page: plays cinematic entrance (LANDING_VOLUME)
    const baseTargetVolume = activeView === 'dashboard' ? DASHBOARD_VOLUME : LANDING_VOLUME;
    const targetVolume = isFading || isMutedRef.current ? 0 : baseTargetVolume;

    // If audio is already playing, smoothly adjust to the appropriate background volume
    if (!audio.paused) {
      fadeTo(audio, targetVolume, 1200);
      return;
    }

    // If audio is paused and we want sound, attempt playback with graceful autoplay handling
    if (targetVolume > 0) {
      audio.volume = 0;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            fadeTo(audio, targetVolume, 1500);
          })
          .catch(() => {
            // Autoplay policy prevented immediate playback before user gesture.
            // Setup listener on first user interaction (touch, click, keypress) anywhere in window
            const handleFirstUserInteraction = () => {
              if (audio.paused && !isMutedRef.current) {
                audio.volume = 0;
                audio
                  .play()
                  .then(() => {
                    const currentTarget = activeView === 'dashboard' ? DASHBOARD_VOLUME : LANDING_VOLUME;
                    fadeTo(audio, currentTarget, 1200);
                  })
                  .catch(() => {});
              }
              cleanupUnlockListeners();
            };

            const cleanupUnlockListeners = () => {
              window.removeEventListener('pointerdown', handleFirstUserInteraction);
              window.removeEventListener('keydown', handleFirstUserInteraction);
              window.removeEventListener('touchstart', handleFirstUserInteraction);
              window.removeEventListener('click', handleFirstUserInteraction);
            };

            window.addEventListener('pointerdown', handleFirstUserInteraction, { once: true, passive: true });
            window.addEventListener('keydown', handleFirstUserInteraction, { once: true, passive: true });
            window.addEventListener('touchstart', handleFirstUserInteraction, { once: true, passive: true });
            window.addEventListener('click', handleFirstUserInteraction, { once: true, passive: true });
          });
      }
    }

    // Listen for in-game ambient audio toggle events from ThreeGameWorld settings
    const handleAmbientToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ enabled: boolean }>;
      const isEnabled = customEvent.detail ? customEvent.detail.enabled : true;
      isMutedRef.current = !isEnabled;

      if (!isEnabled) {
        fadeTo(audio, 0, 600);
      } else {
        const resumeVol = activeView === 'dashboard' ? DASHBOARD_VOLUME : LANDING_VOLUME;
        if (audio.paused) {
          audio.volume = 0;
          audio.play().then(() => fadeTo(audio, resumeVol, 800)).catch(() => {});
        } else {
          fadeTo(audio, resumeVol, 800);
        }
      }
    };

    window.addEventListener('baraka_ambient_audio_toggle', handleAmbientToggle);

    return () => {
      window.removeEventListener('baraka_ambient_audio_toggle', handleAmbientToggle);
    };
  }, [activeView, isFading]);

  return null;
};

export default AzanAudioController;
