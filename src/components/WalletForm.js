import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAPI } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
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
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <input
            type="number"
            name="value"
            data-testid="value-input"
            onChange={ this.handleFormInput }

          />
          <input
            type="text"
            name="description"
            data-testid="description-input"
            onChange={ this.handleFormInput }
          />

          <select data-testid="currency-input" id="currency-input">
            {currencies.map((value, key) => (
              <option key={ key }>
                {value}
              </option>
            ))}
          </select>

          <select
            name="currency"
            data-testid="method-input"
            onChange={ this.handleFormInput }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <select
            name="tag"
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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchAPI()),
});
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});
WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchAPI: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
