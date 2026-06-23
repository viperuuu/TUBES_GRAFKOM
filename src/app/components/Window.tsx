import { ReactNode, useRef, useState } from 'react';
import { Minus, Square, X } from 'lucide-react';

interface WindowProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onFocus?: () => void;
  isActive?: boolean;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  showMenuBar?: boolean;
  showToolbar?: boolean;
  showStatusBar?: boolean;
  statusContent?: ReactNode;
  menuItems?: string[];
  toolbarContent?: ReactNode;
  titleIcon?: ReactNode;
  titleContent?: ReactNode;
}

export function Window({
  title,
  children,
  onClose,
  onFocus,
  isActive = true,
  width = 400,
  height = 300,
  x = 100,
  y = 100,
  showMenuBar = false,
  showToolbar = false,
  showStatusBar = false,
  statusContent,
  menuItems = ['File', 'Edit', 'View', 'Tools', 'Help'],
  toolbarContent,
  titleIcon,
  titleContent,
}: WindowProps) {
  const [pos, setPos] = useState({ x, y });
  const [minimized, setMinimized] = useState(false);
  const isDragging = useRef(false);
  const dragStart = useRef({ mouseX: 0, mouseY: 0, winX: 0, winY: 0 });

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    dragStart.current = { mouseX: clientX, mouseY: clientY, winX: pos.x, winY: pos.y };
    onFocus?.();
    const onMove = (ev: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      const mX = 'touches' in ev ? ev.touches[0].clientX : ev.clientX;
      const mY = 'touches' in ev ? ev.touches[0].clientY : ev.clientY;
      setPos({
        x: dragStart.current.winX + mX - dragStart.current.mouseX,
        y: dragStart.current.winY + mY - dragStart.current.mouseY,
      });
    };
    const onUp = () => {
      isDragging.current = false;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);
  };

  const activeTitleBg = 'linear-gradient(to bottom, #b4d3f3 0%, #85b0e5 45%, #6998d6 50%, #85b1e5 100%)';
  const inactiveTitleBg = 'linear-gradient(to bottom, #d2e1f2 0%, #aebbe0 45%, #97a8d0 50%, #aabce0 100%)';
  const visibleHeight = 32 + (showMenuBar ? 24 : 0) + (showToolbar ? 68 : 0) + (showStatusBar ? 22 : 0);

  return (
    <div
      className="absolute pointer-events-auto"
      style={{
        left: pos.x,
        top: pos.y,
        width,
        boxShadow: isActive
          ? '3px 3px 12px rgba(0,0,0,0.5), 1px 1px 0 rgba(255,255,255,0.3) inset'
          : '2px 2px 8px rgba(0,0,0,0.3)',
        border: '1px solid #003',
        borderTop: '1px solid rgba(255,255,255,0.6)',
        borderLeft: '1px solid rgba(255,255,255,0.4)',
      }}
      onClick={() => onFocus?.()}
    >
      {/* Outer frame */}
      <div className="rounded-t-md" style={{ background: '#f0f4f9', border: '1px solid #7593c2' }}>

        {/* Title Bar */}
        <div
          onMouseDown={handlePointerDown}
          onTouchStart={handlePointerDown}
          className="h-[30px] px-2 flex items-center justify-between cursor-move"
          style={{
            background: isActive ? activeTitleBg : inactiveTitleBg,
            borderBottom: '1px solid #0a2a7a',
          }}
        >
          <div className="flex items-center gap-2 overflow-hidden flex-1">
            {titleContent ? titleContent : (
              <>
                {titleIcon && <span className="flex-shrink-0">{titleIcon}</span>}
                <span
                  className="font-bold text-xs truncate"
                  style={{ color: '#1a3a6e', textShadow: '0 1px 0 rgba(255,255,255,0.7)', fontSize: 12 }}
                >
                  {title}
                </span>
              </>
            )}
          </div>

          <div className="flex gap-[2px] flex-shrink-0 ml-2">
            <WinBtn onClick={() => setMinimized(m => !m)}>
              <Minus size={12} strokeWidth={2} />
            </WinBtn>
            <WinBtn>
              <Square size={10} strokeWidth={2} />
            </WinBtn>
            <WinBtn variant="close" onClick={onClose}>
              <X size={14} strokeWidth={2.5} />
            </WinBtn>
          </div>
        </div>

        {!minimized && (
          <>
            {/* Menu Bar */}
            {showMenuBar && (
              <div
                className="h-[22px] px-2 flex items-center gap-3 border-b"
                style={{ background: '#f0f4f9', borderColor: '#d3dbe8' }}
              >
                {menuItems.map(item => (
                  <span
                    key={item}
                    className="text-xs cursor-pointer px-1.5 hover:bg-[#cce8ff] hover:border-[#99d1ff] border border-transparent rounded-sm"
                    style={{ color: '#000' }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}

            {showToolbar && (
              <div
                className="py-1 px-2 flex flex-col gap-1 border-b"
                style={{ background: '#f5f8fc', borderColor: '#d3dbe8' }}
              >
                {toolbarContent}
              </div>
            )}

            {/* Content Area */}
            <div
              style={{
                height: height - visibleHeight,
                background: '#fff',
                overflow: 'auto',
              }}
            >
              {children}
            </div>

            {/* Status Bar */}
            {showStatusBar && (
              <div
                className="h-[22px] px-2 flex items-center text-xs border-t gap-4"
                style={{ background: '#f0f4f9', borderColor: '#d3dbe8', color: '#555' }}
              >
                {statusContent}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function WinBtn({ children, variant = 'normal', onClick }: { children: ReactNode; variant?: 'normal' | 'close'; onClick?: () => void }) {
  const isClose = variant === 'close';
  return (
    <button
      onClick={e => { e.stopPropagation(); onClick?.(); }}
      className={`w-[26px] h-[20px] rounded-sm flex items-center justify-center flex-shrink-0 transition-colors
        ${isClose ? 'hover:bg-[#e81123] hover:text-white group' : 'hover:bg-[#d0e4f7] hover:border-[#a9c9ed]'} 
      `}
      style={{
        border: '1px solid rgba(255,255,255,0.4)',
        background: isClose ? 'transparent' : 'rgba(255,255,255,0.3)',
        color: '#1a3a6e'
      }}
    >
      <span className={isClose ? "group-hover:text-white" : ""}>
        {children}
      </span>
    </button>
  );
}
