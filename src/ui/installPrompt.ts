type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

/**
 * PWA Install Prompt Manager
 * Provides non-intrusive home screen installation guidance for mobile web & touch devices.
 */
export class InstallPromptManager {
  private deferredInstallPrompt: InstallPromptEvent | null = null;

  constructor(isTouchDevice: boolean) {
    this.setupInstallPrompt(isTouchDevice);
  }

  private setupInstallPrompt(isTouchDevice: boolean) {
    const prompt = document.getElementById('install-prompt');
    const installButton = document.getElementById('install-app-button');
    const continueButton = document.getElementById('continue-web-button');
    const description = document.getElementById('install-description');
    const help = document.getElementById('install-help');
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    let dismissed = false;
    try {
      dismissed = localStorage.getItem('install-prompt-dismissed') === 'true';
    } catch {
      /* storage may be disabled */
    }
    if (!prompt || !isTouchDevice || isStandalone || dismissed) return;

    const isAppleMobile = /iPhone|iPad|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (isAppleMobile && description) {
      description.textContent = 'Install it for a full-screen app experience. In Safari, tap Share, then “Add to Home Screen”.';
    }
    prompt.hidden = false;
    installButton?.focus({ preventScroll: true });

    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.deferredInstallPrompt = event as InstallPromptEvent;
    });
    window.addEventListener('appinstalled', () => {
      this.deferredInstallPrompt = null;
      prompt.hidden = true;
      document.getElementById('play-button')?.focus({ preventScroll: true });
    });

    installButton?.addEventListener('click', async () => {
      if (this.deferredInstallPrompt) {
        const installEvent = this.deferredInstallPrompt;
        this.deferredInstallPrompt = null;
        await installEvent.prompt();
        const choice = await installEvent.userChoice;
        if (choice.outcome === 'accepted') {
          prompt.hidden = true;
          document.getElementById('play-button')?.focus({ preventScroll: true });
        }
      } else if (help) {
        help.textContent = isAppleMobile
          ? 'In Safari: tap the Share button, scroll the menu, then choose “Add to Home Screen”.'
          : 'Open your browser menu and choose “Install app” or “Add to Home screen”.';
      }
    });
    continueButton?.addEventListener('click', () => {
      prompt.hidden = true;
      try {
        localStorage.setItem('install-prompt-dismissed', 'true');
      } catch {
        /* storage may be disabled */
      }
      document.getElementById('play-button')?.focus({ preventScroll: true });
    });
  }
}
