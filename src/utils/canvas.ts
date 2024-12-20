import { ProjectilePosition } from '../types/game';

export const drawDashedLine = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  dashLength: number = 5
) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const dashCount = Math.floor(distance / (dashLength * 2));
  const dashDx = (dx / dashCount) * 2;
  const dashDy = (dy / dashCount) * 2;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  
  for (let i = 0; i < dashCount; i++) {
    x1 += dashDx;
    y1 += dashDy;
    ctx.lineTo(x1, y1);
    x1 += dashDx;
    y1 += dashDy;
    ctx.moveTo(x1, y1);
  }
  
  ctx.stroke();
};

export const drawArrowhead = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  size: number = 10
) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(-size, -size/2);
  ctx.lineTo(0, 0);
  ctx.lineTo(-size, size/2);
  ctx.stroke();
  ctx.restore();
};

export const drawTarget = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number
) => {
  const circles = [
    { radius: radius, color: '#e53e3e' },
    { radius: radius * 0.7, color: '#fc8181' },
    { radius: radius * 0.4, color: '#feb2b2' }
  ];

  circles.forEach(({ radius: r, color }) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.stroke();
  });
};

export const drawTrajectoryPath = (
  ctx: CanvasRenderingContext2D,
  positions: ProjectilePosition[],
  scale: number,
  baseY: number
) => {
  ctx.strokeStyle = '#4299e1';
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  positions.forEach((pos, index) => {
    const x = pos.x * scale + 50;
    const y = baseY - (pos.y * scale);
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();
  ctx.setLineDash([]);
};