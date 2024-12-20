import { ProjectilePosition } from '../../types/game';

export const drawTrajectoryPath = (
  ctx: CanvasRenderingContext2D,
  positions: ProjectilePosition[],
  scale: number,
  baseY: number,
  color: string = '#4299e1'
) => {
  if (positions.length === 0) return;

  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
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
};