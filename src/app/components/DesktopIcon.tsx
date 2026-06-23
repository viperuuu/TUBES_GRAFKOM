import { ReactNode, useState } from 'react';

interface DesktopIconProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

export function DesktopIcon({ icon, label, onClick }: DesktopIconProps) {
  const [selected, setSelected] = useState(false);

  return (
    <button
      onClick={() => { setSelected(true); onClick(); }}
      onBlur={() => setSelected(false)}
      className="flex flex-col items-center gap-1 w-[72px] p-2 cursor-pointer"
      style={{
        background: selected ? 'rgba(49,106,197,0.5)' : 'transparent',
        outline: 'none',
      }}
    >
      <div>{icon}</div>
      <span
        className="text-xs text-center leading-tight w-full"
        style={{
          color: '#fff',
          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
          wordBreak: 'break-word',
        }}
      >
        {label}
      </span>
    </button>
  );
}
