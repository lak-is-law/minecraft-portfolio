import { mountMap } from './mount.js';

export { mountMap };

const container = document.getElementById('app-container') || document.body;
mountMap(container, {
  onTravel: (dest) => {
    console.log('Travel requested:', dest);
  },
  onClose: () => {
    console.log('Close requested');
  }
});
