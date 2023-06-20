
import Banner from '@/components/banner';
import AboutUsSection from '@/components/home/aboutusSection';
import FeatureSection from '@/components/home/featureSection';
import ForumSection from '@/components/home/forumSection';
import LandingSection from '@/components/home/landingSection';
import NewsLetterSection from '@/components/home/newletterSection';
import TeamSection from '@/components/home/teamSection';

export default function Home() {

  return (
    <div className="bg-slate-900">
      <Banner
        title='Code Community Music'
        description='Launching soon!'
        href='/login'
        linkText='Get Started'
      />
      <LandingSection />
      <FeatureSection />
      <ForumSection />
      <AboutUsSection />
      <NewsLetterSection />
      <hr className="my-8 border-gray-700" />
      <TeamSection />
    </div>
  )
}
