import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="header-logo-image"
      />
      <ul className="list-items-container">
        <li>
          <Link to="/" className="list-item">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="list-item">
            Jobs
          </Link>
        </li>
      </ul>
      <button
        type="button"
        className="header-logout-button"
        onClick={onClickLogout}
      >
        Logout
      </button>
    </nav>
  )
}
export default Header
