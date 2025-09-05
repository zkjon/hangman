import { useHangmanGame } from '@/hooks/useHangmanGame';
import HangmanCanvas from './HangmanCanvas';
import WordDisplay from './WordDisplay';
import GameStatus from './GameStatus';
import ResetButton from './ResetButton';
import ErrorDisplay from './ErrorDisplay';
import VirtualKeyboard from './VirtualKeyboard';
import KeyboardInstructions from './KeyboardInstructions';

interface HangmanGameProps {
  className?: string;
}

export default function HangmanGame({ className = '' }: HangmanGameProps) {
  const {
    currentWord,
    guessedLetters,
    wrongGuesses,
    gameStatus,
    handleLetterGuess,
    resetGame,
    maxErrors
  } = useHangmanGame();

  return (
    <div className={`flex flex-col lg:flex-row gap-8 items-start ${className}`}>
      
      <HangmanCanvas wrongGuessesCount={wrongGuesses.size} />

      
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center space-y-6 min-h-[500px]">
        <WordDisplay
          currentWord={currentWord}
          guessedLetters={guessedLetters}
          gameStatus={gameStatus}
        />

        <GameStatus gameStatus={gameStatus} />

        <ResetButton onReset={resetGame} gameStatus={gameStatus} />

        <ErrorDisplay 
          wrongGuesses={wrongGuesses} 
          maxErrors={maxErrors} 
        />

        <VirtualKeyboard
          onLetterClick={handleLetterGuess}
          guessedLetters={guessedLetters}
          wrongGuesses={wrongGuesses}
          gameStatus={gameStatus}
        />

        <KeyboardInstructions gameStatus={gameStatus} />
      </div>
    </div>
  );
}
