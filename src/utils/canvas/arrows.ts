import { Point } from '../../types/canvas';

export const drawSolidArrow = (
  ctx: CanvasRenderingContext2D,
  start: Point,
  end: Point,
  color: string = '#4a5568',
  headSize: number = 10
) => {
  const angle = Math.atan2(end.y - start.y, end.x - start.x);
  
  // Draw line
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  
  // Draw arrowhead
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(end.x, end.y);
  ctx.lineTo(
    end.x - headSize * Math.cos(angle - Math.PI / 6),
    end.y - headSize * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    end.x - headSize * Math.cos(angle + Math.PI / 6),
    end.y - headSize * Math.sin(angle + Math.PI / 6)
  );
  ctx.closePath();
  ctx.fill();
};

export const drawHeightArrow = (
  ctx: CanvasRenderingContext2D,
  x: number,
  startY: number,
  endY: number,
  label: string,
  color: string = '#718096'
) => {
  const arrowPadding = 10;
  const labelPadding = 5;
  
  // Calculate arrow points with padding
  const start = { x, y: startY - arrowPadding };
  const end = { x, y: endY + arrowPadding };
  
  // Draw dashed line
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  ctx.setLineDash([]);
  
  // Draw arrowheads at both ends
  drawSolidArrow(ctx, start, { x: start.x, y: start.y - 10 }, color, 8);
  drawSolidArrow(ctx, end, { x: end.x, y: end.y + 10 }, color, 8);
  
  // Draw label
  ctx.fillStyle = color;
  ctx.font = '14px sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(label, x - labelPadding, (startY + endY) / 2);
};