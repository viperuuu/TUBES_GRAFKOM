import { useState, useRef, useEffect } from 'react';
import { Window } from './Window';
import { Pencil, Paintbrush, Eraser, Square, Circle, Minus } from 'lucide-react';

interface PaintWindowProps {
  onClose: () => void;
  onFocus?: () => void;
  isActive?: boolean;
}

type Tool = 'pencil' | 'brush' | 'eraser' | 'rectangle' | 'circle' | 'line';

const colors = [
  '#000000', '#808080', '#FFFFFF', '#C0C0C0',
  '#FF0000', '#800000', '#00FF00', '#008000',
  '#0000FF', '#000080', '#FFFF00', '#808000',
  '#00FFFF', '#008080', '#FF00FF', '#800080',
  '#FF8040', '#FF8080', '#80FF80', '#80C0FF',
];

const tools = [
  { id: 'pencil' as Tool, icon: <Pencil size={14} />, label: 'Pencil' },
  { id: 'brush' as Tool, icon: <Paintbrush size={14} />, label: 'Brush' },
  { id: 'eraser' as Tool, icon: <Eraser size={14} />, label: 'Eraser' },
  { id: 'line' as Tool, icon: <Minus size={14} />, label: 'Line' },
  { id: 'rectangle' as Tool, icon: <Square size={14} />, label: 'Rectangle' },
  { id: 'circle' as Tool, icon: <Circle size={14} />, label: 'Circle' },
];

export function PaintWindow({ onClose, onFocus, isActive }: PaintWindowProps) {
  const [selectedTool, setSelectedTool] = useState<Tool>('pencil');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 560;
    canvas.height = 320;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    contextRef.current = context;
  }, []);

  const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const context = contextRef.current;
    if (!context) return;
    const { x, y } = getPos(e);
    setIsDrawing(true);
    context.beginPath();
    context.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const context = contextRef.current;
    if (!context) return;
    const { x, y } = getPos(e);
    if (selectedTool === 'pencil') {
      context.strokeStyle = selectedColor;
      context.lineWidth = 1;
      context.lineTo(x, y);
      context.stroke();
    } else if (selectedTool === 'brush') {
      context.strokeStyle = selectedColor;
      context.lineWidth = 6;
      context.lineTo(x, y);
      context.stroke();
    } else if (selectedTool === 'eraser') {
      context.strokeStyle = '#FFFFFF';
      context.lineWidth = 12;
      context.lineTo(x, y);
      context.stroke();
    }
  };

  const stopDrawing = () => setIsDrawing(false);

  return (
    <Window
      title="Paint"
      onClose={onClose}
      onFocus={onFocus}
      isActive={isActive}
      width={640}
      height={460}
      x={580}
      y={280}
      showMenuBar={true}
      menuItems={['File', 'Edit', 'View', 'Image', 'Colors', 'Help']}
      showStatusBar={true}
      statusContent={<span>For Help, click Help Topics on the Help Menu.</span>}
    >
      <div className="flex h-full" style={{ background: '#ece9d8' }}>
        {/* Tool Panel */}
        <div
          className="flex flex-col gap-1 p-1 border-r flex-shrink-0"
          style={{ background: '#ece9d8', borderColor: '#aca899', width: 46 }}
        >
          <div className="grid grid-cols-2 gap-1">
            {tools.map(tool => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                title={tool.label}
                className="w-[19px] h-[19px] flex items-center justify-center"
                style={{
                  background: selectedTool === tool.id
                    ? 'linear-gradient(to bottom, #c8d8f0 0%, #a8c0e8 100%)'
                    : 'linear-gradient(to bottom, #f8f6f0 0%, #e8e4dc 100%)',
                  border: selectedTool === tool.id ? '1px solid #4890d8' : '1px solid #aca899',
                  boxShadow: selectedTool === tool.id
                    ? 'inset 0 1px 2px rgba(0,0,0,0.2)'
                    : '0 1px 1px rgba(0,0,0,0.1)',
                }}
              >
                {tool.icon}
              </button>
            ))}
          </div>

          <div className="border-t my-1" style={{ borderColor: '#aca899' }} />

          {/* Active colors */}
          <div className="relative w-[36px] h-[36px] mx-auto">
            <div
              className="absolute w-6 h-6"
              style={{
                background: bgColor,
                border: '1px solid #666',
                bottom: 0, right: 0,
              }}
            />
            <div
              className="absolute w-6 h-6"
              style={{
                background: selectedColor,
                border: '1px solid #666',
                top: 0, left: 0,
                cursor: 'pointer',
              }}
            />
          </div>
        </div>

        {/* Canvas area */}
        <div className="flex-1 overflow-auto p-2" style={{ background: '#808080' }}>
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="cursor-crosshair"
            style={{
              display: 'block',
              boxShadow: '2px 2px 6px rgba(0,0,0,0.4)',
              border: '1px solid #444',
            }}
          />
        </div>
      </div>

      {/* Color palette (inside status bar area but outside the window content) */}
      <div />
    </Window>
  );
}
