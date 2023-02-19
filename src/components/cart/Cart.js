import React, { useContext } from "react";
import classes from "./Cart.module.css";
import CartContext from "../store/Cart-Context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
const Cart = (props) => {
  const ctx = useContext(CartContext);
  const  wholeAmount = `$${ctx.totalAmount.toFixed(2)}`;


  const hasItem = ctx.items.length > 0;
  const cartItemAddHandler = (item)=>{
    ctx.addItem({...item,amount:1});
  }
  const cartItemRemoveHandler =(id)=>{
    ctx.removeItem(id);
  }
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((items) => (
        <CartItem
          key={items.id}
          name={items.name}
          price={items.price}
          amount={items.amount}
          onRemove = {cartItemRemoveHandler.bind(null, items.id)}
          onAdd = {cartItemAddHandler.bind(null,items)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClick={props.onClick}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{wholeAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClick}>
          Close
        </button>
        {hasItem && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
