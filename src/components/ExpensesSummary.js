import React from "react";
import { connect } from "react-redux";
import selectExpensesVisible from "../selectors/expenses-visible";
import selectExpensesTotal from "../selectors/expenses-total";
import numeral from "numeral";
import { Link } from "react-router-dom";

const ExpensesSummary = ({ expenseCount, expensesTotal, hiddenExpenses }) => {
  const expenseWord = expenseCount === 1 ? "expense" : "expenses";
  const hiddenWord = hiddenExpenses === 1 ? "expense" : "expenses";
  const formattedExpenseTotal = numeral(expensesTotal / 100).format(" $0,0.00");
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{expenseCount}</span> {expenseWord} totalling
          <span>{formattedExpenseTotal}</span>
        </h1>
        {hiddenExpenses !== 0 && (
          <p className="page-header__subtitle">
            {hiddenExpenses} {hiddenWord} hidden
          </p>
        )}
        <div className="page-header__actions">
          <Link className="button" to="/create">
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const visibleExpenses = selectExpensesVisible(state.expenses, state.filters);
  const expenseCount = visibleExpenses.length;
  const expensesTotal = selectExpensesTotal(visibleExpenses);
  const hiddenExpenses = state.expenses.length - expenseCount;
  return {
    expenseCount,
    expensesTotal,
    hiddenExpenses
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
