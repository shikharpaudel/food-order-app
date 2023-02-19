import React, { useContext,useEffect,useState } from "react";
import CartIcon from "../cart/Carticon";
import CartContext from "../store/Cart-Context";

import classes from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
  const[btnIsHighlighted,setBtnIsHighlighted]=useState(false);
  const cartCtx = useContext(CartContext);
  const{items} = cartCtx;
  const classess = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;
  const numberOfCartItems = cartCtx.items.reduce((curNum, item) => {
    return curNum + item.amount;
  }, 0);
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={classess} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
