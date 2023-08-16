import { useEffect, useReducer, useState } from "react";
import ImageDelete from "../Assets/delete.png";
import ImageEdit from "../Assets/edit.png";
import ImageDone from "../Assets/done.png";

const BudgetGroceryPage = () => {
  const [exceedError, setExceedError] = useState(false);
  const [totalBudget, setTotalBudget] = useState(0);
  const [budget, setBudget] = useState(null);
  const [editId, setEditId] = useState(null);
  const [listHeader, setListHeader] = useState(false);
  const [errorBudget, setErrorBudget] = useState({
    errorGeneral: false,
  });
  const [form, setForm] = useState({
    product: "",
    price: "",
    quantity: "",
    total: 0,
  });

  const ACTIONS = {
    ADD_TODO: "add_todo",
    COMPLETE_TODO: "complete_todo",
    DELETE_TODO: "delete_todo",
    EDIT_TODO: "edit_todo",
  };

  const initialState = [];

  const reducer = (todos, action) => {
    switch (action.type) {
      case ACTIONS.ADD_TODO:
        if (editId) {
          setEditId(0);
          const editTodo = todos.find((todo) => todo.id === editId);
          const updateTodo = todos.map((todo) =>
            todo.id === editTodo.id
              ? {
                  ...todo,
                  product: form.product,
                  price: form.price,
                  quantity: form.quantity,
                  total: form.price * form.quantity,
                }
              : todo
          );
          return updateTodo;
        } else if (form.product && form.price && form.quantity) {
          return [
            ...todos,
            {
              id: Date.now(),
              product: action.payload.product,
              price: action.payload.price,
              quantity: action.payload.quantity,
              total: action.payload.price * action.payload.quantity,
              complete: false,
            },
          ];
        }

      case ACTIONS.COMPLETE_TODO:
        return todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, complete: !todo.complete };
          }
          return todo;
        });
      case ACTIONS.DELETE_TODO:
        return todos.filter((todo) => todo.id !== action.payload.id);
      case ACTIONS.EDIT_TODO:
        const edit = todos.find((todo) => todo.id === action.payload.id);
        setForm({
          ...form,
          product: edit.product,
          price: edit.price,
          quantity: edit.quantity,
          total: edit.total,
        });
        setEditId(action.payload.id);
      default:
        return todos;
    }
  };

  const [todos, dispatch] = useReducer(reducer, initialState);

  const handleChange = (event) => {
    switch (event.target.id) {
      case "product":
        return setForm({ ...form, product: event.target.value });
      case "price":
        return setForm({ ...form, price: event.target.value });
      case "quantity":
        return setForm({ ...form, quantity: event.target.value });
      case "total":
        return setForm({ ...form, total: event.target.value });
      default:
        return form;
    }
  };

  const totalAmount = todos.reduce((acc, value) => {
    return acc + value.total;
  }, 0);

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrorBudget({
      ...errorBudget,
      errorGeneral: !form.product && !form.price && !form.quantity,
    });

    setForm({
      ...form,
      product: "",
      price: "",
      quantity: "",
      total: 0,
    });
  };

  useEffect(() => {
    handleError();
    if (Object.keys(todos).length > 0) {
      setListHeader(true);
    } else {
      setListHeader(false);
    }
  }, [totalAmount, todos]);

  const handleError = () => {
    if (totalAmount > totalBudget) {
      setExceedError(true);
    } else if (totalAmount === totalBudget) {
      setExceedError(false);
    } else {
      setExceedError(false);
    }
  };

  const handleBudget = () => {
    if (budget > 0) {
      setTotalBudget(budget);
      setBudget("");
    } else {
      alert("Add budget a valid budget");
      setBudget("");
    }
  };

  return (
    <div className="budget-grocery-main-container">
      <h1 className="budget-header">Budget Grocery</h1>
      <div className="form-add-budget">
        <input
          type="text"
          placeholder="Enter your budget"
          id="budget"
          value={budget}
          onChange={(event) => {
            setBudget(event.target.value);
          }}
          className="budget-input budgetFont"
        />
        <button onClick={handleBudget} className="btn-add-budget budgetFont">
          {totalBudget ? "Update" : "Budget"}
        </button>
      </div>

      <form className="budget-form" onSubmit={handleSubmit}>
        <div className="line"></div>

        <div className="form-add-product">
          <label htmlFor="product">Product:</label>
          <input
            type="text"
            placeholder="Enter product"
            id="product"
            onChange={handleChange}
            value={form.product}
            className="budget-input budgetFont"
          />

          <label htmlFor="price">Price:</label>
          <input
            type="text"
            placeholder="Enter price"
            id="price"
            onChange={handleChange}
            value={form.price}
            className="budget-input budgetFont"
          />

          <select className="budgetFont">
            <option>Quantity:</option>
            <option>Kilo:</option>
            <option>Meter:</option>
          </select>
          <input
            type="text"
            placeholder="Enter a number"
            id="quantity"
            onChange={handleChange}
            value={form.quantity}
            className="budget-input budgetFont"
          />

          <label htmlFor="total">Total:</label>
          <label
            className="budget-total"
            id="total"
            value={form.price * form.quantity}
          >
            {form.price * form.quantity}
          </label>
        </div>

        {errorBudget.errorGeneral && (
          <p className="error-message">Please input a valid grocery.</p>
        )}

        <input
          className="btn-add-product budgetFont"
          type="submit"
          value={
            editId && form.product && form.price && form.quantity && form.total
              ? "Edit Grocery"
              : "Add Grocery"
          }
          onClick={() => {
            dispatch({
              type: ACTIONS.ADD_TODO,
              payload: {
                product: form.product,
                price: form.price,
                quantity: form.quantity,
                total: form.total,
              },
            });
          }}
        />

        <div className="line"></div>
      </form>

      <div className="budget-total-amount">
        <h2>Budget: {totalBudget}</h2>
        <h2>Total: {totalAmount}</h2>
        {exceedError ? (
          <p className="exceedError">
            Total exceeds the budget with {totalAmount - totalBudget} pesos
          </p>
        ) : null}
      </div>

      {/* LIST OF ADDED GROCERY */}
      {listHeader ? (
        <div className="budget-headers">
          <h4>Product</h4>
          <h4>Price</h4>
          <h4>Quantity</h4>
          <h4>Total</h4>
        </div>
      ) : null}

      <ul className="all-list">
        {todos.map((todo) => {
          return (
            <li key={todo.id} className="budget-list">
              <p
                style={{
                  color: todo.complete ? "#FF8A8A" : "#FFF",
                  textDecoration: todo.complete ? "line-through" : "none",
                }}
              >
                {todo.product}
              </p>
              <p
                style={{
                  color: todo.complete ? "#FF8A8A" : "#FFF",
                  textDecoration: todo.complete ? "line-through" : "none",
                }}
              >
                {todo.price}
              </p>
              <p
                style={{
                  color: todo.complete ? "#FF8A8A" : "#FFF",
                  textDecoration: todo.complete ? "line-through" : "none",
                }}
              >
                {todo.quantity}
              </p>
              <p
                style={{
                  color: todo.complete ? "#FF8A8A" : "#FFF",
                  textDecoration: todo.complete ? "line-through" : "none",
                }}
              >
                {todo.total}
              </p>
              <div className="btn-budget-container">
                <button
                  className="btn-done"
                  onClick={() => {
                    dispatch({
                      type: ACTIONS.COMPLETE_TODO,
                      payload: { id: todo.id },
                    });
                  }}
                >
                  <img
                    src={ImageDone}
                    alt="done"
                    style={{ width: "20px", height: "20px" }}
                  />
                </button>

                <button
                  className="btn-edit"
                  onClick={() => {
                    dispatch({
                      type: ACTIONS.EDIT_TODO,
                      payload: {
                        id: todo.id,
                        product: todo.product,
                        price: todo.price,
                        quantity: todo.quantity,
                        total: todo.total,
                      },
                    });
                  }}
                >
                  <img
                    src={ImageEdit}
                    alt="delete"
                    style={{ width: "20px", height: "20px" }}
                  />
                </button>

                <button
                  className="btn-delete"
                  onClick={() => {
                    dispatch({
                      type: ACTIONS.DELETE_TODO,
                      payload: { id: todo.id },
                    });
                  }}
                >
                  <img
                    src={ImageDelete}
                    alt="delete"
                    style={{ width: "20px", height: "20px" }}
                  />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BudgetGroceryPage;
