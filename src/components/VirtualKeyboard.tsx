interface VirtualKeyboardProps {
  onLetterClick: (letter: string) => void;
  guessedLetters: Set<string>;
  wrongGuesses: Set<string>;
  gameStatus: 'playing' | 'won' | 'lost';
  className?: string;
}

export default function VirtualKeyboard({ 
  onLetterClick, 
  guessedLetters, 
  wrongGuesses, 
  gameStatus, 
  className = '' 
}: VirtualKeyboardProps) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  if (gameStatus !== 'playing') return null;

  return (
    <div className={`grid grid-cols-6 md:grid-cols-9 gap-2 max-w-lg ${className}`}>
      {alphabet.map(letter => {
        const isGuessed = guessedLetters.has(letter);
        const isWrong = wrongGuesses.has(letter);
        const isDisabled = isGuessed || isWrong;

        return (
          <button
            key={letter}
            onClick={() => onLetterClick(letter)}
            disabled={isDisabled}
            className={`
              w-10 h-10 text-sm font-bold rounded border-2 transition-colors
              ${isGuessed 
                ? 'bg-green-100 border-green-500 text-green-700' 
                : isWrong 
                ? 'bg-red-100 border-red-500 text-red-700'
                : 'bg-white border-gray-300 hover:bg-gray-100 active:bg-gray-200'
              }
              ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
