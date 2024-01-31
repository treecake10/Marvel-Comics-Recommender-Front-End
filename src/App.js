import './App.css';
import Home from './Pages/Home';
import Explore from './Pages/Explore';
import ChacterDetails from './Pages/CharacterDetails';
import Header from './Components/Header'
import Footer from './Components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/:id" element={<ChacterDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
