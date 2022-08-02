import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses
                .map((e) => (
                  <tr key={ e.id }>
                    <td>{e.description}</td>
                    <td>{e.tag}</td>
                    <td>{e.method}</td>
                    <td>{parseFloat(e.value).toFixed(2)}</td>
                    <td>{e.exchangeRates[e.currency].name}</td>
                    <td>{parseFloat(e.exchangeRates[e.currency].ask).toFixed(2)}</td>
                    <td>
                      {
                        parseFloat(e.exchangeRates[e.currency].ask * e.value).toFixed(2)
                      }

                    </td>
                    <td>Real</td>
                    <td>
                      <button type="button">Editar</button>
                      <button type="button">Excluir</button>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf({
    map: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
