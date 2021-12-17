import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <ul className="list-items-container">
        <li>
          <Link to="/" className="website-logo-image">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="header-logo-image"
            />
          </Link>
        </li>
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
export default withRouter(Header)
