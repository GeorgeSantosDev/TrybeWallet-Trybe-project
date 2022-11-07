import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../redux/actions';
import '../style/Table.css';

const AJUST_VALUE = 10;

class Table extends Component {
  handleDelete = (e) => {
    e.preventDefault();
    const { dispatch, expenses } = this.props;
    const expenseDeleted = expenses.filter((expense) => (
      Number(e.target.id) !== expense.id));
    const newExpenses = expenseDeleted.map((expense, i) => {
      expense.id = i;
      return expense;
    });
    dispatch(deleteExpense(newExpenses));
  };

  handleEdit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(editExpense(e.target.id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table className="table table-light table-hover">
        <thead>
          <tr>
            <th className="table-danger">Descrição</th>
            <th className="table-danger">Tag</th>
            <th className="table-danger">Método de pagamento</th>
            <th className="table-danger">Valor</th>
            <th className="table-danger">Moeda</th>
            <th className="table-danger">Câmbio utilizado</th>
            <th className="table-danger">Valor convertido</th>
            <th className="table-danger">Moeda de conversão</th>
            <th className="table-danger">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => (
            <tr key={ expense.description }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ ((expense.value * AJUST_VALUE) / AJUST_VALUE).toFixed(2) }</td>
              <td>{ expense.exchangeRates[expense.currency].name }</td>
              <td>
                { ((expense.exchangeRates[expense.currency]
                  .ask * AJUST_VALUE) / AJUST_VALUE).toFixed(2)}
              </td>
              <td>
                {
                  (Number(expense.value) * Number(expense.exchangeRates[expense.currency]
                    .ask)).toFixed(2)
                }
              </td>
              <td>Real brasileiro</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ this.handleDelete }
                  id={ expense.id }
                  className="btn btn-danger btn-sm"
                >
                  Excluir
                </button>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ this.handleEdit }
                  id={ expense.id }
                  className="btn btn-dark btn-sm"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
