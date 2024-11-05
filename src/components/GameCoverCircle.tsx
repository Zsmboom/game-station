import React from 'react';

function GameCoverCircle() {
  return (
    <div className="w-full h-48 bg-black rounded-lg overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 border-4 border-[#00ff00] rounded-full 
          animate-[spin_3s_linear_infinite] shadow-[0_0_15px_#00ff00]" />
        <div className="absolute w-28 h-28 border-2 border-dashed border-white/20 rounded-full" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-bold font-mono text-[#00ff00] drop-shadow-[0_0_5px_#00ff00]">
            78.4%
          </h3>
          <p className="text-white/80 font-mono text-sm">NEW BEST SCORE</p>
        </div>
      </div>
    </div>
  );
}

export default GameCoverCircle;