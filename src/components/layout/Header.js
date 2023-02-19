import React,{Fragment} from 'react'
import HeaderImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
const Header = (props) => {
  return (
   <Fragment>
    <header className = {classes.header}>
      <h1>ReactMeal</h1>
      <HeaderCartButton onClick = {props.click}/>
      </header>
      <div className={classes['main-image']}><img src = {HeaderImage} alt = "A table of Full Delecious Food"/></div>
      </Fragment>
  )
}

export default Header;
