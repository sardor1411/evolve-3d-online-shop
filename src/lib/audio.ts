export class AudioEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;
  private lastPlayTime: Record<string, number> = {};
  private readonly DEBOUNCE_MS = 250;

  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.enabled = true;
  }

  enable() {
    this.enabled = true;
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  disable() {
    this.enabled = false;
  }

  private canPlay(key: string): boolean {
    if (!this.enabled || !this.ctx) return false;
    const now = Date.now();
    if (this.lastPlayTime[key] && now - this.lastPlayTime[key] < this.DEBOUNCE_MS) {
      return false;
    }
    this.lastPlayTime[key] = now;
    return true;
  }

  playPrimaryHover() {
    if (!this.canPlay('hover')) return;
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Barely audible, soft low-pitch "thud" or "click"
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  }

  playCartAdd() {
    if (!this.canPlay('cartAdd')) return;
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Premium "snap" or "pop" when item added to cart
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.005); // quiet peak, ~-24dB
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);

    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  }

  playTransition() {
    if (!this.canPlay('transition')) return;
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Deep, elegant "whoosh" for major page navigation / drawer open
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);

    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.21);
  }
}

export const audioEngine = new AudioEngine();
