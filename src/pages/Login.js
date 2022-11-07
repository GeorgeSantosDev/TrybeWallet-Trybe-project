import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUserEmail } from '../redux/actions';
import '../style/Login.css';

const MINIMUM_PASSWORD_LENGTH = 6;

class Login extends Component {
  state = {
    isDisabled: true,
    password: '',
    email: '',
  };

  verifyPassword = () => {
    const { password } = this.state;
    return password.length >= MINIMUM_PASSWORD_LENGTH;
  };

  verifyEmail = () => {
    const { email } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => {
      if (this.verifyEmail() && this.verifyPassword()) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(addUserEmail(email));
    history.push('/carteira');
  };

  render() {
    const { isDisabled, password, email } = this.state;
    return (
      <main className="main-container">
        <div className="title-container">
          <h1 className="title">TrybeWallet</h1>
          <i className="bi bi-wallet2" id="icon-wallet" />
        </div>
        <form className="form-container">
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              data-testid="email-input"
              onChange={ this.handleChange }
              value={ email }
              className="form-control"
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Senha"
              data-testid="password-input"
              onChange={ this.handleChange }
              value={ password }
              className="form-control"
            />
          </label>
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
            className="btn btn-light"
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
