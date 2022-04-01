import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home';
import { Provider } from 'react-redux'
import store from './store';
import CreatedViedeoGames from './components/CreateVideoGames';
import Details from './components/Details'

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <Provider store={store}>
        <Routes>
          <Route exact path='/' element={<LandingPage/>} />
          <Route exact path='/home' element={<Home/>} />
          <Route exact path='/videogames' element={<CreatedViedeoGames/>}/>
          <Route path='/videogames/:id' element={<Details />}/>
        </Routes>
        </Provider>
      </div>
    </BrowserRouter>
    
    
  );
}

export default App;
