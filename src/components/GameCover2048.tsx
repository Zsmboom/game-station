import React from 'react';

function GameCover2048() {
  return (
    <div className="w-full h-48 bg-[#bbada0] rounded-lg overflow-hidden relative">
      <div className="absolute inset-0 grid grid-cols-2 gap-3 p-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#eee4da] rounded-md flex items-center justify-center text-2xl font-bold text-[#776e65]">2</div>
          <div className="bg-[#ede0c8] rounded-md flex items-center justify-center text-2xl font-bold text-[#776e65]">4</div>
          <div className="bg-[#f2b179] rounded-md flex items-center justify-center text-2xl font-bold text-white">8</div>
          <div className="bg-[#f59563] rounded-md flex items-center justify-center text-2xl font-bold text-white">16</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#f67c5f] rounded-md flex items-center justify-center text-2xl font-bold text-white">32</div>
          <div className="bg-[#f65e3b] rounded-md flex items-center justify-center text-2xl font-bold text-white">64</div>
          <div className="bg-[#edcf72] rounded-md flex items-center justify-center text-2xl font-bold text-white">128</div>
          <div className="bg-[#edc22e] rounded-md flex items-center justify-center text-2xl font-bold text-white">2048</div>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black/30 px-6 py-3 rounded-lg backdrop-blur-sm">
          <h3 className="text-4xl font-bold text-white text-center">2048</h3>
        </div>
      </div>
    </div>
  );
}

export default GameCover2048;