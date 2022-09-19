import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../style/Wallet.css';
import moeda from '../images/moeda.svg';
import user from '../images/User.svg';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div className="header">
        <p className="wallet">Wallet</p>
        <p data-testid="total-field" className="expenses-header">
          <img src={ moeda } alt="moeda" className="expenses-total" />
          Total de despesas:
          {' '}
          {
            expenses.value === 0 ? 0.00 : expenses.reduce((acc, cur) => {
              parseFloat(acc += (cur.exchangeRates[cur.currency].ask * cur.value));
              return acc;
            }, 0).toFixed(2)
          }

        </p>
        <div className="email-info">
          <img src={ user } alt="User" className="user-icons" />
          <p data-testid="email-field" className="email-login">{email}</p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape({
    reduce: PropTypes.func,
    value: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (store) => ({
  email: store.user.email,
  expenses: store.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
