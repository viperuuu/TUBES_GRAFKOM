import { useState } from 'react';
import { Window } from './Window';
import {
  FolderOpen, Folder, FileText, Image, HardDrive, ChevronRight, ChevronDown,
  File, ArrowLeft, ArrowRight, ArrowUp, Search, List, LayoutGrid, FolderOpen as FolderIcon,
  Play, Users, CheckCircle2, Scissors, Copy, ClipboardPaste, Mail, Settings, HelpCircle
} from 'lucide-react';

interface ExplorerWindowProps {
  onClose: () => void;
  onFocus?: () => void;
  isActive?: boolean;
}

interface TreeNode {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: TreeNode[];
}

const tree: TreeNode[] = [
  {
    id: 'desktop', label: 'Desktop', icon: <FolderOpen size={14} color="#e8c84a" />,
    children: [
      { id: 'mycomp', label: 'My Computer', icon: <HardDrive size={14} color="#888" />, children: [
        { id: 'cdrive', label: 'Local Disk (C:)', icon: <HardDrive size={14} color="#5a9fd4" />, children: [
          { id: 'progfiles', label: 'Program Files', icon: <Folder size={14} color="#e8c84a" /> },
          { id: 'windows', label: 'Windows', icon: <Folder size={14} color="#e8c84a" /> },
          { id: 'users', label: 'Users', icon: (
            <div className="relative">
              <Folder size={14} color="#e8c84a" />
              <div className="absolute -bottom-1 -left-1 bg-white rounded-full">
                <Users size={8} color="#2168d4" />
              </div>
            </div>
          )},
        ]},
      ]},
      { id: 'docs', label: 'My Documents', icon: <Folder size={14} color="#e8c84a" />, children: [
        { id: 'pics', label: 'My Pictures', icon: <Folder size={14} color="#e8c84a" /> },
        { id: 'music', label: 'My Music', icon: <Folder size={14} color="#e8c84a" /> },
      ]},
    ],
  },
];

interface FileItem {
  icon: React.ReactNode;
  name: string;
  type: string;
  size: string;
  modified: string;
}

const fileItems: FileItem[] = [
  { icon: <FolderOpen size={16} color="#e8c84a" />, name: 'Program Files', type: 'File Folder', size: '', modified: '6/20/2024' },
  { icon: <FolderOpen size={16} color="#e8c84a" />, name: 'Windows', type: 'File Folder', size: '', modified: '6/20/2024' },
  { icon: <FolderOpen size={16} color="#e8c84a" />, name: 'My Documents', type: 'File Folder', size: '', modified: '6/21/2024' },
  { icon: <FolderOpen size={16} color="#e8c84a" />, name: 'Users', type: 'File Folder', size: '', modified: '6/20/2024' },
  { icon: <FileText size={16} color="#5a9fd4" />, name: 'readme.txt', type: 'Text Document', size: '2 KB', modified: '6/19/2024' },
  { icon: <FileText size={16} color="#5a9fd4" />, name: 'config.sys', type: 'System File', size: '1 KB', modified: '6/15/2024' },
  { icon: <Image size={16} color="#d45a5a" />, name: 'wallpaper.bmp', type: 'Bitmap Image', size: '1.2 MB', modified: '6/18/2024' },
  { icon: <File size={16} color="#888" />, name: 'program.exe', type: 'Application', size: '420 KB', modified: '6/17/2024' },
  { icon: <FileText size={16} color="#5a9fd4" />, name: 'notes.txt', type: 'Text Document', size: '4 KB', modified: '6/22/2024' },
  { icon: <Image size={16} color="#d45a5a" />, name: 'photo.jpg', type: 'JPEG Image', size: '3.4 MB', modified: '6/22/2024' },
];

