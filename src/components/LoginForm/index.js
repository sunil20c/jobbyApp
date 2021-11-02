import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitCredentials = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error.msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordInput = () => {
    const {password} = this.state
    return (
      <div className="credentials-container">
        <label htmlFor="password" className="label-input">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="login-input"
          value={password}
          placeholder="Password"
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  renderUsernameInput = () => {
    const {username} = this.state
    return (
      <div className="credentials-container">
        <label htmlFor="username" className="label-input">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          value={username}
          className="login-input"
          placeholder="Username"
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <div className="login-form-main-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-image"
          />
          <form onSubmit={this.onSubmitCredentials}>
            {this.renderUsernameInput()}
            {this.renderPasswordInput()}

            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p>{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
