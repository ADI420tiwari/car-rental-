import { Link, useLocation } from 'react-router-dom'
import '../styles/Navbar.css'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Browse Cars', path: '/cars' }
]

function Navbar() {
  const location = useLocation()

  const isLinkActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" aria-label="Aditya Rental homepage">
          <span className="logo-mark">AR</span>
          <div className="logo-copy">
            <span className="logo-text">Aditya Rental</span>
            <span className="logo-tagline">Drive premium, pay less</span>
          </div>
        </Link>

        <div className="nav-links">
          <ul className="nav-menu">
            {navLinks.map(({ label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`nav-link ${isLinkActive(path) ? 'active' : ''}`}
                  aria-current={isLinkActive(path) ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/cars" className="nav-cta">
            Reserve now
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

