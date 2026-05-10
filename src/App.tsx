/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

import About from './components/About';
import Contact from './components/Contact';
import { CursorGlow } from './components/CursorGlow';
import { FilmGrain } from './components/FilmGrain';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import { ScrollProgress } from './components/ScrollProgress';
import Services from './components/Services';
import Technologies from './components/Technologies';
import { AmbientAudioProvider } from './context/AmbientAudioContext';

export default function App() {
  return (
    <AmbientAudioProvider>
      <motion.div
        className="relative min-h-screen selection:bg-primary/30 selection:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="pointer-events-none fixed inset-0 -z-10 page-grid opacity-[0.18]"
          aria-hidden
        />
        <div
          className="pointer-events-none fixed inset-0 -z-10 bg-linear-to-b from-[#3b82f6]/12 via-transparent to-transparent opacity-90"
          aria-hidden
        />
        <ScrollProgress />
        <CursorGlow />
        <FilmGrain />
        <Navbar />
        <main>
          <Hero />
          <Technologies />
          <Services />
          <Portfolio />
          <About />
          <Process />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </AmbientAudioProvider>
  );
}
