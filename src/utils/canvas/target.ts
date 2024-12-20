interface Circle {
  radius: number;
  color: string;
}

export const drawTarget = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number
) => {
  const circles: Circle[] = [
    { radius, color: '#e53e3e' },
    { radius: radius * 0.7, color: '#fc8181' },
    { radius: radius * 0.4, color: '#feb2b2' }
  ];

  circles.forEach(({ radius: r, color }) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.stroke();
  });
};