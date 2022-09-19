import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions';
import '../style/Wallet.css';

class Table extends Component {
  handleDeleteExpense(id) {
    const { deleteExpense: tableId, expenses } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    tableId(newExpenses);
  }

  render() {
    const { expenses } = this.props;
    return (
      <div className="tabela">
        <table className="body-table">
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
                    <td>
                      {e.description}
                    </td>
                    <td>
                      {e.tag}
                    </td>
                    <td>
                      {e.method}
                    </td>
                    <td>
                      {parseFloat(e.value).toFixed(2)}
                    </td>
                    <td>
                      {e.exchangeRates[e.currency].name}
                    </td>
                    <td>
                      {parseFloat(e.exchangeRates[e.currency].ask).toFixed(2)}
                    </td>
                    <td>
                      {
                        parseFloat(e.exchangeRates[e.currency].ask * e.value).toFixed(2)
                      }

                    </td>
                    <td>Real</td>
                    <td>
                      <button type="button">
                        Editar
                      </button>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => this.handleDeleteExpense(e.id) }
                      >
                        Excluir

                      </button>
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
  deleteExpense: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    filter: PropTypes.func,
    map: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (state) => dispatch(deleteExpense(state)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
