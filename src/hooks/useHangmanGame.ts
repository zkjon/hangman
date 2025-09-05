import { useEffect, useState } from 'preact/hooks';
import { words } from '@/lib/words';

const MAX_ERRORS = 6;

export function useHangmanGame() {
  const [currentWord, setCurrentWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState<Set<string>>(new Set());
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  // Inicializar palabra aleatoria
  useEffect(() => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
  }, []);

  // Verificar estado del juego
  useEffect(() => {
    if (wrongGuesses.size >= MAX_ERRORS) {
      setGameStatus('lost');
    } else if (currentWord && currentWord.split('').every(letter => guessedLetters.has(letter))) {
      setGameStatus('won');
    }
  }, [currentWord, guessedLetters, wrongGuesses]);

  // Manejar teclas del teclado físico
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const letter = event.key.toUpperCase();
      
      // Durante el juego: aceptar letras A-Z y Ñ
      if (gameStatus === 'playing' && /^[A-ZÑ]$/.test(letter)) {
        handleLetterGuess(letter);
      }
      
      // Tecla Enter: siempre permite reiniciar/nueva palabra
      if (event.key === 'Enter') {
        resetGame();
      }
    };

    // Siempre agregar el listener
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameStatus, guessedLetters, wrongGuesses, currentWord]);

  const handleLetterGuess = (letter: string) => {
    if (gameStatus !== 'playing' || guessedLetters.has(letter) || wrongGuesses.has(letter)) {
      return;
    }

    if (currentWord.includes(letter)) {
      setGuessedLetters(prev => new Set([...prev, letter]));
    } else {
      setWrongGuesses(prev => new Set([...prev, letter]));
    }
  };

  const resetGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setGuessedLetters(new Set());
    setWrongGuesses(new Set());
    setGameStatus('playing');
  };

  return {
    currentWord,
    guessedLetters,
    wrongGuesses,
    gameStatus,
    handleLetterGuess,
    resetGame,
    maxErrors: MAX_ERRORS
  };
}
