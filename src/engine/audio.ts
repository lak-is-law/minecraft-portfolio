export class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private rainSource: AudioBufferSourceNode | null = null;
  private rainGain: GainNode | null = null;

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
    } else {
      this.stopRainAmbient();
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

  // Atmospheric rain ambient sound loop
  public startRainAmbient(volume: number = 0.14) {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    if (this.rainGain) {
      // Already running, just adjust volume ramp
      const t = this.ctx.currentTime;
      this.rainGain.gain.cancelScheduledValues(t);
      this.rainGain.gain.linearRampToValueAtTime(volume, t + 0.8);
      return;
    }

    const t = this.ctx.currentTime;
    // 2-second looping white/pink rain noise buffer
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink noise approximation for soft raindrops
      b0 = 0.99765 * b0 + white * 0.0990460;
      b1 = 0.96300 * b1 + white * 0.2965164;
      b2 = 0.57000 * b2 + white * 1.0526913;
      const pink = (b0 + b1 + b2 + white * 0.1848) * 0.12;
      // Micro-fluctuations mimicking distant drops hitting surfaces
      const micro = Math.sin(i * 0.005) * 0.04;
      data[i] = pink + micro;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1100, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(volume, t + 1.2);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    source.start(t);
    this.rainSource = source;
    this.rainGain = gain;
  }

  public stopRainAmbient() {
    if (!this.rainGain || !this.ctx) return;
    const t = this.ctx.currentTime;
    const gain = this.rainGain;
    const source = this.rainSource;
    this.rainGain = null;
    this.rainSource = null;

    gain.gain.cancelScheduledValues(t);
    gain.gain.linearRampToValueAtTime(0.0001, t + 1.2);
    setTimeout(() => {
      try {
        source?.stop();
        source?.disconnect();
        gain.disconnect();
      } catch {
        // already disconnected
      }
    }, 1300);
  }

  // Intense, atmospheric thunder strike with sharp electric crack & deep rolling rumble.
  public playThunder() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // 1. Sharp electric crack transient (immediate lightning strike impact)
    const crackLen = 0.12;
    const crackSize = Math.floor(this.ctx.sampleRate * crackLen);
    const crackBuffer = this.ctx.createBuffer(1, crackSize, this.ctx.sampleRate);
    const crackData = crackBuffer.getChannelData(0);
    for (let i = 0; i < crackSize; i++) {
      crackData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / crackSize, 1.5);
    }
    const crackSource = this.ctx.createBufferSource();
    crackSource.buffer = crackBuffer;
    const crackFilter = this.ctx.createBiquadFilter();
    crackFilter.type = 'highpass';
    crackFilter.frequency.setValueAtTime(450, t);
    const crackGain = this.ctx.createGain();
    crackGain.gain.setValueAtTime(0.35, t);
    crackGain.gain.exponentialRampToValueAtTime(0.001, t + crackLen);
    crackSource.connect(crackFilter);
    crackFilter.connect(crackGain);
    crackGain.connect(this.ctx.destination);
    crackSource.start(t);

    // 2. Rolling bass rumble reverberating across the mountains & plains
    const rumbleDuration = 3.2;
    const rumbleSize = Math.floor(this.ctx.sampleRate * rumbleDuration);
    const rumbleBuffer = this.ctx.createBuffer(1, rumbleSize, this.ctx.sampleRate);
    const rumbleData = rumbleBuffer.getChannelData(0);
    for (let i = 0; i < rumbleSize; i++) {
      const progress = i / rumbleSize;
      const decay = Math.pow(1 - progress, 1.8);
      // Rolling wave swell
      const wave = Math.sin(progress * 18 * Math.PI) * 0.25;
      rumbleData[i] = ((Math.random() * 2 - 1) * 0.8 + wave) * decay;
    }

    const rumbleSource = this.ctx.createBufferSource();
    rumbleSource.buffer = rumbleBuffer;
    const rumbleFilter = this.ctx.createBiquadFilter();
    rumbleFilter.type = 'lowpass';
    rumbleFilter.frequency.setValueAtTime(220, t);
    rumbleFilter.frequency.exponentialRampToValueAtTime(45, t + rumbleDuration);

    const rumbleGain = this.ctx.createGain();
    rumbleGain.gain.setValueAtTime(0.001, t);
    rumbleGain.gain.linearRampToValueAtTime(0.32, t + 0.15);
    rumbleGain.gain.exponentialRampToValueAtTime(0.001, t + rumbleDuration);

    rumbleSource.connect(rumbleFilter);
    rumbleFilter.connect(rumbleGain);
    rumbleGain.connect(this.ctx.destination);
    rumbleSource.start(t + 0.03);

    // 3. Sub-bass sine boom for visceral impact
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(80, t);
    subOsc.frequency.exponentialRampToValueAtTime(32, t + 0.9);
    subGain.gain.setValueAtTime(0.28, t);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start(t);
    subOsc.stop(t + 0.9);
  }

  // Ethereal celestial chime / shimmer sound when Aurora Borealis glows
  public playAuroraChime() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Harmonic notes: E5, G#5, B5, E6, F#6
    const freqs = [659.25, 830.61, 987.77, 1318.51, 1479.98];
    freqs.forEach((freq, idx) => {
      const noteTime = t + idx * 0.12;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.001, noteTime);
      gain.gain.linearRampToValueAtTime(0.08, noteTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 1.8);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 1.8);
    });
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

  // Authentic Minecraft villager "Huh!" dialogue chime
  public playVillagerHuh() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'sawtooth';
    osc2.type = 'triangle';
    osc1.frequency.setValueAtTime(145, t);
    osc1.frequency.exponentialRampToValueAtTime(110, t + 0.32);
    osc2.frequency.setValueAtTime(140, t);
    osc2.frequency.exponentialRampToValueAtTime(105, t + 0.32);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(480, t);
    filter.frequency.exponentialRampToValueAtTime(320, t + 0.32);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.32);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.32);
    osc2.stop(t + 0.32);
  }

  // Playful companion dog bark for Roger
  public playDogBark() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, t);
    osc.frequency.exponentialRampToValueAtTime(180, t + 0.14);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(650, t);

    gain.gain.setValueAtTime(0.22, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.16);
  }

  // Lightning McQueen signature "Ka-Chow! ⚡" energetic chime & racing fanfare
  public playKaChow() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // 1. "Ka-" punch (quick sharp rev burst)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(320, t);
    osc1.frequency.exponentialRampToValueAtTime(560, t + 0.1);
    gain1.gain.setValueAtTime(0.25, t);
    gain1.gain.exponentialRampToValueAtTime(0.01, t + 0.12);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(t);
    osc1.stop(t + 0.12);

    // 2. "-CHOW!" electric lightning spark & twin ascending power chord
    const osc2 = this.ctx.createOscillator();
    const osc3 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc2.type = 'triangle';
    osc3.type = 'sine';
    osc2.frequency.setValueAtTime(659, t + 0.1); // E5
    osc2.frequency.exponentialRampToValueAtTime(1318, t + 0.35); // E6
    osc3.frequency.setValueAtTime(880, t + 0.1); // A5
    osc3.frequency.exponentialRampToValueAtTime(1760, t + 0.35); // A6

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(400, t + 0.1);

    gain2.gain.setValueAtTime(0.001, t);
    gain2.gain.setValueAtTime(0.3, t + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(gain2);
    gain2.connect(this.ctx.destination);

    osc2.start(t + 0.1);
    osc3.start(t + 0.1);
    osc2.stop(t + 0.45);
    osc3.stop(t + 0.45);
  }

  // High-performance racecar engine roar and throttle rev
  public playRaceCarEngine(rev: number = 1.0) {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    const baseFreq = 95 * Math.max(0.7, Math.min(2.5, rev));
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(baseFreq, t);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, t + 0.18);

    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(baseFreq * 0.5, t);
    subOsc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, t + 0.18);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650 * rev, t);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    subOsc.start(t);
    osc.stop(t + 0.22);
    subOsc.stop(t + 0.22);
  }

  // Drift tire screech on pavement
  public playTireDrift() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(840, t);
    osc.frequency.linearRampToValueAtTime(620, t + 0.15);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, t);
    filter.Q.value = 3.0;

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.15);
  }
}

export const sound = new SoundEngine();
