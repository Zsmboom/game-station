import React from 'react';

interface GameTileProps {
  value: number;
}

const tileColors: Record<number, string> = {
  2: 'bg-[#eee4da] text-[#776e65]',
  4: 'bg-[#ede0c8] text-[#776e65]',
  8: 'bg-[#f2b179] text-white',
  16: 'bg-[#f59563] text-white',
  32: 'bg-[#f67c5f] text-white',
  64: 'bg-[#f65e3b] text-white',
  128: 'bg-[#edcf72] text-white',
  256: 'bg-[#edcc61] text-white',
  512: 'bg-[#edc850] text-white',
  1024: 'bg-[#edc53f] text-white',
  2048: 'bg-[#edc22e] text-white'
};

function GameTile({ value }: GameTileProps) {
  const colorClass = value ? tileColors[value] || 'bg-[#3c3a32] text-white' : 'bg-[#cdc1b4]';
  const fontSize = value >= 1024 ? 'text-3xl' : 'text-4xl';

  return (
    <div className={`w-16 h-16 flex items-center justify-center rounded-md 
      ${colorClass} ${fontSize} font-bold transition-all duration-100`}>
      {value || ''}
    </div>
  );
}

export default GameTile;