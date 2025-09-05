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
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = Math.min(canvas.width, canvas.height) / 250;

    // Función de hash simple para generar números pseudoaleatorios consistentes
    const hash = (str: string): number => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return Math.abs(hash);
    };

    // Función para obtener número pseudoaleatorio basado en semilla
    const seededRandom = (seed: string, index: number): number => {
      const combined = hash(seed + index.toString());
      return (combined % 1000) / 1000; // Retorna valor entre 0 y 1
    };

    // Función para crear líneas con aspecto dibujado a mano (consistente)
    const drawHandyLine = (x1: number, y1: number, x2: number, y2: number, seed: string, roughness = 1) => {
      const segments = Math.max(5, Math.floor(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) / 10));
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      
      for (let i = 1; i <= segments; i++) {
        const t = i / segments;
        const x = x1 + (x2 - x1) * t;
        const y = y1 + (y2 - y1) * t;
        
        // Agregar variación consistente para el efecto "dibujado a mano"
        const variation = roughness * scale;
        const offsetX = (seededRandom(seed, i * 2) - 0.5) * variation;
        const offsetY = (seededRandom(seed, i * 2 + 1) - 0.5) * variation;
        
        ctx.lineTo(x + offsetX, y + offsetY);
      }
      
      ctx.stroke();
    };

    // Función para crear círculos con aspecto dibujado a mano (consistente)
    const drawHandyCircle = (x: number, y: number, radius: number, seed: string, roughness = 1) => {
      const segments = Math.max(16, Math.floor(radius * 2));
      
      ctx.beginPath();
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const variation = roughness * scale;
        const r = radius + (seededRandom(seed, i) - 0.5) * variation;
        const circleX = x + Math.cos(angle) * r;
        const circleY = y + Math.sin(angle) * r;
        
        if (i === 0) {
          ctx.moveTo(circleX, circleY);
        } else {
          ctx.lineTo(circleX, circleY);
        }
      }
      ctx.stroke();
    };

    // Dibujar la base (siempre visible)
    drawHandyLine(centerX - 80 * scale, centerY + 120 * scale, centerX + 40 * scale, centerY + 120 * scale, 'base', 2);

    // Dibujar el poste vertical (siempre visible)
    drawHandyLine(centerX - 60 * scale, centerY + 120 * scale, centerX - 60 * scale, centerY - 100 * scale, 'post', 2);

    // Dibujar la viga horizontal (siempre visible)
    drawHandyLine(centerX - 60 * scale, centerY - 100 * scale, centerX + 20 * scale, centerY - 100 * scale, 'beam', 2);

    // Dibujar la cuerda (siempre visible)
    drawHandyLine(centerX + 20 * scale, centerY - 100 * scale, centerX + 20 * scale, centerY - 70 * scale, 'rope', 1.5);

    const errors = wrongGuessesCount;

    // Error 1: Cabeza
    if (errors >= 1) {
      drawHandyCircle(centerX + 20 * scale, centerY - 50 * scale, 20 * scale, 'head', 2);
      
      // Ojos con X
      const eyeSize = 6 * scale;
      const leftEyeX = centerX + 10 * scale;
      const rightEyeX = centerX + 30 * scale;
      const eyeY = centerY - 55 * scale;
      
      // Ojo izquierdo (X)
      drawHandyLine(leftEyeX - eyeSize/2, eyeY - eyeSize/2, leftEyeX + eyeSize/2, eyeY + eyeSize/2, 'lefteye1', 1);
      drawHandyLine(leftEyeX - eyeSize/2, eyeY + eyeSize/2, leftEyeX + eyeSize/2, eyeY - eyeSize/2, 'lefteye2', 1);
      
      // Ojo derecho (X)
      drawHandyLine(rightEyeX - eyeSize/2, eyeY - eyeSize/2, rightEyeX + eyeSize/2, eyeY + eyeSize/2, 'righteye1', 1);
      drawHandyLine(rightEyeX - eyeSize/2, eyeY + eyeSize/2, rightEyeX + eyeSize/2, eyeY - eyeSize/2, 'righteye2', 1);
      
      // Boca con lengua fuera
      const mouthY = centerY - 40 * scale;
      const mouthWidth = 8 * scale;
      
      // Boca abierta (forma de O)
      drawHandyCircle(centerX + 20 * scale, mouthY, mouthWidth/2, 'mouth', 1);
      
      
      // Restaurar color de línea
      ctx.fillStyle = '#2d3748';
    }

    // Error 2: Cuerpo
    if (errors >= 2) {
      drawHandyLine(centerX + 20 * scale, centerY - 30 * scale, centerX + 20 * scale, centerY + 30 * scale, 'body', 2);
    }

    // Error 3: Brazo izquierdo
    if (errors >= 3) {
      drawHandyLine(centerX + 20 * scale, centerY - 10 * scale, centerX - 10 * scale, centerY + 10 * scale, 'leftarm', 2);
    }

    // Error 4: Brazo derecho
    if (errors >= 4) {
      drawHandyLine(centerX + 20 * scale, centerY - 10 * scale, centerX + 50 * scale, centerY + 10 * scale, 'rightarm', 2);
    }

    // Error 5: Pierna izquierda
    if (errors >= 5) {
      drawHandyLine(centerX + 20 * scale, centerY + 30 * scale, centerX - 10 * scale, centerY + 60 * scale, 'leftleg', 2);
    }

    // Error 6: Pierna derecha (juego perdido)
    if (errors >= 6) {
      drawHandyLine(centerX + 20 * scale, centerY + 30 * scale, centerX + 50 * scale, centerY + 60 * scale, 'rightleg', 2);
    }
  }, [wrongGuessesCount]);

  return (
    <div className={`w-full lg:w-1/2 flex justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        width={600}
        height={500}
        className="max-w-full h-auto"
      />
    </div>
  );
}
