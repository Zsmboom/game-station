import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Game2048 from './pages/Game2048';
import DrawCircle from './pages/DrawCircle';
import SharedCircle from './pages/SharedCircle';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="2048" element={<Game2048 />} />
        <Route path="draw-circle" element={<DrawCircle />} />
        <Route path="draw-circle/share/:shareId" element={<SharedCircle />} />
      </Route>
    </Routes>
  );
}