interface ResetButtonProps {
  onReset: () => void;
  gameStatus: 'playing' | 'won' | 'lost';
  className?: string;
}

export default function ResetButton({ onReset, gameStatus, className = '' }: ResetButtonProps) {
  return (
    <button
      onClick={onReset}
      className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold ${className}`}
    >
      {gameStatus === 'playing' ? 'Nueva palabra' : 'Jugar de nuevo'}
    </button>
  );
}
