
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import LoginPage from './LoginPage';
import Login from './Components/LoginPage/Login';
import About from './Components/About/About';
import Home from './Components/Home/Home';
import Menu from './Components/Menu/Menu';
import Contact from './Components/Contact/Contact';
function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Login />}>
        </Route>
        <Route path="/home" element={<Home />}>
        </Route>
        <Route path="/about" element={<About />}>
        </Route>
        <Route path="/login" element={<Login />}>
        </Route>

        <Route path="/menu" element={<Menu />}>
        </Route>

        <Route path="/contact" element={<Contact />}>
        </Route>
        </Routes>
    </Router>
  </div>

    // <div>
    
    //   <LoginPage />
    // </div>
    
  );
}

export default App;
