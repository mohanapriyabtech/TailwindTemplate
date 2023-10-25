import logo from './logo.svg';
import './App.css';
import Navbar from '../src/components/Navbar';
import Header from '../src/components/Header';
import FeatureSection from './components/FeatureSection';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <FeatureSection />
    </div>
  );
}

export default App;
