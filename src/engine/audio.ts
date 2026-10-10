export class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleSound(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.playClick();
    }
    return this.enabled;
  }

  // Authentic Minecraft footstep crunch
  public playStep(blockType: string = 'grass') {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Noise buffer for footstep crunch
    const bufferSize = this.ctx.sampleRate * 0.08;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    filter.type = 'lowpass';
    if (blockType === 'wood' || blockType === 'oak_planks') {
      filter.frequency.setValueAtTime(350 + Math.random() * 50, t);
    } else if (blockType === 'stone' || blockType === 'cobblestone') {
      filter.frequency.setValueAtTime(600 + Math.random() * 100, t);
    } else {
      // Grass / Dirt
      filter.frequency.setValueAtTime(250 + Math.random() * 80, t);
    }

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start(t);
  }

  // Block place pop
  public playBlockPlace() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160 + Math.random() * 20, t);
    osc.frequency.exponentialRampToValueAtTime(90, t + 0.07);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.07);
  }

  // Block break crack
  public playBlockBreak() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.15;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, t);
    filter.Q.setValueAtTime(1.5, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start(t);
  }

  // Chest open sound
  public playChestOpen() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(540, t + 0.25);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.28);
  }

  // Level Up / Achievement fanfare (Minecraft classic arpeggio: G4 -> B4 -> D5 -> G5)
  public playLevelUp() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [392.00, 493.88, 587.33, 783.99]; // G4, B4, D5, G5
    const t = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + idx * 0.1);

      gain.gain.setValueAtTime(0.18, t + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.1 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(t + idx * 0.1);
      osc.stop(t + idx * 0.1 + 0.35);
    });
  }

  // UI click sound
  public playClick() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1000, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.04);

    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.04);
  }

  // Low, distant thunder rumble for storm weather.
  public playThunder() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const duration = 2.4;
    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const samples = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const fade = Math.pow(1 - i / bufferSize, 2.2);
      samples[i] = (Math.random() * 2 - 1) * fade;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(170, t);
    filter.frequency.exponentialRampToValueAtTime(55, t + duration);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(0.22, t + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    source.start(t);
    source.stop(t + duration);
  }

  // Iconic high-pitched double-beep Auto-Rickshaw horn ("Pee-Pee!")
  public playHorn() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    for (const offset of [0, 0.12]) {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(460, t + offset);
      osc2.frequency.setValueAtTime(580, t + offset);

      gain.gain.setValueAtTime(0.18, t + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.09);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(t + offset);
      osc2.start(t + offset);
      osc1.stop(t + offset + 0.09);
      osc2.stop(t + offset + 0.09);
    }
  }

  // Deep resonant passenger train whistle
  public playTrainWhistle() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const freqs = [330, 440, 550];
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.16, t + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);

    for (const f of freqs) {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);
      osc.frequency.exponentialRampToValueAtTime(f * 0.96, t + 1.2);
      osc.connect(gain);
      osc.start(t);
      osc.stop(t + 1.2);
    }
    gain.connect(this.ctx.destination);
  }

  // Resonant Westminster Chimes & Great Bell ("Big Ben" E-natural strike)
  public playBell() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // 1. Westminster Quarters Chime Sequence (G#4, E4, F#4, B3)
    const quarters = [
      { f: 415.30, time: 0.0, dur: 0.8 }, // G#4
      { f: 329.63, time: 0.5, dur: 0.8 }, // E4
      { f: 369.99, time: 1.0, dur: 0.8 }, // F#4
      { f: 246.94, time: 1.5, dur: 1.0 }, // B3
    ];

    for (const q of quarters) {
      const qTime = t + q.time;
      // Fundamental
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(q.f, qTime);
      gain.gain.setValueAtTime(0.22, qTime);
      gain.gain.exponentialRampToValueAtTime(0.001, qTime + q.dur);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(qTime);
      osc.stop(qTime + q.dur);

      // Soft bell harmonic overtone
      const hOsc = this.ctx.createOscillator();
      const hGain = this.ctx.createGain();
      hOsc.type = 'triangle';
      hOsc.frequency.setValueAtTime(q.f * 2.76, qTime);
      hGain.gain.setValueAtTime(0.06, qTime);
      hGain.gain.exponentialRampToValueAtTime(0.001, qTime + q.dur * 0.6);
      hOsc.connect(hGain);
      hGain.connect(this.ctx.destination);
      hOsc.start(qTime);
      hOsc.stop(qTime + q.dur * 0.6);
    }

    // 2. The 13.7-Tonne Great Bell Deep E-Natural Strike at t + 2.3s
    const strikeTime = t + 2.3;
    const strikeDur = 3.8;
    const baseFreq = 164.81; // E3 Great Bell primary tone

    // Primary bell tone
    const bOsc = this.ctx.createOscillator();
    const bGain = this.ctx.createGain();
    bOsc.type = 'sine';
    bOsc.frequency.setValueAtTime(baseFreq, strikeTime);
    bGain.gain.setValueAtTime(0.45, strikeTime);
    bGain.gain.exponentialRampToValueAtTime(0.0005, strikeTime + strikeDur);
    bOsc.connect(bGain);
    bGain.connect(this.ctx.destination);
    bOsc.start(strikeTime);
    bOsc.stop(strikeTime + strikeDur);

    // Deep sub-octave rumble (E2 82.4 Hz)
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(baseFreq * 0.5, strikeTime);
    subGain.gain.setValueAtTime(0.35, strikeTime);
    subGain.gain.exponentialRampToValueAtTime(0.0005, strikeTime + strikeDur * 0.85);
    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start(strikeTime);
    subOsc.stop(strikeTime + strikeDur * 0.85);

    // Metallic bronze strike transients (overtones)
    for (const mult of [2.4, 3.8, 5.2]) {
      const harmOsc = this.ctx.createOscillator();
      const harmGain = this.ctx.createGain();
      harmOsc.type = 'triangle';
      harmOsc.frequency.setValueAtTime(baseFreq * mult, strikeTime);
      harmGain.gain.setValueAtTime(0.12 / mult, strikeTime);
      harmGain.gain.exponentialRampToValueAtTime(0.0005, strikeTime + 1.2);
      harmOsc.connect(harmGain);
      harmGain.connect(this.ctx.destination);
      harmOsc.start(strikeTime);
      harmOsc.stop(strikeTime + 1.2);
    }
  }

  // Sacred Indian bronze temple bell with rich overtones
  public playTempleBell() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const partials = [587.33, 1174.66, 1762.0, 2349.3]; // D5 with pure bronze harmonics
    const weights = [0.22, 0.12, 0.08, 0.04];
    const decays = [2.4, 1.8, 1.2, 0.8];

    partials.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      // Subtle pitch bend for authentic hammered metal
      osc.frequency.exponentialRampToValueAtTime(freq * 0.992, t + decays[idx]);
      gain.gain.setValueAtTime(weights[idx], t);
      gain.gain.exponentialRampToValueAtTime(0.0005, t + decays[idx]);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(t);
      osc.stop(t + decays[idx]);
    });
  }

  // Classic Indian Auto-Rickshaw "Pee-Peep!" horn
  public playAutoHorn() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    [0, 0.11].forEach((delay) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, t + delay);
      osc.frequency.linearRampToValueAtTime(940, t + delay + 0.07);
      gain.gain.setValueAtTime(0.18, t + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(t + delay);
      osc.stop(t + delay + 0.08);
    });
  }

  // Melodic plucked Sitar chime with sympathetic string resonance
  public playSitar() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Main note (D4) with quick buzz (jawari)
    const notes = [293.66, 440.0, 587.33];
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t + i * 0.08);
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq * 2.2, t + i * 0.08);
      filter.Q.setValueAtTime(3.0, t + i * 0.08);
      gain.gain.setValueAtTime(0.12, t + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.8);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(t + i * 0.08);
      osc.stop(t + i * 0.08 + 0.8);
    });
  }

  // ISRO Space Rocket deep thruster rumble
  public playRocketRumble() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(65, t);
    osc.frequency.linearRampToValueAtTime(120, t + 0.6);
    osc.frequency.exponentialRampToValueAtTime(45, t + 1.4);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(240, t);
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.22, t + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 1.4);
  }

  // Street food eating / cutting chai slurp sound
  public playSlurp() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.exponentialRampToValueAtTime(750, t + 0.12);
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.14);
  }

  // Wildlife sound generator for safari animals
  public playAnimalSound(type: string) {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    if (type === 'tiger' || type === 'lion') {
      // Low roaring swell / rumble
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(type === 'tiger' ? 85 : 95, t);
      osc.frequency.linearRampToValueAtTime(140, t + 0.4);
      osc.frequency.exponentialRampToValueAtTime(60, t + 1.2);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, t);
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.22, t + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 1.2);
    } else if (type === 'peacock') {
      // High-pitched celebratory peacock call ("Mayura ke-ka!")
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(680, t);
      osc.frequency.linearRampToValueAtTime(920, t + 0.2);
      osc.frequency.exponentialRampToValueAtTime(540, t + 0.7);
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.16, t + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.7);
    } else if (type === 'elephant' || type === 'temple_elephant') {
      // High-to-low brassy trumpet
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(380, t);
      osc.frequency.linearRampToValueAtTime(480, t + 0.25);
      osc.frequency.exponentialRampToValueAtTime(260, t + 0.95);
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.95);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.95);
    } else if (type === 'sheep') {
      // Gentle bleat
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, t);
      osc.frequency.linearRampToValueAtTime(260, t + 0.3);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.45);
    } else if (type === 'penguin') {
      // Playful honk / chirp
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.15);
      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.25);
    } else {
      // Gentle nature chirp / snort for panda, pig, zebra, giraffe, flamingo
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.linearRampToValueAtTime(420, t + 0.08);
      osc.frequency.exponentialRampToValueAtTime(220, t + 0.2);
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.2);
    }
  }
}

export const sound = new SoundEngine();
