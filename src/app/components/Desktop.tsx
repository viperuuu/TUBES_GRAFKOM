import { useState, useEffect } from 'react';
import { Taskbar } from './Taskbar';
import { StartMenu } from './StartMenu';
import { DesktopIcon } from './DesktopIcon';
import { ExplorerWindow } from './ExplorerWindow';
import { CalculatorWindow } from './CalculatorWindow';
import { PaintWindow } from './PaintWindow';
import { AboutDialog } from './AboutDialog';
import { Computer, FolderOpen, Calculator, Paintbrush, FileText } from 'lucide-react';

export function Desktop() {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [openWindows, setOpenWindows] = useState({
    explorer: true,
    calculator: true,
    paint: true,
    notepad: false,
    about: true,
  });
  const [activeWindow, setActiveWindow] = useState<string | null>('about');
  const [time, setTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleStartClick = () => setStartMenuOpen(prev => !prev);

  const handleMenuItemClick = (item: string) => {
    if (item === 'shutdown') {
      alert('Shutdown clicked - This is a demo interface');
      setStartMenuOpen(false);
      return;
    }
    setOpenWindows(prev => ({ ...prev, [item]: true }));
    setActiveWindow(item);
    setStartMenuOpen(false);
  };

  const closeWindow = (window: string) => {
    setOpenWindows(prev => ({ ...prev, [window]: false }));
    if (activeWindow === window) setActiveWindow(null);
  };

  const focusWindow = (window: string) => setActiveWindow(window);

  return (
    <div
      className="w-full h-full relative overflow-hidden select-none"
      style={{
        fontFamily: '"Segoe UI", "Tahoma", "MS Sans Serif", Arial, sans-serif',
        background: 'linear-gradient(135deg, #1a6b3c 0%, #2d8a55 30%, #246b45 60%, #1a5c3a 100%)',
      }}
      onClick={() => startMenuOpen && setStartMenuOpen(false)}
    >
      {/* Desktop texture pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 50%)',
        }}
      />

      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-5">
        <DesktopIcon
          icon={<Computer size={32} strokeWidth={1.5} color="white" />}
          label="My Computer"
          onClick={() => handleMenuItemClick('explorer')}
        />
        <DesktopIcon
          icon={<FolderOpen size={32} strokeWidth={1.5} color="white" />}
          label="Explorer"
          onClick={() => handleMenuItemClick('explorer')}
        />
        <DesktopIcon
          icon={<Calculator size={32} strokeWidth={1.5} color="white" />}
          label="Calculator"
          onClick={() => handleMenuItemClick('calculator')}
        />
        <DesktopIcon
          icon={<Paintbrush size={32} strokeWidth={1.5} color="white" />}
          label="Paint"
          onClick={() => handleMenuItemClick('paint')}
        />
        <DesktopIcon
          icon={<FileText size={32} strokeWidth={1.5} color="white" />}
          label="Notepad"
          onClick={() => handleMenuItemClick('notepad')}
        />
      </div>

      {/* Windows — z-index layering by active */}
      {openWindows.explorer && (
        <div style={{ zIndex: activeWindow === 'explorer' ? 20 : 10 }} className="absolute inset-0 pointer-events-none">
          <ExplorerWindow onClose={() => closeWindow('explorer')} onFocus={() => focusWindow('explorer')} isActive={activeWindow === 'explorer'} />
        </div>
      )}
      {openWindows.calculator && (
        <div style={{ zIndex: activeWindow === 'calculator' ? 20 : 11 }} className="absolute inset-0 pointer-events-none">
          <CalculatorWindow onClose={() => closeWindow('calculator')} onFocus={() => focusWindow('calculator')} isActive={activeWindow === 'calculator'} />
        </div>
      )}
      {openWindows.paint && (
        <div style={{ zIndex: activeWindow === 'paint' ? 20 : 12 }} className="absolute inset-0 pointer-events-none">
          <PaintWindow onClose={() => closeWindow('paint')} onFocus={() => focusWindow('paint')} isActive={activeWindow === 'paint'} />
        </div>
      )}
      {openWindows.about && (
        <div style={{ zIndex: 30 }} className="absolute inset-0 pointer-events-none">
          <AboutDialog onClose={() => closeWindow('about')} />
        </div>
      )}

      {/* Start Menu */}
      {startMenuOpen && (
        <div style={{ zIndex: 50 }} onClick={e => e.stopPropagation()}>
          <StartMenu onItemClick={handleMenuItemClick} />
        </div>
      )}

      {/* Taskbar */}
      <Taskbar
        onStartClick={handleStartClick}
        startMenuOpen={startMenuOpen}
        time={time}
        openWindows={openWindows}
        activeWindow={activeWindow}
        onWindowClick={focusWindow}
      />
    </div>
  );
}
