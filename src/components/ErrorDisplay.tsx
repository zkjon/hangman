interface ErrorDisplayProps {
  wrongGuesses: Set<string>;
  maxErrors: number;
  className?: string;
}

export default function ErrorDisplay({ wrongGuesses, maxErrors, className = '' }: ErrorDisplayProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Contador de errores */}
      <div className="text-xl font-semibold text-center">
        Errores: {wrongGuesses.size} / {maxErrors}
      </div>

      {/* Letras incorrectas */}
      {wrongGuesses.size > 0 && (
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-2">Letras incorrectas:</div>
          <div className="text-red-600 font-bold text-lg">
            {Array.from(wrongGuesses).join(', ')}
          </div>
        </div>
      )}
    </div>
  );
}
