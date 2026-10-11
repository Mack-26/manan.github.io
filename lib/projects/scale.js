// Pure scale helpers for the hand-drawn SVG charts on project pages.

export const linearScale = ([d0, d1], [r0, r1]) => (x) => r0 + ((x - d0) / (d1 - d0)) * (r1 - r0);

export const logScale = ([d0, d1], [r0, r1]) => {
  const l0 = Math.log10(d0);
  const l1 = Math.log10(d1);
  return (x) => r0 + ((Math.log10(x) - l0) / (l1 - l0)) * (r1 - r0);
};

// Round tick values (1, 2, 5 × 10^n steps) that cover [min, max].
export function niceTicks(min, max, count = 5) {
  const raw = (max - min) / count;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const n = raw / mag;
  const step = (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * mag;
  const out = [];
  for (let v = Math.floor(min / step) * step; v <= Math.ceil(max / step) * step + 1e-9; v += step) {
    out.push(+v.toFixed(10));
  }
  return out;
}
