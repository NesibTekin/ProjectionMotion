export const calculateCorrectVelocity = (
  gravity: number,
  distance: number,
  angle: number,
  launcherHeight: number,
  targetHeight: number
): number => {
  const angleRad = (angle * Math.PI) / 180;
  const tanTheta = Math.tan(angleRad);
  const cosTheta = Math.cos(angleRad);
  
  const numerator = gravity * distance * distance;
  const denominator = 2 * (targetHeight - launcherHeight - distance * tanTheta) * (cosTheta * cosTheta);
  
  return Math.sqrt(Math.abs(numerator / denominator));
};

export const calculateProjectilePosition = (
  initialVelocity: number,
  angle: number,
  gravity: number,
  time: number
): ProjectilePosition => {
  const angleRad = (angle * Math.PI) / 180;
  const x = initialVelocity * Math.cos(angleRad) * time;
  const y = initialVelocity * Math.sin(angleRad) * time - (0.5 * gravity * time * time);
  return { x, y };
};