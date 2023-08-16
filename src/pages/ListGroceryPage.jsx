import { useEffect, useReducer, useState } from "react";
import ImageDelete from "../Assets/delete.png";
import ImageEdit from "../Assets/edit.png";
import ImageDone from "../Assets/done.png";

const ListGroceryPage = () => {
  const [listHeader, setListHeader] = useState(false);
  const [editId, setEditId] = useState(null);
  const [errorList, setErrorList] = useState({
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
    EDIT_TODO: "update_todo",
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
                  quantity: form.quantity,
                }
              : todo
          );
          return updateTodo;
        } else if (form.product && form.quantity) {
          return [
            ...todos,
            {
              id: Date.now(),
              product: action.payload.product,
              quantity: action.payload.quantity,
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
          quantity: edit.quantity,
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

  useEffect(() => {
    if (Object.keys(todos).length > 0) {
      setListHeader(true);
    } else {
      setListHeader(false);
    }
  }, [todos]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorList({
      ...errorList,
      errorGeneral: !form.product && !form.quantity,
    });
    setForm({
      ...form,
      product: "",
      price: "",
      quantity: "",
      total: 0,
    });
  };

  return (
    <div className="budget-grocery-main-container">
      <h1 className="list-header">List Grocery</h1>

      <form className="list-form" onSubmit={handleSubmit}>
        <div className="form-list-product">
          <label htmlFor="product">Product:</label>
          <input
            type="text"
            placeholder="Enter product"
            id="product"
            onChange={handleChange}
            value={form.product}
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
        </div>
        <input
          className="btn-add-product budgetFont"
          type="submit"
          value={
            editId && form.product && form.quantity
              ? "Edit Grocery"
              : "Add Grocery"
          }
          onClick={() => {
            dispatch({
              type: ACTIONS.ADD_TODO,
              payload: {
                product: form.product,
                quantity: form.quantity,
              },
            });
          }}
        />

        {errorList.errorGeneral && (
          <p className="error-message">Please input a valid grocery.</p>
        )}

        <div className="line"></div>
      </form>

      {/* LIST OF ADDED GROCERY */}
      {listHeader ? (
        <div className="list-headers">
          <h4>Product</h4>
          <h4>Quantity</h4>
        </div>
      ) : null}

      <ul className="all-list">
        {todos.map((todo) => {
          return (
            <li key={todo.id} className="grocery-list">
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
                {todo.quantity}
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
                        quantity: todo.quantity,
                      },
                    });
                  }}
                >
                  <img
                    src={ImageEdit}
                    alt="edit"
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

export default ListGroceryPage;
