import { FolderOpen, Calculator, Paintbrush, Info, Volume2, Wifi } from 'lucide-react';

interface TaskbarProps {
  onStartClick: () => void;
  startMenuOpen: boolean;
  time: string;
  openWindows: Record<string, boolean>;
  activeWindow: string | null;
  onWindowClick: (window: string) => void;
}

const windowMeta: Record<string, { label: string; icon: React.ReactNode }> = {
  explorer: { label: 'Explorer', icon: <FolderOpen size={14} /> },
  calculator: { label: 'Calculator', icon: <Calculator size={14} /> },
  paint: { label: 'Paint', icon: <Paintbrush size={14} /> },
  about: { label: 'About', icon: <Info size={14} /> },
};

export function Taskbar({ onStartClick, startMenuOpen, time, openWindows, activeWindow, onWindowClick }: TaskbarProps) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[38px] flex items-center px-1 gap-1"
      style={{
        background: 'linear-gradient(to bottom, #245edc 0%, #1a4dbf 50%, #1648b8 100%)',
        borderTop: '1px solid #5b9bd5',
        boxShadow: '0 -1px 0 #0a2a7a',
      }}
    >
      {/* START Button */}
      <button
        onClick={e => { e.stopPropagation(); onStartClick(); }}
        className="h-[30px] px-4 flex items-center gap-2 font-bold text-white text-sm rounded-sm"
        style={{
          background: startMenuOpen
            ? 'linear-gradient(to bottom, #1a5c2a 0%, #2a8a3e 100%)'
            : 'linear-gradient(to bottom, #54a354 0%, #3c8b3c 40%, #2d7a2d 100%)',
          border: '1px solid #1a4d1a',
          boxShadow: startMenuOpen
            ? 'inset 0 1px 3px rgba(0,0,0,0.4)'
            : '0 1px 2px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
          textShadow: '0 1px 1px rgba(0,0,0,0.5)',
          letterSpacing: '0.5px',
          minWidth: 80,
        }}
      >
        {/* Windows logo */}
        <div className="grid grid-cols-2 gap-[2px] w-[14px] h-[14px] flex-shrink-0">
          <div style={{ background: '#f25022' }} />
          <div style={{ background: '#7fba00' }} />
          <div style={{ background: '#00a4ef' }} />
          <div style={{ background: '#ffb900' }} />
        </div>
        <span style={{ fontWeight: 700, fontStyle: 'italic' }}>Start</span>
      </button>

      {/* Separator */}
      <div className="w-px h-6 mx-1" style={{ background: 'rgba(255,255,255,0.2)' }} />

      {/* Open window buttons */}
      <div className="flex gap-1 flex-1 overflow-hidden">
        {Object.entries(openWindows).map(([key, isOpen]) => {
          if (!isOpen || !windowMeta[key]) return null;
          const meta = windowMeta[key];
          const isActive = activeWindow === key;
          return (
            <button
              key={key}
              onClick={() => onWindowClick(key)}
              className="h-[28px] px-3 flex items-center gap-2 text-white text-xs min-w-[100px] max-w-[160px] rounded-sm"
              style={{
                background: isActive
                  ? 'linear-gradient(to bottom, #1a3d9e 0%, #2a5ac7 100%)'
                  : 'linear-gradient(to bottom, #3669c9 0%, #2457b8 100%)',
                border: isActive ? '1px solid #0a2a7a' : '1px solid #4a7ad8',
                boxShadow: isActive
                  ? 'inset 0 1px 3px rgba(0,0,0,0.4)'
                  : '0 1px 2px rgba(0,0,0,0.2)',
                textShadow: '0 1px 1px rgba(0,0,0,0.5)',
              }}
            >
              {meta.icon}
              <span className="truncate">{meta.label}</span>
            </button>
          );
        })}
      </div>

      {/* System Tray */}
      <div
        className="h-[28px] px-3 flex items-center gap-3 rounded-sm"
        style={{
          background: 'linear-gradient(to bottom, #1a4dbf 0%, #1340a8 100%)',
          border: '1px solid #0a2a7a',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)',
        }}
      >
        <Wifi size={12} color="rgba(255,255,255,0.8)" />
        <Volume2 size={12} color="rgba(255,255,255,0.8)" />
        <div className="w-px h-4 mx-1" style={{ background: 'rgba(255,255,255,0.2)' }} />
        <span className="text-white text-xs font-medium" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.5)' }}>
          {time}
        </span>
      </div>
    </div>
  );
}
