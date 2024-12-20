export interface GameState {
  gravity: number;
  angle: number;
  launcherHeight: number;
  targetHeight: number;
  distance: number;
  mass: number;
  userVelocity: number | null;
  isSimulating: boolean;
  hasSimulated: boolean;
  correctVelocity: number | null;
}

export interface ProjectilePosition {
  x: number;
  y: number;
}