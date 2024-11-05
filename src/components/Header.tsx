import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

function Header() {
  const { t } = useTranslation();

  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <img src="/favicon.svg" alt="Web Game Logo" className="w-8 h-8 mr-2" />
            Web Game
          </Link>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="hover:text-indigo-200">{t('header.home')}</Link>
              <Link to="/2048" className="hover:text-indigo-200">{t('header.2048')}</Link>
              <Link to="/draw-circle" className="hover:text-indigo-200">{t('header.drawCircle')}</Link>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;