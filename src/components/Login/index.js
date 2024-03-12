import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {
  AppContainer,
  FormContainer,
  LoginLogo,
  InputContainer,
  LoginButton,
  SubmitError,
  InputLabel,
  UserInput,
  CheckboxContainer,
  Checkbox,
  ShowPassword,
} from './styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    show: false,
    showError: false,
    errorMsg: '',
  }

  onSuccess = jwt => {
    const {history} = this.props
    Cookies.set('jwt_token', jwt, {expires: 30, path: '/'})
    history.replace('/')
  }

  onFailure = msg => {
    this.setState({errorMsg: msg, showError: true})
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const details = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  onShow = () => {
    this.setState(prev => ({show: !prev.show}))
  }

  onUser = event => {
    this.setState({username: event.target.value})
  }

  onPass = event => {
    this.setState({password: event.target.value})
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <>
        <InputLabel htmlFor="username">USERNAME - rahul</InputLabel>
        <UserInput
          type="text"
          id="username"
          value={username}
          name="username"
          onChange={this.onUser}
          placeholder="Username"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password, show} = this.state
    const inputType = show ? 'text' : 'password'
    return (
      <>
        <InputLabel htmlFor="password">PASSWORD - rahul@2021</InputLabel>
        <UserInput
          type={inputType}
          id="password"
          value={password}
          name="password"
          onChange={this.onPass}
          placeholder="Password"
        />
        <CheckboxContainer>
          <Checkbox type="checkbox" id="checkbox" onChange={this.onShow} />
          <ShowPassword htmlFor="checkbox">Show Password</ShowPassword>
        </CheckboxContainer>
      </>
    )
  }

  render() {
    const {errorMsg, showError} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <AppContainer>
        <FormContainer onSubmit={this.onLogin}>
          <LoginLogo
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
          <InputContainer>{this.renderUsername()}</InputContainer>
          <InputContainer>{this.renderPassword()}</InputContainer>
          <LoginButton type="submit">Login</LoginButton>
          {showError && <SubmitError>*{errorMsg}</SubmitError>}
        </FormContainer>
      </AppContainer>
    )
  }
}

export default Login
