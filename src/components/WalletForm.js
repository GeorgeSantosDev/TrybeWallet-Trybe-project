import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCurrencies,
  addExpense,
  editExpenseHasFinished } from '../redux/actions/index';
import fetchConversion from '../fetchConversion';
import '../style/WalletForm.css';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleAddExpense = async (e) => {
    e.preventDefault();
    const { dispatch, expenses } = this.props;
    const currencies = await fetchConversion();
    dispatch(addExpense(
      { ...this.state, id: expenses.length, exchangeRates: currencies },
    ));
    this.setState({
      value: '',
      description: '',
    });
  };

  handleEdit = (e) => {
    e.preventDefault();
    const { dispatch, expenses, expenseIdToEdit } = this.props;
    const expenseEdited = expenses.map((expense) => {
      if (Number(expenseIdToEdit) === expense.id) {
        return {
          ...expense,
          ...this.state,
        };
      }
      return expense;
    });
    dispatch(editExpenseHasFinished(expenseEdited));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies, isEditing } = this.props;
    const { value,
      description,
      currency,
      method,
      tag } = this.state;

    const buttonAddExpense = (
      <button type="button" onClick={ this.handleAddExpense } className="btn btn-dark">
        Adicionar despesa
      </button>
    );

    const buttonEditExpense = (
      <button type="button" onClick={ this.handleEdit } className="btn btn-dark">
        Editar despesa
      </button>
    );

    return (
      <form className="entries-expense">
        <label htmlFor="value">
          <input
            type="text"
            name="value"
            id="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
            className="form-control value"
            placeholder="Valor"
          />
        </label>
        <input
          type="text"
          name="description"
          id="description"
          data-testid="description-input"
          value={ description }
          onChange={ this.handleChange }
          className="form-control description"
          placeholder="Descrição"
        />
        <select
          name="currency"
          id="currency"
          data-testid="currency-input"
          value={ currency }
          onChange={ this.handleChange }
          className="form-select currency"
        >
          {
            currencies
              .map((coinage, i) => (
                <option key={ i } value={ coinage }>
                  { coinage }
                </option>))
          }
        </select>
        <select
          name="method"
          id="method"
          data-testid="method-input"
          value={ method }
          onChange={ this.handleChange }
          className="form-select select-size"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          name="tag"
          id="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ this.handleChange }
          className="form-select select-size"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        {
          isEditing ? buttonEditExpense : buttonAddExpense
        }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  isEditing: state.wallet.isEditing,
  expenseIdToEdit: state.wallet.expenseIdToEdit,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  expenseIdToEdit: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
