import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, fetchExpense } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      tag: 'Alimentação',
      method: 'Dinheiro',
      currency: 'USD',
    };
  }

  componentDidMount() {
    const { fetchAPI: fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleFormInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { currencies, expenses } = this.props;
    const { value, description, tag, method, currency } = this.state;
    return (
      <div>
        <form>
          <input
            name="value"
            type="number"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleFormInput }
            step=",01"
          />
          <input
            name="description"
            type="text"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleFormInput }
          />

          <select
            data-testid="currency-input"
            id="currency-input"
            name="currency"
            onChange={ this.handleFormInput }
            value={ currency }
          >
            {currencies.map((values, key) => (
              <option key={ key }>
                {values}
              </option>
            ))}
          </select>

          <select
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleFormInput }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <select
            name="tag"
            value={ tag }
            data-testid="tag-input"
            onChange={ this.handleFormInput }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </form>
        <button
          type="button"
          onClick={ () => {
            expenses(this.state);
            this.setState((prev) => ({
              id: prev.id + 1,
              value: '',
              description: '',
              tag: 'Lazer',
              method: 'Dinheiro',
              currency: 'USD',
            }));
          } }
        >
          Adicionar despesa

        </button>

      </div>
    );
  }
}
WalletForm.propTypes = {
  currencies: PropTypes.shape({
    filter: PropTypes.func,
  }),
  fetch: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchAPI()),
  expenses: (state) => dispatch(fetchExpense(state)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  dataCoin: state.wallet.dataCoin,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
