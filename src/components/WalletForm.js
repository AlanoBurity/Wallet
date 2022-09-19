import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, fetchExpense } from '../redux/actions';
import '../style/Wallet.css';

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
        <form className="form">
          <label htmlFor="category-expense" className="contas">
            Descrição da despesa
            <input
              className="expense"
              name="description"
              type="text"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleFormInput }
            />
          </label>
          <label htmlFor="tag" className="contas">
            Categoria de despesas
            <select
              className="tag"
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
          </label>

          <label htmlFor="input-expenses" className="contas">
            Valor
            <input
              className="value"
              name="value"
              type="number"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleFormInput }
              step=",01"
            />
          </label>
          <label htmlFor="currency" className="contas">
            Moeda
            <select
              className="tag"
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
          </label>
          <label htmlFor="method" className="contas">
            Método de pagamento
            <select
              className="tag"
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleFormInput }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

        </form>
        <div className="bttn-expenses">
          <button
            className="botao"
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
