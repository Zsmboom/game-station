import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import GameTile from '../components/GameTile';
import { use2048 } from '../hooks/use2048';

function Game2048() {
  const { t } = useTranslation();
  const { grid, score, gameOver, move, resetGame } = use2048();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          move('up');
          break;
        case 'ArrowDown':
          event.preventDefault();
          move('down');
          break;
        case 'ArrowLeft':
          event.preventDefault();
          move('left');
          break;
        case 'ArrowRight':
          event.preventDefault();
          move('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  return (
    <>
      <Helmet>
        <title>{t('2048.title')} - Web Game</title>
        <meta name="description" content={t('2048.description')} />
      </Helmet>

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('2048.title')}</h1>
          <div className="flex justify-center gap-8 mb-4">
            <div className="bg-gray-200 rounded-lg px-4 py-2">
              <p className="text-sm text-gray-600">{t('common.score')}</p>
              <p className="text-2xl font-bold text-gray-900">{score}</p>
            </div>
            <button
              onClick={resetGame}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 
                transition-colors duration-200"
            >
              {t('common.restart')}
            </button>
          </div>
          <p className="text-gray-600">{t('2048.description')}</p>
        </div>

        <div className="bg-[#bbada0] p-4 rounded-lg mx-auto w-fit">
          <div className="grid grid-cols-4 gap-4">
            {grid.map((row, i) =>
              row.map((cell, j) => (
                <GameTile key={`${i}-${j}`} value={cell} />
              ))
            )}
          </div>
        </div>

        {gameOver && (
          <div className="text-center mt-8">
            <p className="text-xl font-bold text-red-600 mb-4">{t('common.gameOver')}</p>
            <button
              onClick={resetGame}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 
                transition-colors duration-200"
            >
              {t('common.playAgain')}
            </button>
          </div>
        )}

        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('2048.rules.title')}</h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-lg mb-2">{t('2048.rules.objective.title')}</h3>
              <p>{t('2048.rules.objective.text')}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">{t('2048.rules.howToPlay.title')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium mb-2">{t('2048.rules.howToPlay.controls')}:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>↑ {t('2048.rules.howToPlay.up')}</li>
                    <li>↓ {t('2048.rules.howToPlay.down')}</li>
                    <li>← {t('2048.rules.howToPlay.left')}</li>
                    <li>→ {t('2048.rules.howToPlay.right')}</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">{t('2048.rules.scoring.title')}:</p>
                  <p>{t('2048.rules.scoring.text')}</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{t('2048.rules.tips.title')}</h3>
              <ul className="list-disc list-inside space-y-2">
                {t('2048.rules.tips.items', { returnObjects: true }).map((tip: string, index: number) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Game2048;