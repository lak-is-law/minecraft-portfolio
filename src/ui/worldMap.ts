// @ts-ignore
import { mountMap as mountMapFn } from '../../craftme-world-map/src/mount.js';

export interface MapInstance {
  setPlayer: (x: number, z: number, yaw?: number) => void;
  pause: () => void;
  resume: () => void;
  focusPlayer: () => void;
  dispose: () => void;
}

export function mountWorldMap(
  container: HTMLElement,
  options: {
    onTravel: (dest: { x: number; y?: number; z: number; coords?: [number, number, number]; name?: string }) => void;
    onClose: () => void;
  }
): MapInstance {
  return mountMapFn(container, options);
}
