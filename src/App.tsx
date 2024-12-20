import React, { useState, useCallback } from 'react';
import { GameState } from './types/game';
import { calculateCorrectVelocity } from './utils/physics';
import GameCanvas from './components/GameCanvas';
import GameControls from './components/GameControls';

const generateRandomGame = (): GameState => {
  return {
    gravity: Math.random() * 20 + 5,
    angle: Math.random() * 60 + 15,
    launcherHeight: Math.random() * 30,
    targetHeight: Math.random() * 30,
    distance: Math.random() * 50 + 30,
    mass: Math.random() * 5 + 1,
    userVelocity: null,
    isSimulating: false,
    hasSimulated: false,
    correctVelocity: null,
  };
};

function App() {
  const [gameState, setGameState] = useState<GameState>(generateRandomGame());

  const handleVelocitySubmit = useCallback((velocity: number) => {
    const correctVelocity = calculateCorrectVelocity(
      gameState.gravity,
      gameState.distance,
      gameState.angle,
      gameState.launcherHeight,
      gameState.targetHeight
    );

    setGameState((prev) => ({
      ...prev,
      userVelocity: velocity,
      isSimulating: true,
      hasSimulated: true,
      correctVelocity,
    }));

    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        isSimulating: false,
      }));
    }, 3000);
  }, [gameState]);

  const handleNewGame = useCallback(() => {
    setGameState(generateRandomGame());
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Projectile Motion Game</h1>
          <p className="mt-2 text-gray-600">
            Calculate the initial velocity needed to hit the target!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GameCanvas gameState={gameState} scale={8} />
          </div>
          <div>
            <GameControls
              gameState={gameState}
              onVelocitySubmit={handleVelocitySubmit}
              onNewGame={handleNewGame}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;