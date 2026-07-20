/**
 * Cinematic Web Audio Synth Engine
 * Generates interactive high-tech sound effects (SFX) using pure browser oscillators and filters.
 * No asset dependencies mean instant playback, zero network latency, and zero broken links!
 * Also provides slots to use local audio files if the user wants to drop custom .mp3s in public/sounds.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  // Custom audio file paths (optional - if these files are placed in /public/sounds, they will be played instead of the synth)
  private fileUrls = {
    click: '/sounds/click.mp3',
    hover: '/sounds/hover.mp3',
    swoosh: '/sounds/swoosh.mp3',
    success: '/sounds/success.mp3',
  };

  constructor() {
    // Lazy initialisation on first user interaction to comply with browser autoplay security policies
    if (typeof window !== 'undefined') {
      const initAudioOnInteraction = () => {
        this.init();
        window.removeEventListener('click', initAudioOnInteraction);
        window.removeEventListener('touchstart', initAudioOnInteraction);
        window.removeEventListener('mousemove', initAudioOnInteraction);
        window.removeEventListener('mousedown', initAudioOnInteraction);
        window.removeEventListener('keydown', initAudioOnInteraction);
        window.removeEventListener('scroll', initAudioOnInteraction);
      };
      window.addEventListener('click', initAudioOnInteraction);
      window.addEventListener('touchstart', initAudioOnInteraction);
      window.addEventListener('mousemove', initAudioOnInteraction);
      window.addEventListener('mousedown', initAudioOnInteraction);
      window.addEventListener('keydown', initAudioOnInteraction);
      window.addEventListener('scroll', initAudioOnInteraction, { passive: true });
    }
  }

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    // Resume context if suspended
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleSound(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  /**
   * Helper to play high-fidelity synthesis instantly with zero delay
   */
  private playFileOrSynth(fileUrl: string, synthCallback: () => void) {
    if (!this.soundEnabled) return;
    this.init();

    // Bypassing async Audio constructor/network checks to achieve absolute zero-latency playback.
    // The synth runs on local Web Audio oscillators instantly.
    if (this.ctx) {
      synthCallback();
    }
  }

  /**
   * 1. Soft Digital Hover Tick
   */
  public playHover() {
    // Disabled per user request to improve performance and avoid background audio distractions
  }

  /**
   * 2. Crisp Tech Click
   */
  public playClick() {
    this.playFileOrSynth(this.fileUrls.click, () => {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1000, now);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);

      gain.gain.setValueAtTime(0.08, now); // responsive volume
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    });
  }

  /**
   * 3. Cinematic Sub-Swoosh
   * Deep sine sweep with low-pass filters for slide changes & modal transitions
   */
  public playSwoosh() {
    // Disabled per user request
  }

  /**
   * 5. High-Tech Glitch Swipe/Whoosh (Cybernetic entrance whoosh)
   */
  public playSloganSwipe() {
    this.playFileOrSynth(this.fileUrls.swoosh, () => {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Noise buffer for realistic air/wind whoosh + pitch sweep oscillator
      const bufferSize = this.ctx.sampleRate * 0.25; // 0.25 seconds
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(300, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(3500, now + 0.25);
      noiseFilter.Q.setValueAtTime(8, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.09, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      // Electronic sweep oscillator for high-tech digital vibe
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.exponentialRampToValueAtTime(1800, now + 0.22);

      const oscFilter = this.ctx.createBiquadFilter();
      oscFilter.type = 'lowpass';
      oscFilter.frequency.setValueAtTime(400, now);
      oscFilter.frequency.exponentialRampToValueAtTime(3000, now + 0.2);

      oscGain.gain.setValueAtTime(0.05, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);

      osc.connect(oscFilter);
      oscFilter.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      noiseNode.start(now);
      osc.start(now);
      osc.stop(now + 0.25);
    });
  }

  /**
   * 4. Modern Digital Success Chime
   * Harmonic notes arpeggiation (perfect for form submissions)
   */
  public playSuccess() {
    this.playFileOrSynth(this.fileUrls.success, () => {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Beautiful major pentatonic cyber chords (E5, A5, B5, E6)
      const notes = [329.63, 440.00, 493.88, 659.25]; 
      
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const noteTime = now + idx * 0.08;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, noteTime);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.0, noteTime);
        gain.gain.linearRampToValueAtTime(0.04, noteTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.45);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.5);
      });
    });
  }
}

export const playAudio = new AudioEngine();
