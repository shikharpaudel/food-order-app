import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import CartContext from "../store/Cart-Context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [orderForm, setOrderForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false)
  const handleOrder = () => {
    setOrderForm(true);
  }
  const ctx = useContext(CartContext);
  const wholeAmount = `$${ctx.totalAmount.toFixed(2)}`;


  const hasItem = ctx.items.length > 0;
  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  }
  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  }
  const submitOrder = (userData) => {
    setIsSubmitting(true);
    fetch('https://food-order-site-ea897-default-rtdb.firebaseio.com//orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: ctx.items
      }),

    })
    setIsSubmitting(false);
    setDidSubmit(true);
    ctx.clearCart();
  }

  const isSumbmittingModelContext = <React.Fragment><p>Submitting Your Order..</p></React.Fragment>
  const didSumbmittingModelContext = <React.Fragment><p>Successfully Placed Order.</p>
  <div className={classes.actions}>
  <button className={classes.button} onClick={props.onClick}>
    Close
  </button>
  </div>
  </React.Fragment>
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((items) => (
        <CartItem
          key={items.id}
          name={items.name}
          price={items.price}
          amount={items.amount}
          onRemove={cartItemRemoveHandler.bind(null, items.id)}
          onAdd={cartItemAddHandler.bind(null, items)}
        />
      ))}
    </ul>
  );
  const cartModelContext = <React.Fragment>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{wholeAmount}</span>
    </div>
    {orderForm && <Checkout onConfirm={submitOrder} onCancel={props.onClick} />}
    {!orderForm && <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClick}>
        Close
      </button>
      {hasItem && <button className={classes.button} onClick={handleOrder}>Order</button>}
    </div>}
  </React.Fragment>
  return (
    <Modal onClick={props.onClick}>
      {!isSubmitting && !didSubmit && cartModelContext}
      {isSubmitting && isSumbmittingModelContext}
      {didSubmit && didSumbmittingModelContext}

    </Modal>
  );
};

export default Cart;
