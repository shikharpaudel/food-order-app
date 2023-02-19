import React,{useRef,useState} from 'react';
import classes from './MealItemForm.module.css';
import InputModel from '../../UI/InputModel';

const MealItemForm = (props) => {
  const [amountIsValid,setAmountIsValid] = useState(true);
  const totalAmountRef = useRef();
  const handleSubmit = (event)=>{
    event.preventDefault();
    const enteredAmount = totalAmountRef.current.value;
    const totalEnteredAmount = +enteredAmount;
    if(enteredAmount.trim().length === 0 || totalEnteredAmount < 1 || totalEnteredAmount >5){
      setAmountIsValid(false);
      return ;
    }
    props.onAddCart(totalEnteredAmount);
  };
  return (
    <div className={classes.form}>
   <form onSubmit={handleSubmit}>
 <InputModel 
 ref = {totalAmountRef}
 label = 'Amount'
  input  = {{
    id:'amount_' + props.id,
  type:'number',
  max:5,
  min:1,
  step:1,
  defaultValue:1


 }}/>
    <button>+ Add</button>
    {!amountIsValid && <p>please enter a valid amount(1-5).</p>}
   </form>
   </div>
  )
}

export default MealItemForm
