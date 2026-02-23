'use client';

import { useEffect, useRef } from 'react';

const PALETTES = [
  [255,  30, 110],  // hot pink
  [255, 185,   0],  // vivid yellow
  [110,  40, 255],  // electric purple
  [  0, 210, 120],  // emerald
  [255,  80,   0],  // orange-red
  [ 20, 150, 255],  // electric blue
  [255,   0, 180],  // magenta
  [  0, 220, 160],  // saturated mint
];

export default function FluidCanvas() {
  const colorRef  = useRef(null); // blurred fluid color layer
  const rippleRef = useRef(null); // sharp ripple / cursor layer

  useEffect(() => {
    const colorCanvas  = colorRef.current;
    const rippleCanvas = rippleRef.current;
    if (!colorCanvas || !rippleCanvas) return;

    const cc = colorCanvas.getContext('2d');
    const rc = rippleCanvas.getContext('2d');

    let animId;
    let mouseX = 0, mouseY = 0;
    let lastX  = 0, lastY  = 0;
    let velX   = 0, velY   = 0;
    let colorIdx  = 0;
    let frameCount = 0;
    let active = false;

    // Pool of live ripple rings
    const ripples = [];

    /* ── Resize both canvases ── */
    function resize() {
      colorCanvas.width  = colorCanvas.offsetWidth;
      colorCanvas.height = colorCanvas.offsetHeight;
      rippleCanvas.width  = rippleCanvas.offsetWidth;
      rippleCanvas.height = rippleCanvas.offsetHeight;
      cc.fillStyle = '#ffffff';
      cc.fillRect(0, 0, colorCanvas.width, colorCanvas.height);
    }
    resize();
    window.addEventListener('resize', resize);

    /* ── Velocity-stretched color ellipse on the color canvas ── */
    function splatEllipse(x, y, vx, vy, color, baseR) {
      const [r, g, b] = color;
      const speed   = Math.hypot(vx, vy);
      const angle   = Math.atan2(vy, vx);
      // Stretch along movement direction; squash perpendicular
      const stretch = 1 + Math.min(speed * 0.055, 2.2);
      const rx      = baseR * stretch;
      const ry      = baseR / Math.sqrt(stretch);

      cc.save();
      cc.translate(x, y);
      cc.rotate(angle);

      const grad = cc.createRadialGradient(0, 0, 0, 0, 0, rx);
      grad.addColorStop(0,    `rgba(${r},${g},${b},0.90)`);
      grad.addColorStop(0.38, `rgba(${r},${g},${b},0.50)`);
      grad.addColorStop(0.72, `rgba(${r},${g},${b},0.14)`);
      grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);

      cc.beginPath();
      cc.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      cc.fillStyle = grad;
      cc.fill();
      cc.restore();
    }

    /* ── Ambient blobs so canvas isn't blank on load ── */
    function paintInitialBlobs() {
      [
        { rx: 0.06, ry: 0.15, ci: 0, r: 180 },
        { rx: 0.88, ry: 0.10, ci: 1, r: 160 },
        { rx: 0.80, ry: 0.78, ci: 2, r: 190 },
        { rx: 0.14, ry: 0.82, ci: 5, r: 170 },
      ].forEach(({ rx, ry, ci, r }) => {
        const [pr, pg, pb] = PALETTES[ci];
        const x = rx * colorCanvas.width;
        const y = ry * colorCanvas.height;
        const g = cc.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0,   `rgba(${pr},${pg},${pb},0.70)`);
        g.addColorStop(0.5, `rgba(${pr},${pg},${pb},0.30)`);
        g.addColorStop(1,   `rgba(${pr},${pg},${pb},0)`);
        cc.beginPath();
        cc.arc(x, y, r, 0, Math.PI * 2);
        cc.fillStyle = g;
        cc.fill();
      });
    }
    paintInitialBlobs();

    /* ── Spawn an expanding ripple ring ── */
    function spawnRipple(x, y, color, speed) {
      ripples.push({
        x, y,
        radius:    8,
        maxRadius: 90 + speed * 5 + Math.random() * 50,
        opacity:   0.55,
        color,
        grow:      2.2 + speed * 0.06 + Math.random(),
      });
    }

    /* ── Mouse tracking ── */
    const hero = colorCanvas.parentElement;
    function onMouseMove(e) {
      const rect = colorCanvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      active = true;
    }
    function onMouseLeave() { active = false; }
    hero.addEventListener('mousemove', onMouseMove);
    hero.addEventListener('mouseleave', onMouseLeave);

    /* ── Main loop ── */
    function animate() {
      frameCount++;

      /* — Color canvas: fade toward white — */
      cc.fillStyle = 'rgba(255,255,255,0.020)';
      cc.fillRect(0, 0, colorCanvas.width, colorCanvas.height);

      if (active) {
        const dx   = mouseX - lastX;
        const dy   = mouseY - lastY;
        const dist = Math.hypot(dx, dy);

        if (dist > 2) {
          // Smooth velocity with exponential decay
          velX = velX * 0.55 + dx * 0.45;
          velY = velY * 0.55 + dy * 0.45;
          const speed = Math.hypot(velX, velY);

          const color  = PALETTES[colorIdx % PALETTES.length];
          const color2 = PALETTES[(colorIdx + 3) % PALETTES.length];

          // Primary displaced blob — stretched in direction of travel
          splatEllipse(mouseX, mouseY, velX, velY, color, 75 + speed * 1.8);

          // Wake blob slightly behind cursor
          if (speed > 3) {
            splatEllipse(
              mouseX - velX * 0.55,
              mouseY - velY * 0.55,
              velX, velY, color2,
              48 + speed * 1.2
            );
          }

          // Ripple rings — more frequent at higher speed
          const rippleEvery = Math.max(2, Math.round(8 / (1 + speed * 0.12)));
          if (frameCount % rippleEvery === 0) {
            spawnRipple(mouseX, mouseY, color, speed);
          }
          // Extra ripples when moving fast (splashing)
          if (speed > 18 && Math.random() > 0.5) {
            spawnRipple(
              mouseX + (Math.random() - 0.5) * 24,
              mouseY + (Math.random() - 0.5) * 24,
              color2, speed * 0.7
            );
          }

          colorIdx++;
          lastX = mouseX;
          lastY = mouseY;
        }
      }

      /* — Ripple canvas: clear and redraw all rings — */
      rc.clearRect(0, 0, rippleCanvas.width, rippleCanvas.height);

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        const [r, g, b] = rip.color;

        // Outer colored ring
        rc.beginPath();
        rc.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        rc.strokeStyle = `rgba(${r},${g},${b},${rip.opacity})`;
        rc.lineWidth = 1.8;
        rc.stroke();

        // Inner white shimmer ring (the light-diffraction look)
        if (rip.radius > 18) {
          rc.beginPath();
          rc.arc(rip.x, rip.y, rip.radius * 0.58, 0, Math.PI * 2);
          rc.strokeStyle = `rgba(255,255,255,${rip.opacity * 0.28})`;
          rc.lineWidth = 0.9;
          rc.stroke();
        }

        rip.radius  += rip.grow;
        rip.grow    *= 0.975;       // rings decelerate as they expand
        rip.opacity -= 0.006;

        if (rip.opacity <= 0 || rip.radius >= rip.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // Subtle cursor glow dot on the ripple canvas
      if (active) {
        rc.beginPath();
        rc.arc(mouseX, mouseY, 5, 0, Math.PI * 2);
        rc.fillStyle = 'rgba(255,255,255,0.75)';
        rc.fill();

        rc.beginPath();
        rc.arc(mouseX, mouseY, 16, 0, Math.PI * 2);
        rc.strokeStyle = 'rgba(255,255,255,0.22)';
        rc.lineWidth = 1;
        rc.stroke();
      }

      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      hero.removeEventListener('mousemove', onMouseMove);
      hero.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Layer 1 — blurred color fluid */}
      <canvas
        ref={colorRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          filter: 'blur(45px) saturate(2.2) contrast(1.1)',
        }}
      />
      {/* Layer 2 — sharp ripple rings + cursor dot */}
      <canvas
        ref={rippleRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
