import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class SignIn extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      loading: false,
      loadingText: 'Loading...',
      animation: null
    }
    
  }

  componentWillMount () {
    document.getElementById('body').className = 'bg-gradient-primary'
    if (window.localStorage.getItem('authorized') == "true") {
      this.props.history.push('/dashboard')
    }
  }

  handleSignIn = () => {
    this.props.history.push('/dashboard')
  }

  handleInputChange = (input, event) => {
    switch (input) {
      case 'username':
        this.setState({ username: event.target.value })
        break
      case 'password':
        this.setState({ password: event.target.value })
        break
    }
  }

  handleLoadingTextAnimation = () => {
    let interval = setInterval(() => {
      if (this.state.loadingText == 'Loading.')
        this.setState({ loading: true, loadingText: 'Loading...' })
      else if (this.state.loadingText == 'Loading..')
        this.setState({ loading: true, loadingText: 'Loading...' })
      else if (this.state.loadingText == 'Loading...')
        this.setState({ loading: true, loadingText: 'Loading.' })
    }, 500)
    this.setState({ animation: interval })
  }

  sendLoginRequest = async () => {
    fetch(
      `http://18.217.196.171:7070/users/login?username=${this.state.username}&password=${this.state.password}`
    )
      .then(res => {
        return res.json()
      })
      .then(response => {
        if (response.status == 200) {
          window.localStorage.setItem('authorized', true)
          window.localStorage.setItem('outlet', response.data.outlet)
          window.localStorage.setItem('tableName', response.data.tableName)
          window.localStorage.setItem('username', response.data.username)
          this.props.history.push('/dashboard')
        } else {
          clearInterval(this.state.animation)
          this.setState({ loading: false })
          window.alert('Username/password is wrong')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleSubmit = async () => {
    if (
      this.state.username &&
      this.state.username.length > 0 &&
      this.state.password &&
      this.state.password.length > 0
    ) {
      await this.handleLoadingTextAnimation()
      await this.sendLoginRequest()
    } else {
      window.alert('Please enter your username and password')
    }
  }

  render () {
    return (
      <div className='container'>
        <br />
        <br />
        <br />
        {/* <!-- Outer Row --> */}
        <div className='row justify-content-center'>
          <div className='col-xl-10 col-lg-12 col-md-9'>
            <div className='card o-hidden border-0 shadow-lg my-5'>
              <div className='card-body p-0'>
                {/* <!-- Nested Row within Card Body --> */}
                <div className='row'>
                  <div className='col-lg-6 d-none d-lg-block bg-login-image'></div>
                  <div className='col-lg-6'>
                    <div className='p-5'>
                      <div className='text-center'>
                        <h1 className='h4 text-gray-900 mb-4'>Welcome Back!</h1>
                      </div>
                      <form onSubmit={this.handleSignIn} className='user'>
                        <div className='form-group'>
                          <input
                            onChange={e =>
                              this.handleInputChange('username', e)
                            }
                            type='email'
                            className='form-control form-control-user'
                            id='exampleInputEmail'
                            aria-describedby='emailHelp'
                            placeholder='Enter Username...'
                            value={this.state.username}
                          />
                        </div>
                        <div className='form-group'>
                          <input
                            onChange={e =>
                              this.handleInputChange('password', e)
                            }
                            type='password'
                            className='form-control form-control-user'
                            id='exampleInputPassword'
                            placeholder='Password'
                            value={this.state.password}
                          />
                        </div>
                        <div className='form-group'>
                          <div className='custom-control custom-checkbox small'>
                            <input
                              type='checkbox'
                              className='custom-control-input'
                              id='customCheck'
                            />
                            <label
                              className='custom-control-label'
                              for='customCheck'
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                        {this.state.loading == false ? (
                          <input
                            onClick={this.handleSubmit}
                            className='btn btn-primary btn-user btn-block'
                            value='Login'
                          />
                        ) : (
                          <input
                            disabled
                            className='btn btn-primary btn-user btn-block'
                            value={this.state.loadingText}
                          />
                        )}

                        {/*<hr />
                         <a
                          href='index.html'
                          className='btn btn-google btn-user btn-block'
                        >
                          <i className='fab fa-google fa-fw'></i> Login with
                          Google
                        </a>
                        <a
                          href='index.html'
                          className='btn btn-facebook btn-user btn-block'
                        >
                          <i className='fab fa-facebook-f fa-fw'></i> Login with
                          Facebook
                        </a> */}
                      </form>
                      {/* <hr /> */}
                      {/* <div className='text-center'>
                        <a className='small' href='forgot-password.html'>
                          Forgot Password?
                        </a>
                      </div> */}
                      {/* <div className='text-center'>
                        <Link className='small' to='/signup'>
                          Create an Account!
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SignIn)
