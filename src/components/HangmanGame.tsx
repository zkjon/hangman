import { useEffect, useRef, useState } from 'preact/hooks';

interface HangmanGameProps {
  className?: string;
}

const WORDS = [
  'PROGRAMACION',
  'JAVASCRIPT',
  'TYPESCRIPT',
  'PREACT',
  'ASTRO',
  'DESARROLLO',
  'FRONTEND',
  'BACKEND',
  'COMPUTADORA',
  'ALGORITMO',
  'VARIABLE',
  'FUNCION',
  'COMPONENTE',
  'FRAMEWORK'
];

const MAX_ERRORS = 6;

export default function HangmanGame({ className = '' }: HangmanGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentWord, setCurrentWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState<Set<string>>(new Set());
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  // Inicializar palabra aleatoria
  useEffect(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setCurrentWord(randomWord);
  }, []);

  // Dibujar el ahorcado en el canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#2d3748';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = Math.min(canvas.width, canvas.height) / 300;

    // Dibujar la base (siempre visible)
    ctx.beginPath();
    ctx.moveTo(centerX - 80 * scale, centerY + 120 * scale);
    ctx.lineTo(centerX + 40 * scale, centerY + 120 * scale);
    ctx.stroke();

    // Dibujar el poste vertical (siempre visible)
    ctx.beginPath();
    ctx.moveTo(centerX - 60 * scale, centerY + 120 * scale);
    ctx.lineTo(centerX - 60 * scale, centerY - 100 * scale);
    ctx.stroke();

    // Dibujar la viga horizontal (siempre visible)
    ctx.beginPath();
    ctx.moveTo(centerX - 60 * scale, centerY - 100 * scale);
    ctx.lineTo(centerX + 20 * scale, centerY - 100 * scale);
    ctx.stroke();

    // Dibujar la cuerda (siempre visible)
    ctx.beginPath();
    ctx.moveTo(centerX + 20 * scale, centerY - 100 * scale);
    ctx.lineTo(centerX + 20 * scale, centerY - 70 * scale);
    ctx.stroke();

    const errors = wrongGuesses.size;

    // Error 1: Cabeza
    if (errors >= 1) {
      ctx.beginPath();
      ctx.arc(centerX + 20 * scale, centerY - 50 * scale, 20 * scale, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Error 2: Cuerpo
    if (errors >= 2) {
      ctx.beginPath();
      ctx.moveTo(centerX + 20 * scale, centerY - 30 * scale);
      ctx.lineTo(centerX + 20 * scale, centerY + 30 * scale);
      ctx.stroke();
    }

    // Error 3: Brazo izquierdo
    if (errors >= 3) {
      ctx.beginPath();
      ctx.moveTo(centerX + 20 * scale, centerY - 10 * scale);
      ctx.lineTo(centerX - 10 * scale, centerY + 10 * scale);
      ctx.stroke();
    }

    // Error 4: Brazo derecho
    if (errors >= 4) {
      ctx.beginPath();
      ctx.moveTo(centerX + 20 * scale, centerY - 10 * scale);
      ctx.lineTo(centerX + 50 * scale, centerY + 10 * scale);
      ctx.stroke();
    }

    // Error 5: Pierna izquierda
    if (errors >= 5) {
      ctx.beginPath();
      ctx.moveTo(centerX + 20 * scale, centerY + 30 * scale);
      ctx.lineTo(centerX - 10 * scale, centerY + 60 * scale);
      ctx.stroke();
    }

    // Error 6: Pierna derecha (juego perdido)
    if (errors >= 6) {
      ctx.beginPath();
      ctx.moveTo(centerX + 20 * scale, centerY + 30 * scale);
      ctx.lineTo(centerX + 50 * scale, centerY + 60 * scale);
      ctx.stroke();
    }
  }, [wrongGuesses]);

  // Verificar estado del juego
  useEffect(() => {
    if (wrongGuesses.size >= MAX_ERRORS) {
      setGameStatus('lost');
    } else if (currentWord && currentWord.split('').every(letter => guessedLetters.has(letter))) {
      setGameStatus('won');
    }
  }, [currentWord, guessedLetters, wrongGuesses]);

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
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setCurrentWord(randomWord);
    setGuessedLetters(new Set());
    setWrongGuesses(new Set());
    setGameStatus('playing');
  };

  const displayWord = currentWord
    .split('')
    .map(letter => guessedLetters.has(letter) ? letter : '_')
    .join(' ');

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className={`flex flex-col items-center space-y-6 ${className}`}>
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="border-2 border-gray-300 rounded-lg bg-white"
      />

      {/* Palabra */}
      <div className="text-3xl md:text-4xl font-bold tracking-wider text-center">
        {gameStatus === 'lost' ? currentWord : displayWord}
      </div>

      {/* Estado del juego */}
      {gameStatus !== 'playing' && (
        <div className="text-center">
          <div className={`text-2xl font-bold mb-4 ${
            gameStatus === 'won' ? 'text-green-600' : 'text-red-600'
          }`}>
            {gameStatus === 'won' ? '¡GANASTE! 🎉' : '¡PERDISTE! 💀'}
          </div>
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Jugar de nuevo
          </button>
        </div>
      )}

      {/* Errores */}
      <div className="text-lg">
        Errores: {wrongGuesses.size} / {MAX_ERRORS}
      </div>

      {/* Letras incorrectas */}
      {wrongGuesses.size > 0 && (
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-2">Letras incorrectas:</div>
          <div className="text-red-600 font-bold">
            {Array.from(wrongGuesses).join(', ')}
          </div>
        </div>
      )}

      {/* Teclado virtual */}
      {gameStatus === 'playing' && (
        <div className="grid grid-cols-6 md:grid-cols-9 gap-2 max-w-lg">
          {alphabet.map(letter => {
            const isGuessed = guessedLetters.has(letter);
            const isWrong = wrongGuesses.has(letter);
            const isDisabled = isGuessed || isWrong;

            return (
              <button
                key={letter}
                onClick={() => handleLetterGuess(letter)}
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
      )}
    </div>
  );
}
