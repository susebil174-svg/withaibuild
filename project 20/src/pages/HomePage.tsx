import Hero from '../components/Hero';
import SocialProof from '../components/SocialProof';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import CTA from '../components/CTA';
import { usePageLoader } from '../hooks/usePageLoader';
import PageSkeleton from '../components/PageSkeleton';
import type { AuthTab } from '../App';

interface Props {
  onOpenAuth: (tab?: AuthTab) => void;
}

export default function HomePage({ onOpenAuth }: Props) {
  const loading = usePageLoader();
  if (loading) return <PageSkeleton />;
  return (
    <main>
      <Hero />
      <SocialProof />
      <Features />
      <HowItWorks />
      <Pricing onOpenAuth={onOpenAuth} />
      <CTA onOpenAuth={onOpenAuth} />
    </main>
  );
}
