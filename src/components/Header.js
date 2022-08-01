import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="header-currency-field">BRL</p>
        <p data-testid="total-field">
          {
            expenses.value === 0 ? 0.00 : expenses.reduce((acc, cur) => {
              parseFloat(acc += (cur.exchangeRates[cur.currency].ask * cur.value));
              return acc;
            }, 0).toFixed(2)
          }

        </p>
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
