import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/Header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalExpenses = expenses.length === 0 ? 0
      : expenses.reduce((acc, expense) => {
        const sum = acc
        + (Number(expense.value) * Number(expense.exchangeRates[expense.currency].ask));
        return sum;
      }, 0);
    return (
      <header>
        <i className="bi bi-coin" id="coin-icon" />
        <div className="finance-info-container">
          <h3 data-testid="email-field">{ `Email: ${email}` }</h3>
          <h3 data-testid="total-field">
            { `Despesas totais: ${totalExpenses.toFixed(2)} BRL` }
          </h3>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps)(Header);
