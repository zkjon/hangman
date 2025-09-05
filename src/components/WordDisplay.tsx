interface WordDisplayProps {
  currentWord: string;
  guessedLetters: Set<string>;
  gameStatus: 'playing' | 'won' | 'lost';
  className?: string;
}

export default function WordDisplay({ 
  currentWord, 
  guessedLetters, 
  gameStatus, 
  className = '' 
}: WordDisplayProps) {
  const displayWord = currentWord
    .split('')
    .map(letter => guessedLetters.has(letter) ? letter : '_')
    .join(' ');

  return (
    <div className={`text-3xl md:text-4xl font-bold tracking-wider text-center ${className}`}>
      {gameStatus === 'lost' ? currentWord : displayWord}
    </div>
  );
}
