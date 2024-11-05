import React from 'react';
import { useTranslation } from 'react-i18next';

interface ShareModalProps {
  score: number;
  imageUrl: string;
  shareUrl: string;
  onClose: () => void;
}

function ShareModal({ score, imageUrl, shareUrl, onClose }: ShareModalProps) {
  const { t } = useTranslation();

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('分享链接已复制到剪贴板！');
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-8 max-w-lg w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            {t('common.awesome')}
          </h3>
          <p className="text-gray-400 mt-2">
            {t('drawCircle.share.congratulations', { score })}
          </p>
        </div>

        <div className="bg-black rounded-lg p-4 mb-6">
          <img
            src={imageUrl}
            alt={t('drawCircle.share.title')}
            className="w-full rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={copyShareUrl}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg
              font-semibold hover:from-green-600 hover:to-blue-600 transition-all
              duration-200 shadow-lg shadow-green-500/30 text-white"
          >
            {t('common.shareWithFriends')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;