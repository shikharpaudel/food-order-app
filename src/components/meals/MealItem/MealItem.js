import React,{useContext} from 'react'
import classes from './MealItem.module.css';
import CardContext from '../../store/Cart-Context';
import MealItemForm from './MealItemForm';
const MealItem = (props) => {
  const cardCtx = useContext(CardContext);
    const price = `$${props.price.toFixed(2)}`;
    const handleMealAdd =(amount)=>{
cardCtx.addItem({
  id:props.id,
  name:props.name,
  amount:amount,
price:props.price
});
    };
  return (
    <li  className={classes.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
        
        <div className={classes.price}>{price}</div>
        
        </div>
        <MealItemForm onAddCart = {handleMealAdd}/>
    </li>
  )
}

export default MealItem;
