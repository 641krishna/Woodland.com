import logo from './logo.svg';
import './App.css';
import Home from './Pages/HomePage'
import AllRoutes from './Routes/AllRoutes';
import TopNavbar from './Components/TopNavbar';
import MainNavbar from './Components/MainNavbar';
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <TopNavbar />
      <MainNavbar />
      <AllRoutes />
      <Footer/>
    </div>
  );
}

export default App;
