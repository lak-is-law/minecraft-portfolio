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

  // Resonant bell chime for Big Ben & temple bells
  public playBell() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, t); // C5
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.8);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 1.8);
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
}

export const sound = new SoundEngine();
