import { BrowserRouter as Link } from "react-router-dom";
function Header() {
    return (
        <header class="mb-auto">
                <h3 class="float-md-start mb-0">RE/NOTE</h3>
                <nav class="nav nav-masthead justify-content-center float-md-end">
                  <a class="nav-link active" aria-current="page" href="index.html">Home</a>
                  <a class="nav-link" href="about.html">About</a>
                  <a class="nav-link" href="contact.html">Contact</a>
                  <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
                </nav>
                
        </header>
    );
  }
  export default Header;
  