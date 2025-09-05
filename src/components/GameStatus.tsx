interface GameStatusProps {
  gameStatus: 'playing' | 'won' | 'lost';
  className?: string;
}

export default function GameStatus({ gameStatus, className = '' }: GameStatusProps) {
  if (gameStatus === 'playing') return null;

  return (
    <div className={`text-center ${className}`}>
      <div className={`text-2xl font-bold mb-4 ${
        gameStatus === 'won' ? 'text-green-600' : 'text-red-600'
      }`}>
        {gameStatus === 'won' ? '¡GANASTE! 🎉' : '¡PERDISTE! 💀'}
      </div>
    </div>
  );
}
