import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from '../meals/AvaiableMeals.module.css';
import { useEffect,useState} from 'react';
const AvailableMeals = () => {
  const[meals,setMeals] = useState([]);
  const[loading,setLoading]= useState(true);
  const[httpError,setHttpError] = useState( );
  useEffect(()=>{
    const fetchMeals = async ()=>{
      const response = await fetch('https://food-order-site-ea897-default-rtdb.firebaseio.com//meals.json').then();
      if(!response.ok){
        throw new Error('Sorry Something Is Wrong');
      }
      const data = await response.json();
      const loadedMeals = [];
      for(const key in data){
        loadedMeals.push({
          id:key,
          name:data[key].name,
          description:data[key].description,
          price:data[key].price,
  
        });
        
      }
      setMeals(loadedMeals);
      setLoading(false);
    }
   
fetchMeals().catch((error)=>{
  
  setLoading(false);
  setHttpError(error.message);
})
},[])
if(loading){
  return <section className={classes.loading}>
    <h2>Loading Meals...</h2>
  </section>
}

if(httpError){
  return(
    <section className = {classes.errors}><h2>{httpError}</h2></section>
  )
}
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
