import { HeroSection } from '../components/home/hero-section';
import { FeaturedCategories } from '../components/home/featured-categories';
import { NewArrivals } from '../components/home/new-arrivals';

const App = () => {
  return (
    <div className='min-h-screen bg-primary'>
      <HeroSection />
      <NewArrivals />
      <FeaturedCategories />
    </div>
  );
};

export default App;
