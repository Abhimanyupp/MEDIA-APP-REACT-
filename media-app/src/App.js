
import { Route,Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Landingpage from './Pages/Landingpage';
import Watchhistory from './Pages/Watchhistory';
import Footer from './Components/Footer';
import Home from './Pages/Home';

function App() {
  return (
    <div className="App">
     <Header/>
     
     <Routes>
      <Route path='/' element={<Landingpage/>} />{/* localhost:3000 - Landing Page*/}
      <Route path='/home' element={<Home/>}/>{/* localhost:3000 - Home page*/}
      <Route path='/watch-history' element={<Watchhistory/>}/>
     </Routes>
     <Footer/>
    </div>
  );
}

export default App;
