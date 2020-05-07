import database from "../firebase/firebase";

// ADD_EXPENSE
export const addExpense = (expense = {}) => ({
  type: "ADD_EXPENSE",
  expense
});

export const startAddExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0
} = {}) => {
  return (dispatch, getState) => {
    const expense = { description, note, amount, createdAt };
    database
      .ref(`users/${getState().auth.uid}/expenses`)
      .push(expense)
      .then(ref => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense
          })
        );
      });
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    return database
      .ref(`users/${getState().auth.uid}/expenses/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editExpense(id, updates));
      });
  };
};

// REMOVE_EXPENSE
export const removeExpense = id => ({
  type: "REMOVE_EXPENSE",
  id
});

export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch, getState) => {
    return database
      .ref(`users/${getState().auth.uid}/expenses/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense(id));
      });
  };
};

// SET_EXPENSES
export const setExpenses = (expenses = []) => ({
  type: "SET_EXPENSES",
  expenses
});

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    return database
      .ref(`users/${getState().auth.uid}/expenses`)
      .once("value")
      .then(snapshot => {
        const expenses = [];

        snapshot.forEach(childSnapshot => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setExpenses(expenses));
      });
  };
};
