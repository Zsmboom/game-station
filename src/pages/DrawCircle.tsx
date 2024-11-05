import React, { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ShareModal from '../components/ShareModal';

export default function DrawCircle() {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [perfectCircle, setPerfectCircle] = useState<{ x: number; y: number; radius: number } | null>(null);
  const [bestScore, setBestScore] = useState<number>(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareData, setShareData] = useState<{ imageUrl: string; shareUrl: string } | null>(null);
  const [hasShownModal, setHasShownModal] = useState(false);

  // Canvas setup and drawing logic remains the same...
  // [Previous canvas-related code remains unchanged]

  return (
    <>
      <Helmet>
        <title>{t('drawCircle.title')} - Web Game</title>
        <meta name="description" content={t('drawCircle.description')} />
      </Helmet>

      <div className="min-h-screen bg-black text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              {t('drawCircle.title')}
            </h1>
            <p className="text-gray-400">{t('drawCircle.description')}</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-8 shadow-lg shadow-green-500/20">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={endDrawing}
              onMouseLeave={endDrawing}
              className="w-full bg-black rounded-lg mb-6"
              style={{ maxWidth: '800px', margin: '0 auto' }}
            />

            <div className="flex justify-between items-center">
              <div className="text-2xl">
                {t('drawCircle.currentScore')}: <span className="font-bold text-green-500">{score ?? '-'}%</span>
              </div>
              <div className="text-2xl">
                {t('common.bestScore')}: <span className="font-bold text-blue-500">{bestScore}%</span>
              </div>
            </div>

            <button
              onClick={resetCanvas}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg
                font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-200"
            >
              {t('common.restart')}
            </button>
          </div>

          <div className="mt-8 text-gray-400">
            <h2 className="text-2xl font-bold mb-4">{t('drawCircle.instructions.title')}</h2>
            <ul className="list-disc list-inside space-y-2">
              {t('drawCircle.instructions.items', { returnObjects: true }).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {showShareModal && shareData && score && (
          <ShareModal
            score={score}
            imageUrl={shareData.imageUrl}
            shareUrl={shareData.shareUrl}
            onClose={() => setShowShareModal(false)}
          />
        )}
      </div>
    </>
  );
}