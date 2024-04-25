import './App.css';
import Home from './Pages/Home';
import Explore from './Pages/ExplorePage/Explore';
import CharacterDetails from './Pages/CharacterDetails';
import SeriesDetails from './Pages/SeriesDetails';
import CreatorDetails from './Pages/CreatorDetails';
import ComicDetails from './Pages/ComicDetails';
import EventDetails from './Pages/EventDetails';
import Header from './Components/Header'
import Footer from './Components/Footer';
import Authentication from './Components/Authentication';
import { getUser } from './Components/State/Auth/Action';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart} from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';


const App = () => {

  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")
  const {auth} = useSelector(store=>store)

  useEffect(()=> {
    dispatch(getUser(auth.jwt || jwt))
  }, [auth.jwt])

  library.add(faHeart, solidHeart);
  library.add(faStar, solidStar);
  library.add(faUser);
  library.add(faEnvelope);
  library.add(faLock);

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
          <Route path="/series/:id" element={<SeriesDetails />} />
          <Route path="/creator/:id" element={<CreatorDetails />} />
          <Route path="/comic/:id" element={<ComicDetails />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/authentication" element={<Authentication />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
