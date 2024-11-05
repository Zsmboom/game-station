import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import GameCover2048 from '../components/GameCover2048';
import GameCoverCircle from '../components/GameCoverCircle';

function Home() {
  const { t } = useTranslation();

  const games = [
    {
      id: '2048',
      title: t('home.games.2048.title'),
      description: t('home.games.2048.description'),
      Component: GameCover2048
    },
    {
      id: 'draw-circle',
      title: t('home.games.drawCircle.title'),
      description: t('home.games.drawCircle.description'),
      Component: GameCoverCircle
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('home.title')}</title>
        <meta name="description" content={t('home.subtitle')} />
      </Helmet>
      
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('home.title')}</h1>
        <p className="text-xl text-gray-600">{t('home.subtitle')}</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map(game => (
          <Link 
            key={game.id}
            to={`/${game.id}`}
            className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <game.Component />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{game.title}</h2>
              <p className="text-gray-600">{game.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Home;