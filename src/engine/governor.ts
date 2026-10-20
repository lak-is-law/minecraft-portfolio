import * as THREE from "three";

export interface GovernorOptions {
  minDpr?: number;
  maxDpr?: number;
  targetFps?: number;
  canvas?: HTMLCanvasElement;
}

/**
 * Autonomous Performance Governor
 * Dynamically scales WebGL resolution to deliver maximum visual fidelity (up to 4K / 2.0 DPR)
 * while autonomously protecting the 16.6ms (60 FPS) frame budget against thermal throttling or lag.
 */
export class PerformanceGovernor {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly canvas?: HTMLCanvasElement;
  private readonly minDpr: number;
  private readonly maxDpr: number;
  private currentDpr: number;

  private frameTimes: Float32Array = new Float32Array(60);
  private frameIndex: number = 0;
  private frameCount: number = 0;
  private lastTime: number = performance.now();
  private lastScaleCheck: number = performance.now();

  constructor(renderer: THREE.WebGLRenderer, options: GovernorOptions = {}) {
    this.renderer = renderer;
    this.canvas = options.canvas;

    const deviceDpr = window.devicePixelRatio || 1;
    this.minDpr = options.minDpr ?? 1.25;
    this.maxDpr = options.maxDpr ?? Math.min(deviceDpr, 2.0);

    // Initial target: 1.75 on high-DPI screens for immediate HD crispness without 4x memory penalty
    this.currentDpr = Math.min(this.maxDpr, Math.max(this.minDpr, deviceDpr >= 2.0 ? 1.75 : deviceDpr));
    this.renderer.setPixelRatio(this.currentDpr);

    if (this.canvas) {
      this.canvas.style.imageRendering = "-webkit-optimize-contrast";
    }
  }

  public getDpr(): number {
    return this.currentDpr;
  }

  /**
   * Called every frame in the main render loop
   */
  public tick() {
    const now = performance.now();
    const dt = now - this.lastTime;
    this.lastTime = now;

    // Reject outlier delta times (e.g. tab switching or pause)
    if (dt > 0.5 && dt < 150) {
      this.frameTimes[this.frameIndex] = dt;
      this.frameIndex = (this.frameIndex + 1) % 60;
      if (this.frameCount < 60) this.frameCount++;
    }

    // Evaluate dynamic scaling every 1.5 seconds to avoid oscillating
    if (now - this.lastScaleCheck > 1500 && this.frameCount >= 45) {
      this.lastScaleCheck = now;
      this.evaluateResolutionScaling();
    }
  }

  private evaluateResolutionScaling() {
    let sum = 0;
    for (let i = 0; i < this.frameCount; i++) {
      sum += this.frameTimes[i];
    }
    const avgMs = sum / this.frameCount;

    // If comfortably under 13.5ms (~75+ FPS capacity), upgrade quality towards maxDpr
    if (avgMs < 13.5 && this.currentDpr < this.maxDpr) {
      const nextDpr = Math.min(this.maxDpr, +(this.currentDpr + 0.15).toFixed(2));
      if (nextDpr !== this.currentDpr) {
        this.currentDpr = nextDpr;
        this.renderer.setPixelRatio(this.currentDpr);
      }
    }
    // If exceeding 18.0ms (dropping below 55 FPS), gracefully scale down resolution
    else if (avgMs > 18.0 && this.currentDpr > this.minDpr) {
      const nextDpr = Math.max(this.minDpr, +(this.currentDpr - 0.15).toFixed(2));
      if (nextDpr !== this.currentDpr) {
        this.currentDpr = nextDpr;
        this.renderer.setPixelRatio(this.currentDpr);
      }
    }
  }

  public onResize() {
    this.renderer.setPixelRatio(this.currentDpr);
  }
}
