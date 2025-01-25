import './App.css';
import Home from './Pages/Home';
import Explore from './Pages/ExplorePage/Explore';
import Recommend from './Pages/RecommendPage/Recommend';
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
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as solidBookmark} from '@fortawesome/free-solid-svg-icons';
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
    console.log(auth.success)
  }, [auth.jwt])

  library.add(faBookmark, solidBookmark);
  library.add(faHeart, solidHeart);
  library.add(faStar, solidStar);
  library.add(faUser);
  library.add(faEnvelope);
  library.add(faLock);

  return (
    <Router>
      <div>
        <Header isAuthenticated={auth.success}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/character/:id" element={<CharacterDetails isAuthenticated={auth.success}/>} />
          <Route path="/series/:id" element={<SeriesDetails isAuthenticated={auth.success}/>} />
          <Route path="/creator/:id" element={<CreatorDetails isAuthenticated={auth.success} />} />
          <Route path="/comic/:id" element={<ComicDetails isAuthenticated={auth.success} />} />
          <Route path="/event/:id" element={<EventDetails isAuthenticated={auth.success} />} />
          <Route path="/authentication" element={<Authentication />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
