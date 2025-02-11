import "./App.css"
import NavBar from "./components/NavBar/NavBar"
import Footer from "./components/Footer/Footer"
import Home from "./pages/home";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
   
function App(){
    return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/menu" exact element={<Menu />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/contact" exact element={<Contact/>} />
          <Route path="/login" exact element={<Login />} /> 
        </Routes>
        <Footer/>
      </Router>
    </div>
    )
}

export default App;