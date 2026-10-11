// Shared chart geometry. Every chart draws in a 520×320 viewBox scaled to its container.
export const W = 520;
export const H = 320;
export const M = { top: 16, right: 20, bottom: 44, left: 50 };

export const fmt = (v) => (Math.abs(v) >= 1000 ? `${+(v / 1000).toFixed(1)}k` : `${+v.toFixed(2)}`);

// Left gutter wide enough for the longest bar label (~7px per character at 12.5px).
export const labelGutter = (labels) => Math.max(80, Math.ceil(Math.max(...labels.map((l) => l.length)) * 7) + 16);
