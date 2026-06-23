import { Info } from 'lucide-react';

interface AboutDialogProps {
  onClose: () => void;
}

export function AboutDialog({ onClose }: AboutDialogProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        className="pointer-events-auto w-[420px]"
        style={{
          boxShadow: '4px 4px 20px rgba(0,0,0,0.6)',
          border: '1px solid #0a2a7a',
          fontFamily: '"Segoe UI", Tahoma, Arial, sans-serif',
        }}
      >
        {/* Title Bar */}
        <div
          className="h-[30px] px-3 flex items-center justify-between"
          style={{
            background: 'linear-gradient(to bottom, #2168d4 0%, #1a56c8 40%, #1648b8 100%)',
            borderBottom: '1px solid #0a2a7a',
          }}
        >
          <div className="flex items-center gap-2">
            <Info size={13} color="rgba(255,255,255,0.9)" />
            <span className="text-white font-bold text-xs" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.5)' }}>
              About — Windows Classic Simulator
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-[18px] h-[18px] rounded-sm flex items-center justify-center text-white font-bold text-sm"
            style={{
              background: 'linear-gradient(to bottom, #e06060cc 0%, #e06060 100%)',
              border: '1px solid rgba(0,0,0,0.3)',
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ background: '#ece9d8', border: '2px solid #848484', borderTop: 'none' }}>
          {/* Header banner */}
          <div
            className="px-6 py-5 flex items-center gap-5"
            style={{
              background: 'linear-gradient(to right, #1648b8 0%, #2a7ad4 50%, #1648b8 100%)',
              borderBottom: '2px solid #0a2a7a',
            }}
          >
            {/* Windows-style logo */}
            <div
              className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-sm"
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '2px solid rgba(255,255,255,0.3)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}
            >
              <div className="grid grid-cols-2 gap-[3px] w-[28px] h-[28px]">
                <div style={{ background: '#f25022' }} />
                <div style={{ background: '#7fba00' }} />
                <div style={{ background: '#00a4ef' }} />
                <div style={{ background: '#ffb900' }} />
              </div>
            </div>
            <div>
              <div className="text-white font-bold text-base" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                Windows Classic Simulator
              </div>
              <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Version 1.0 • Computer Graphics
              </div>
            </div>
          </div>

          {/* Info content */}
          <div className="px-6 py-4 space-y-3">
            <div className="text-center space-y-1">
              <p className="font-bold text-sm" style={{ color: '#1a3a6e' }}>Computer Graphics Final Project</p>
              <p className="text-sm text-gray-600">Universitas Muhammadiyah Malang</p>
              <p className="text-xs text-gray-400">Informatics Engineering Department • 2024</p>
            </div>

            {/* Divider */}
            <div className="border-t" style={{ borderColor: '#c8c0b0' }} />

            {/* Team members */}
            <div
              className="rounded-sm overflow-hidden"
              style={{ border: '1px solid #aca899' }}
            >
              <div
                className="px-3 py-2 text-xs font-bold"
                style={{
                  background: 'linear-gradient(to bottom, #ddeeff 0%, #c8dff5 100%)',
                  borderBottom: '1px solid #aca899',
                  color: '#1a3a6e',
                }}
              >
                Development Team
              </div>
              {[
                { name: 'Fawwaz Ainun Hisyam', role: 'Lead Developer' },
                { name: 'Team Member 2', role: 'UI Designer' },
                { name: 'Team Member 3', role: 'Programmer' },
              ].map((member, i) => (
                <div
                  key={i}
                  className="px-3 py-2 flex items-center justify-between"
                  style={{
                    background: i % 2 === 0 ? '#fff' : '#f8f6f0',
                    borderBottom: i < 2 ? '1px solid #ece9d8' : 'none',
                  }}
                >
                  <span className="text-sm font-medium" style={{ color: '#000' }}>{member.name}</span>
                  <span className="text-xs text-gray-400">{member.role}</span>
                </div>
              ))}
            </div>

            {/* OK Button */}
            <div className="flex justify-center pt-1">
              <button
                onClick={onClose}
                className="px-8 py-2 text-sm font-medium rounded-sm hover:brightness-105 active:brightness-95"
                style={{
                  background: 'linear-gradient(to bottom, #f8f6f0 0%, #e8e4dc 100%)',
                  border: '1px solid #aca899',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5)',
                  color: '#000',
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
