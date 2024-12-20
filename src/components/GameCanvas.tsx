import React, { useRef, useEffect, useState, useCallback } from 'react';
import { GameState, ProjectilePosition } from '../types/game';
import { calculateProjectilePosition } from '../utils/physics';
import { drawSolidArrow, drawHeightArrow } from '../utils/canvas/arrows';
import { drawTarget } from '../utils/canvas/target';
import { drawTrajectoryPath } from '../utils/canvas/trajectory';

interface GameCanvasProps {
  gameState: GameState;
  scale: number;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ gameState, scale }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [trajectoryPoints, setTrajectoryPoints] = useState<ProjectilePosition[]>([]);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  // Initialize canvas context
  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        setCtx(context);
      }
    }
  }, []);

  const drawAngleIndicator = useCallback((ctx: CanvasRenderingContext2D) => {
    const launcherX = 60;
    const launcherY = ctx.canvas.height - gameState.launcherHeight * scale;
    const angleRad = (gameState.angle * Math.PI) / 180;
    const lineLength = 50;
    
    const start = { x: launcherX, y: launcherY };
    const end = {
      x: launcherX + Math.cos(angleRad) * lineLength,
      y: launcherY - Math.sin(angleRad) * lineLength
    };
    
    drawSolidArrow(ctx, start, end, '#4a5568', 10);
    
    // Draw angle text
    ctx.fillStyle = '#4a5568';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${gameState.angle.toFixed(1)}°`, end.x + 5, end.y);
  }, [gameState.angle, gameState.launcherHeight, scale]);

  const drawHeightIndicators = useCallback((ctx: CanvasRenderingContext2D) => {
    const groundY = ctx.canvas.height;
    
    // Launcher height indicator
    const launcherY = groundY - gameState.launcherHeight * scale;
    drawHeightArrow(
      ctx,
      40,
      groundY,
      launcherY,
      `${gameState.launcherHeight.toFixed(1)}m`
    );
    
    // Target height indicator
    const targetX = gameState.distance * scale + 50;
    const targetY = groundY - gameState.targetHeight * scale;
    drawHeightArrow(
      ctx,
      targetX + 30,
      groundY,
      targetY,
      `${gameState.targetHeight.toFixed(1)}m`
    );
  }, [gameState.launcherHeight, gameState.targetHeight, gameState.distance, scale]);

  const drawScene = useCallback((ctx: CanvasRenderingContext2D) => {
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw ground
    ctx.beginPath();
    ctx.moveTo(0, ctx.canvas.height);
    ctx.lineTo(ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = '#2d3748';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw launcher
    const launcherY = ctx.canvas.height - gameState.launcherHeight * scale;
    ctx.fillStyle = '#4a5568';
    ctx.fillRect(50, launcherY - 40, 20, 40);

    // Draw target
    const targetX = gameState.distance * scale + 50;
    const targetY = ctx.canvas.height - gameState.targetHeight * scale;
    drawTarget(ctx, targetX, targetY, 15);

    // Draw indicators
    drawAngleIndicator(ctx);
    drawHeightIndicators(ctx);

    // Draw trajectory if exists
    if (trajectoryPoints.length > 0) {
      drawTrajectoryPath(ctx, trajectoryPoints, scale, launcherY);
    }
  }, [gameState, scale, trajectoryPoints, drawAngleIndicator, drawHeightIndicators]);

  // Handle animation
  const animate = useCallback((velocity: number) => {
    if (!ctx) return;

    let time = 0;
    const positions: ProjectilePosition[] = [];
    const animationInterval = setInterval(() => {
      const position = calculateProjectilePosition(
        velocity,
        gameState.angle,
        gameState.gravity,
        time
      );
      
      positions.push(position);
      setTrajectoryPoints([...positions]);

      // Stop conditions
      if (position.y < -gameState.launcherHeight / scale || 
          position.x > gameState.distance + 10) {
        clearInterval(animationInterval);
      }

      time += 0.1;
    }, 50);

    return () => clearInterval(animationInterval);
  }, [ctx, gameState, scale]);

  // Render scene when context or game state changes
  useEffect(() => {
    if (ctx) {
      drawScene(ctx);
    }
  }, [ctx, drawScene]);

  // Handle new simulation
  useEffect(() => {
    if (gameState.isSimulating && gameState.userVelocity !== null) {
      setTrajectoryPoints([]);
      animate(gameState.userVelocity);
    }
  }, [gameState.isSimulating, gameState.userVelocity, animate]);

  // Clear trajectory on new game
  useEffect(() => {
    setTrajectoryPoints([]);
  }, [gameState.distance, gameState.angle, gameState.gravity]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={400}
      className="bg-gray-50 rounded-lg shadow-md"
    />
  );
};

export default GameCanvas;