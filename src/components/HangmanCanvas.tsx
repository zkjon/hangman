import { useEffect, useRef } from 'preact/hooks';

interface HangmanCanvasProps {
  wrongGuessesCount: number;
  className?: string;
}

export default function HangmanCanvas({ wrongGuessesCount, className = '' }: HangmanCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    const scale = Math.min(canvas.width, canvas.height) / 250;

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

    const errors = wrongGuessesCount;

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
  }, [wrongGuessesCount]);

  return (
    <div className={`w-full lg:w-1/2 flex justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        width={600}
        height={500}
        className="border-2 border-gray-300 rounded-lg bg-white max-w-full h-auto"
      />
    </div>
  );
}
