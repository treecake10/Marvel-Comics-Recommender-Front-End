import './App.css';
import Home from './Pages/Home';
import Explore from './Pages/Explore';
import CharacterDetails from './Pages/CharacterDetails';
import CreatorDetails from './Pages/CreatorDetails';
import Header from './Components/Header'
import Footer from './Components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart} from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const App = () => {
  library.add(faHeart, solidHeart);
  library.add(faStar, solidStar);
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
          <Route path="/creator/:id" element={<CreatorDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
