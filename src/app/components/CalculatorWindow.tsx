import { useState } from 'react';
import { Window } from './Window';
import { Calculator } from 'lucide-react';

interface CalculatorWindowProps {
  onClose: () => void;
  onFocus?: () => void;
  isActive?: boolean;
}

export function CalculatorWindow({ onClose, onFocus, isActive }: CalculatorWindowProps) {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState(0);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);
    if (operator && waitingForOperand) { setOperator(nextOperator); return; }
    if (currentValue === 0) {
      setCurrentValue(inputValue);
    } else if (operator) {
      const newValue = calculate(currentValue, inputValue, operator);
      setDisplay(String(newValue));
      setCurrentValue(newValue);
    }
    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (left: number, right: number, op: string): number => {
    switch (op) {
      case '+': return left + right;
      case '-': return left - right;
      case '×': return left * right;
      case '÷': return right !== 0 ? left / right : 0;
      default: return right;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);
    if (operator) {
      const newValue = calculate(currentValue, inputValue, operator);
      setDisplay(String(newValue));
      setCurrentValue(newValue);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setCurrentValue(0);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const buttons = [
    [{ l: 'MC', t: 'mem' }, { l: 'MR', t: 'mem' }, { l: 'MS', t: 'mem' }, { l: 'M+', t: 'mem' }],
    [{ l: '←', t: 'util' }, { l: 'CE', t: 'util' }, { l: 'C', t: 'clear' }, { l: '±', t: 'util' }],
    [{ l: '7', t: 'num' }, { l: '8', t: 'num' }, { l: '9', t: 'num' }, { l: '÷', t: 'op' }],
    [{ l: '4', t: 'num' }, { l: '5', t: 'num' }, { l: '6', t: 'num' }, { l: '×', t: 'op' }],
    [{ l: '1', t: 'num' }, { l: '2', t: 'num' }, { l: '3', t: 'num' }, { l: '-', t: 'op' }],
    [{ l: '0', t: 'num' }, { l: '.', t: 'num' }, { l: '=', t: 'eq' }, { l: '+', t: 'op' }],
  ];

  const getBtnStyle = (type: string) => {
    if (type === 'op') return { background: 'linear-gradient(to bottom, #f0e8c8 0%, #e8d8a8 100%)', color: '#5a3a00', border: '1px solid #c8a840' };
    if (type === 'eq') return { background: 'linear-gradient(to bottom, #a8d0ff 0%, #78b0f0 100%)', color: '#001860', border: '1px solid #4890d8' };
    if (type === 'clear') return { background: 'linear-gradient(to bottom, #ffc8c8 0%, #f09090 100%)', color: '#5a0000', border: '1px solid #d84848' };
    if (type === 'mem') return { background: 'linear-gradient(to bottom, #e8e8e8 0%, #d0d0d0 100%)', color: '#333', border: '1px solid #aaa' };
    return { background: 'linear-gradient(to bottom, #f8f6f0 0%, #e8e4dc 100%)', color: '#000', border: '1px solid #aca899' };
  };

  return (
    <Window
      title="Calculator"
      onClose={onClose}
      onFocus={onFocus}
      isActive={isActive}
      width={240}
      height={330}
      x={990}
      y={80}
      titleIcon={<Calculator size={12} color="rgba(255,255,255,0.9)" />}
    >
      <div className="p-3 flex flex-col gap-2" style={{ background: '#ece9d8' }}>
        {/* Expression display */}
        <div className="text-right text-xs text-gray-400 h-4 px-2">
          {operator ? `${currentValue} ${operator}` : ''}
        </div>

        {/* Main display */}
        <div
          className="text-right px-3 py-1"
          style={{
            background: '#fff',
            border: '1px solid #aca899',
            boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.15)',
            fontSize: 22,
            fontFamily: 'monospace',
            minHeight: 36,
            borderRadius: 2,
          }}
        >
          {display}
        </div>

        {/* Buttons */}
        {buttons.map((row, ri) => (
          <div key={ri} className="grid grid-cols-4 gap-1">
            {row.map(({ l, t }, ci) => (
              <button
                key={ci}
                onClick={() => {
                  if (l === 'C' || l === 'CE') handleClear();
                  else if (l === '=') handleEquals();
                  else if (['÷', '×', '-', '+'].includes(l)) handleOperator(l);
                  else if (l !== '←' && l !== '±' && !['MC', 'MR', 'MS', 'M+'].includes(l)) handleNumber(l);
                }}
                className="h-9 text-sm font-medium rounded-sm hover:brightness-110 active:brightness-90"
                style={{
                  ...getBtnStyle(t),
                  boxShadow: '0 1px 2px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5)',
                  fontSize: 13,
                }}
              >
                {l}
              </button>
            ))}
          </div>
        ))}
      </div>
    </Window>
  );
}
