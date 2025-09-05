interface KeyboardInstructionsProps {
  gameStatus: 'playing' | 'won' | 'lost';
  className?: string;
}

export default function KeyboardInstructions({ gameStatus, className = '' }: KeyboardInstructionsProps) {
  return (
    <div className={`text-center text-sm text-gray-600 ${className}`}>
      <div className="mb-2">💡 <strong>Usa tu teclado:</strong></div>
      <div className="space-y-1">
        {gameStatus === 'playing' ? (
          <>
            <div>• Presiona cualquier letra para adivinar</div>
            <div>• <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd> para nueva palabra</div>
          </>
        ) : (
          <div>• <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd> para jugar de nuevo</div>
        )}
      </div>
    </div>
  );
}
