import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setEmail as sendEmailAction } from '../redux/actions';
import '../style/login.css';

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
      <form id="loginBox">
        <div>Login</div>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            name="email"
            placeholder="seumail@exemplo.com"
            data-testid="email-input"
            onChange={ this.handleChange }
            value={ email }

          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          disabled={ !this.loginEnabled() }
          onClick={ () => {
            setEmail(email);
            history.push('/carteira');
          } }
        >
          Entrar

        </button>
      </form>
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
