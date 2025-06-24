import logo from './logo.svg';
import './App.css';
import Main from './main';
import Login from "./components/login";
import Register from "./components/register";
import { BrowserRouter, Route,Routes} from "react-router-dom";
import Home from './components/fitness';
import Track from './components/track';
import DailyDetails from './components/details';
import CalorieCalculator from './components/calorie';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
            <Main />
            <Routes>
                <Route path="/Home" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Track" element={<Track />} />
                <Route path="/DailyDetails" element={<DailyDetails />} />
                <Route path="/CalorieCaluclator" element={<CalorieCalculator />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
