import { FolderOpen, Calculator, Paintbrush, FileText, Info, Power, User, Settings, Search } from 'lucide-react';

interface StartMenuProps {
  onItemClick: (item: string) => void;
}

const topItems = [
  { id: 'explorer', icon: <FolderOpen size={20} color="#e8c84a" />, label: 'Windows Explorer', sub: 'Browse files and folders' },
  { id: 'calculator', icon: <Calculator size={20} color="#5a9fd4" />, label: 'Calculator', sub: 'Perform calculations' },
  { id: 'paint', icon: <Paintbrush size={20} color="#d45a5a" />, label: 'Paint', sub: 'Draw and edit images' },
  { id: 'notepad', icon: <FileText size={20} color="#888" />, label: 'Notepad', sub: 'Edit text files' },
];

const bottomItems = [
  { id: 'about', icon: <Info size={16} color="#5a9fd4" />, label: 'About This System' },
  { id: 'settings', icon: <Settings size={16} color="#888" />, label: 'Control Panel' },
  { id: 'shutdown', icon: <Power size={16} color="#e05050" />, label: 'Shut Down...' },
];

export function StartMenu({ onItemClick }: StartMenuProps) {
  return (
    <div
      className="absolute bottom-[38px] left-0 w-[360px]"
      style={{
        boxShadow: '4px 4px 16px rgba(0,0,0,0.5)',
        border: '1px solid #0a2a7a',
        borderBottom: 'none',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{
          background: 'linear-gradient(to right, #1a56c8 0%, #2168d4 100%)',
          borderBottom: '1px solid #0a2a7a',
        }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.4)' }}
        >
          <User size={22} color="white" />
        </div>
        <div>
          <div className="text-white font-bold text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
            Fawwaz Ainun Hisyam
          </div>
          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>Computer Graphics Student</div>
        </div>
      </div>

      {/* Body */}
      <div className="flex" style={{ background: '#ece9d8' }}>
        {/* Left: Programs */}
        <div className="flex-1 py-2 border-r" style={{ borderColor: '#c8c0b0' }}>
          <div className="px-3 pb-1 text-xs font-bold" style={{ color: '#6666aa' }}>Programs</div>

          {topItems.map(item => (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className="w-full px-3 py-2 flex items-center gap-3 text-left hover:bg-[#3169c6] group"
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <div>
                <div className="text-xs font-bold group-hover:text-white" style={{ color: '#000' }}>{item.label}</div>
                <div className="text-xs group-hover:text-blue-100" style={{ color: '#666' }}>{item.sub}</div>
              </div>
            </button>
          ))}

          <div className="mx-3 my-2 border-t" style={{ borderColor: '#c8c0b0' }} />

          {/* Search */}
          <div className="px-3 pb-1">
            <div className="flex items-center gap-2 border rounded-sm px-2 py-1 bg-white" style={{ borderColor: '#8ab4d8' }}>
              <Search size={12} color="#888" />
              <span className="text-xs text-gray-400">Search programs and files</span>
            </div>
          </div>
        </div>

        {/* Right: System */}
        <div className="w-[140px] py-2" style={{ background: '#dfe5f5' }}>
          <div className="px-3 pb-1 text-xs font-bold" style={{ color: '#6666aa' }}>System</div>
          {bottomItems.map(item => (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className="w-full px-3 py-2 flex items-center gap-2 text-left hover:bg-[#3169c6] group"
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="text-xs group-hover:text-white" style={{ color: '#000' }}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className="px-4 py-2 flex justify-end gap-3 border-t"
        style={{ background: '#dfe5f5', borderColor: '#c8c0b0' }}
      >
        <button
          onClick={() => onItemClick('shutdown')}
          className="flex items-center gap-2 px-4 py-1 text-xs rounded-sm hover:bg-[#c8d8f0]"
          style={{
            background: 'linear-gradient(to bottom, #e8e4dc 0%, #d8d0c8 100%)',
            border: '1px solid #aca899',
            boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
          }}
        >
          <Power size={12} color="#e05050" />
          Shut Down
        </button>
      </div>
    </div>
  );
}
