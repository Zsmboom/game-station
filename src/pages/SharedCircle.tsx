import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function SharedCircle() {
  const { t } = useTranslation();
  const { shareId } = useParams();

  return (
    <>
      <Helmet>
        <title>{t('drawCircle.share.title')} - Web Game</title>
        <meta name="description" content={t('drawCircle.share.viewShared')} />
      </Helmet>

      <div className="min-h-screen bg-black text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              {t('drawCircle.share.title')}
            </h1>
          </div>

          <div className="bg-gray-900 rounded-lg p-8 shadow-lg shadow-green-500/20">
            <div className="bg-black rounded-lg p-4 mb-6">
              <img
                src={`/api/shared-circles/${shareId}`}
                alt={t('drawCircle.share.viewShared')}
                className="w-full rounded-lg"
              />
            </div>

            <div className="text-center">
              <a
                href="/draw-circle"
                className="inline-block px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg
                  font-semibold hover:from-green-600 hover:to-blue-600 transition-all
                  duration-200 shadow-lg shadow-green-500/30"
              >
                {t('drawCircle.share.tryYourself')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}