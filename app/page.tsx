import { readHomeData } from '@/lib/dataService';
import HolaMundo from '@/components/HolaMundo';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const data = readHomeData();
  return {
    title: data.meta.pageTitle,
    description: data.meta.description,
  };
}

export default function HomePage() {
  const homeData = readHomeData();

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0B0914] via-[#100D23] to-[#1A1235]">
      {/* Background layer for extra depth */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] mix-blend-screen pointer-events-none" />
      
      <HolaMundo
        title={homeData.hero.title}
        subtitle={homeData.hero.subtitle}
        description={homeData.hero.description}
      />
    </main>
  );
}
