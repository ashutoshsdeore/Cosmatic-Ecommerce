import Hero from './components/Hero';
import SeeTheWorld from './components/SeeTheWorld';
import ExploreVR from './components/ExploreVR';
import ShopByCategory from './components/ShopByCategory';
import ProductStandout from './components/ProductStandout';
import PopularCollections from './components/PopularCollections';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#FBF7F4]">
      <Hero />
      <SeeTheWorld />
      <ExploreVR />
      <ShopByCategory />
      <ProductStandout />
      <PopularCollections />
      <Footer/>
    </div>
  );
}

export default App;
