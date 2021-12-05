import React, { useState, useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [error,setError]=useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      const response = await fetch(
        "https://reactmeals-c70c3-default-rtdb.firebaseio.com/meals.json"
      );
      if(!response.ok){
        throw new Error('Request Failed!');
      }
      const data = await response.json();
      const loadedTask = [];
      for (const key in data) {
        loadedTask.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedTask);
      setIsLoading(false);
    };
    fetchMeal().catch(err=>{
      setIsLoading(false);
      setError(err.message);
    })
  }, []);

  if(isLoading){
    return <section className={classes.mealsIsLoading}>
      <p>Loading</p>
    </section>
  }
  if(error){
    return <section className={classes.mealError}>
      <p>{error}</p>
    </section>
  }

  const mealList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
