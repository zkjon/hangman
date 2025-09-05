interface ResetButtonProps {
  onReset: () => void;
  gameStatus: 'playing' | 'won' | 'lost';
  className?: string;
}

export default function ResetButton({ onReset, gameStatus, className = '' }: ResetButtonProps) {
  return (
    <button
      type="button"
      onClick={onReset}
      className={`px-6 py-3 text-xl bg-text text-white rounded-lg hover:bg-text/80 transition-colors ${className}`}
    >
      {gameStatus === 'playing' ? 'nueva palabra' : 'jugar de nuevo'}
    </button>
  );
}
