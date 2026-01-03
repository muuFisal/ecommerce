import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SettingsFab } from './SettingsFab';
import { WheelPopup } from '../engagement/WheelPopup';
import { ExitIntentModal } from '../engagement/ExitIntentModal';
import { SoundManager } from '../engagement/SoundManager';

export const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-bg-base text-text-main noise-bg">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <SettingsFab />
      <SoundManager />
      <ExitIntentModal />
      <WheelPopup />
    </div>
  );
};