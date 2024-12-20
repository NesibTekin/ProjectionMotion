import React, { useState } from 'react';
import { GameState } from '../types/game';
import { Target, Crosshair, RotateCcw } from 'lucide-react';

interface GameControlsProps {
  gameState: GameState;
  onVelocitySubmit: (velocity: number) => void;
  onNewGame: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  gameState,
  onVelocitySubmit,
  onNewGame,
}) => {
  const [inputVelocity, setInputVelocity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const velocity = parseFloat(inputVelocity);
    if (!isNaN(velocity)) {
      onVelocitySubmit(velocity);
      setInputVelocity('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium">Angle:</span>
            <span className="text-sm">{gameState.angle.toFixed(1)}°</span>
          </div>
          <div className="flex items-center space-x-2">
            <Crosshair className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium">Gravity:</span>
            <span className="text-sm">{gameState.gravity.toFixed(1)} m/s²</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-medium">Launcher Height:</span>{' '}
            {gameState.launcherHeight.toFixed(1)}m
          </div>
          <div className="text-sm">
            <span className="font-medium">Target Height:</span>{' '}
            {gameState.targetHeight.toFixed(1)}m
          </div>
          <div className="text-sm">
            <span className="font-medium">Distance:</span>{' '}
            {gameState.distance.toFixed(1)}m
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="velocity" className="block text-sm font-medium text-gray-700">
            Initial Velocity (m/s)
          </label>
          <input
            type="number"
            id="velocity"
            value={inputVelocity}
            onChange={(e) => setInputVelocity(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter velocity..."
            disabled={gameState.isSimulating}
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={gameState.isSimulating}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            Launch
          </button>
          <button
            type="button"
            onClick={onNewGame}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            New Game
          </button>
        </div>
      </form>

      {gameState.hasSimulated && gameState.correctVelocity !== null && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium">
            {Math.abs(gameState.userVelocity! - gameState.correctVelocity) < 0.5
              ? '🎉 Perfect Shot!'
              : '❌ Almost there!'}
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            Correct velocity: {gameState.correctVelocity.toFixed(2)} m/s
          </p>
        </div>
      )}
    </div>
  );
};

export default GameControls;