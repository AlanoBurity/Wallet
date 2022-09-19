import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setEmail as sendEmailAction } from '../redux/actions';
import '../style/Login.css';
import logo from '../images/logo-wallet.png';

const minPassword = 6;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  checkPassword = (password) => password.length >= minPassword;

  checkEmail = (email) => {
    const regExp = /\S+@\S+\.\S+/;
    return regExp.test(email);
  }

  loginEnabled = () => {
    const { email, password } = this.state;
    return this.checkEmail(email) && this.checkPassword(password);
  }

  render() {
    const { email, password } = this.state;
    const { history, setEmail } = this.props;
    return (
      <div className="corpo">
        <form id="loginBox" className="loginBox">
          <img src={ logo } alt="logo-wallet" className="logo" />
          <div>
            <h1 className="title">Wallet</h1>
            <label htmlFor="email">
              <input
                className="inputs"
                type="text"
                name="email"
                placeholder="E-mail"
                data-testid="email-input"
                onChange={ this.handleChange }
                value={ email }

              />
            </label>
            <label htmlFor="password">
              <input
                className="inputs"
                type="password"
                name="password"
                placeholder="Senha"
                data-testid="password-input"
                value={ password }
                onChange={ this.handleChange }
              />
            </label>
            <button
              className="entrar-bttn"
              type="submit"
              disabled={ !this.loginEnabled() }
              onClick={ () => {
                setEmail(email);
                history.push('/carteira');
              } }
            >
              Entrar

            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  setEmail: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(sendEmailAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
