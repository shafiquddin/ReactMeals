import React, { Fragment } from "react";
import AvailableMeals from "./AvailableMeals";
import Mealsummary from "./MealSummary";

const Meals = () => {
  return (
    <Fragment>
      <Mealsummary />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