function TreeNodeView({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [expanded, setExpanded] = useState(depth === 0);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <div
        className="flex items-center gap-1 py-[2px] cursor-pointer hover:bg-[#cce8ff] text-xs"
        style={{ paddingLeft: 4 + depth * 12 }}
        onClick={() => hasChildren && setExpanded(e => !e)}
      >
        <span className="w-3 h-3 flex items-center justify-center flex-shrink-0">
          {hasChildren
            ? expanded
              ? <Play size={8} color="#000" style={{ transform: 'rotate(90deg)' }} />
              : <Play size={8} color="#000" />
            : <Play size={8} color="#ccc" />}
        </span>
        <span className="flex-shrink-0">{node.icon}</span>
        <span className="truncate" style={{ color: '#000' }}>{node.label}</span>
      </div>
      {expanded && hasChildren && node.children!.map(child => (
        <TreeNodeView key={child.id} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

const ToolBtn = ({ children, title }: { children: React.ReactNode; title?: string }) => (
  <button
    title={title}
    className="h-[28px] px-2 flex items-center justify-center rounded-sm hover:bg-[#d0e4f7] active:bg-[#b8d4f0] border border-transparent hover:border-[#8ab4d8] text-xs gap-1"
    style={{ color: '#333' }}
  >
    {children}
  </button>
);

export function ExplorerWindow({ onClose, onFocus, isActive }: ExplorerWindowProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchVal, setSearchVal] = useState('');

  const titleContent = (
    <div className="flex items-center gap-2 w-full pr-2">
      <button className="flex-shrink-0 hover:bg-[#d0e4f7] rounded-sm border border-transparent hover:border-[#8ab4d8] transition-colors" style={{ padding: '2px' }}>
        <ArrowUp size={14} color="#1a3a6e" />
      </button>
      <FolderIcon size={14} color="#e8c84a" />
      <span className="text-[#1a3a6e] font-bold text-xs truncate" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.7)' }}>
        C:\Windows
      </span>
    </div>
  );

  const toolbar = (
    <div className="flex flex-col w-full gap-[2px]">
      <div className="flex items-center gap-1 w-full">
        <ToolBtn title="Back"><ArrowLeft size={14} color="#1a3a6e" /></ToolBtn>
        <ToolBtn title="Forward"><ArrowRight size={14} color="#1a3a6e" /></ToolBtn>
        <div className="w-px h-5 bg-[#d3dbe8] mx-1" />
        <div className="flex-1 flex items-center border h-[24px] px-2 gap-1 bg-white" style={{ borderColor: '#a9b3c6' }}>
          <FolderIcon size={12} color="#e8c84a" />
          <input className="outline-none text-xs bg-transparent w-full text-gray-800" value="C:\Windows" readOnly />
          <ChevronDown size={14} color="#555" className="cursor-pointer hover:bg-gray-200" />
        </div>
        <div className="w-px h-5 bg-[#d3dbe8] mx-1" />
        <div className="flex items-center border rounded-sm h-[24px] px-2 gap-1 bg-white" style={{ borderColor: '#a9b3c6', width: 150 }}>
          <Search size={11} color="#888" />
          <input
            className="outline-none text-xs bg-transparent w-full"
            placeholder="Search Windows"
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 px-1 py-1 w-full border-t border-[#f0f4f9]">
        <span className="text-xs text-[#1a3a6e] mr-2 flex items-center gap-1 cursor-pointer hover:underline">Organize <ChevronDown size={10} /></span>
        <span className="text-xs text-[#1a3a6e] mr-2 flex items-center gap-1 cursor-pointer hover:underline"><FolderOpen size={12} /> Open</span>
        <span className="text-xs text-[#1a3a6e] mr-2 flex items-center gap-1 cursor-pointer hover:underline">Share with <ChevronDown size={10} /></span>
        <span className="text-xs text-[#1a3a6e] mr-2 cursor-pointer hover:underline">Burn</span>
        <span className="text-xs text-[#1a3a6e] mr-2 cursor-pointer hover:underline">New folder</span>
        <div className="w-px h-4 bg-[#d3dbe8] mx-1" />
        <div className="flex items-center gap-2">
          <Scissors size={14} color="#d45a5a" className="cursor-pointer hover:opacity-80" />
          <Copy size={14} color="#2168d4" className="cursor-pointer hover:opacity-80" />
          <ClipboardPaste size={14} color="#e8c84a" className="cursor-pointer hover:opacity-80" />
          <div className="w-px h-4 bg-[#d3dbe8] mx-1" />
          <CheckCircle2 size={16} color="#d45a5a" className="cursor-pointer hover:opacity-80" />
          <FolderIcon size={16} color="#e8c84a" className="cursor-pointer hover:opacity-80" />
          <Mail size={16} color="#888" className="cursor-pointer hover:opacity-80" />
          <Settings size={16} color="#5a9fd4" className="cursor-pointer hover:opacity-80" />
          <HelpCircle size={16} color="#2168d4" className="cursor-pointer hover:opacity-80 ml-1" />
        </div>
        <div className="ml-auto flex gap-1">
          <ToolBtn title="List view" onClick={() => setViewMode('list')}><List size={14} color="#1a3a6e" /></ToolBtn>
          <ToolBtn title="Grid view" onClick={() => setViewMode('grid')}><LayoutGrid size={14} color="#1a3a6e" /></ToolBtn>
        </div>
      </div>
    </div>
  );

  const filtered = fileItems.filter(f => f.name.toLowerCase().includes(searchVal.toLowerCase()));

  return (
    <Window
      title="Explorer"
      titleContent={titleContent}
      onClose={onClose}
      onFocus={onFocus}
      isActive={isActive}
      width={900}
      height={550}
      x={233}
      y={80}
      showMenuBar={true}
      showToolbar={true}
      toolbarContent={toolbar}
      showStatusBar={true}
      statusContent={
        <>
          <span>13 items selected (Disk free space: 348 GB)</span>
          <span className="ml-auto flex items-center gap-4">
            <span>4.22 MB</span>
            <span className="flex items-center gap-1"><HardDrive size={12} /> Computer</span>
          </span>
        </>
      }
    >
      <div className="flex h-full">
        {/* Left Navigation Tree */}
        <div
          className="w-[200px] border-r overflow-y-auto flex-shrink-0"
          style={{ background: '#f5f4f0', borderColor: '#d0c8b8', minHeight: '100%' }}
        >
          {/* Folders header */}
          <div
            className="px-3 py-1 text-xs font-bold border-b flex items-center gap-1"
            style={{
              background: 'linear-gradient(to bottom, #ddeeff 0%, #c8dff5 100%)',
              borderColor: '#b0c8e8',
              color: '#1a3a6e',
            }}
          >
            <Folder size={12} />
            Folders
          </div>
          <div className="py-1">
            {tree.map(node => (
              <TreeNodeView key={node.id} node={node} depth={0} />
            ))}
          </div>
        </div>

        {/* Right File Panel */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ background: '#fff' }}>
          {/* Column Headers */}
          {viewMode === 'list' && (
            <div
              className="flex items-center border-b text-xs font-semibold select-none flex-shrink-0"
              style={{ background: '#f0efe8', borderColor: '#d0c8b8', height: 22 }}
            >
              {[['Name', 260], ['Type', 130], ['Size', 80], ['Date Modified', 110]].map(([col, w]) => (
                <div
                  key={col as string}
                  className="px-2 border-r flex items-center h-full cursor-pointer hover:bg-[#e0dfd8]"
                  style={{ width: w as number, borderColor: '#d0c8b8', color: '#333' }}
                >
                  {col}
                </div>
              ))}
            </div>
          )}

          {/* File list */}
          {viewMode === 'list' ? (
            <div className="flex-1 overflow-y-auto">
              {filtered.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedFile(item.name)}
                  className="flex items-center text-xs cursor-pointer border-b"
                  style={{
                    height: 22,
                    borderColor: '#f0efe8',
                    background: selectedFile === item.name
                      ? 'linear-gradient(to bottom, #cde9ff 0%, #b8dcff 100%)'
                      : i % 2 === 0 ? '#fff' : '#fafaf8',
                    color: selectedFile === item.name ? '#000080' : '#000',
                  }}
                >
                  <div className="flex items-center gap-2 px-2" style={{ width: 260 }}>
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  <div className="px-2 text-gray-500" style={{ width: 130 }}>{item.type}</div>
                  <div className="px-2 text-gray-500 text-right" style={{ width: 80 }}>{item.size}</div>
                  <div className="px-2 text-gray-500" style={{ width: 110 }}>{item.modified}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-3">
              <div className="flex flex-wrap gap-4">
                {filtered.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedFile(item.name)}
                    className="flex flex-col items-center gap-1 p-2 cursor-pointer rounded-sm w-[72px] text-center"
                    style={{
                      background: selectedFile === item.name ? '#cde9ff' : 'transparent',
                    }}
                  >
                    {item.icon}
                    <span className="text-xs break-all leading-tight" style={{ fontSize: 10 }}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Window>
  );
}
