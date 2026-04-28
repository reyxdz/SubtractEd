import mainBgMusic from '../assets/audio/bgmusic.mp3';
import activityBgMusic from '../assets/audio/activities_bg_music.flac';

// You can easily adjust how many seconds to skip at the start of the main background music right here!
const MAIN_MUSIC_START_SECONDS = 2;

class MusicManager {
  private static instance: MusicManager;
  private audioPlayer: HTMLAudioElement;
  private isMuted: boolean = false;
  private currentTrackType: 'main' | 'activity' = 'main';

  private constructor() {
    // Create audio element for the browser environment
    if (typeof window !== 'undefined') {
      this.audioPlayer = new Audio(mainBgMusic);
      this.audioPlayer.volume = 0.2; // Default to 20% volume so it's not overpowering

      // Pre-seek the main track to skip initial silence
      this.audioPlayer.currentTime = MAIN_MUSIC_START_SECONDS;

      // Custom loop handler to always skip the initial silence of the main track
      this.audioPlayer.addEventListener('ended', () => {
        if (this.currentTrackType === 'main') {
          this.audioPlayer.currentTime = MAIN_MUSIC_START_SECONDS;
        } else {
          this.audioPlayer.currentTime = 0;
        }
        if (!this.isMuted) {
          this.play();
        }
      });
    } else {
      // Mock for SSR if needed
      this.audioPlayer = {} as HTMLAudioElement;
    }
  }

  public static getInstance(): MusicManager {
    if (!MusicManager.instance) {
      MusicManager.instance = new MusicManager();
    }
    return MusicManager.instance;
  }

  public play() {
    if (this.isMuted || !this.audioPlayer.play) return;

    // Modern browsers require interaction before audio can play.
    // The play() method returns a Promise which we must catch to avoid console errors.
    const playPromise = this.audioPlayer.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.warn('Autoplay prevented by browser. Awaiting user interaction.');
      });
    }
  }

  public pause() {
    if (this.audioPlayer.pause) {
      this.audioPlayer.pause();
    }
  }

  public toggleMute(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.pause();
    } else {
      this.play();
    }
  }

  public getIsMuted() {
    return this.isMuted;
  }

  public switchTrack(type: 'main' | 'activity') {
    if (this.currentTrackType === type) return; // Do nothing if already playing target track

    this.currentTrackType = type;

    // Switch the audio source smoothly
    this.audioPlayer.src = type === 'activity' ? activityBgMusic : mainBgMusic;

    if (type === 'main') {
      this.audioPlayer.currentTime = MAIN_MUSIC_START_SECONDS;
    }

    // Only automatically play the new track if music is enabled and wasn't manually paused
    if (!this.isMuted) {
      this.play();
    }
  }
}

export const musicManager = MusicManager.getInstance();
