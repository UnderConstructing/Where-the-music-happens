import { BrowserRouter as Router, Link } from "react-router-dom";
function Header() {
    return (
        <header class="mb-auto">
                <h3 class="float-md-start mb-0">RE/NOTE</h3>
                <Router class="links nav nav-masthead justify-content-center float-md-end" >
                <Link to="/">Home</Link>
              
                <Link to="/about">About</Link>
              
                <Link to="/dashboard">Dashboard</Link>
              
                <Link to="/contact">Contact</Link>
                </Router>
                
        </header>
    );
  }
  export default Header;
  