import React from "react";
import { Fragment } from "react";
import ImageMeals from "../../Assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onShowEvent={props.onShowCart}/>
      </header>
      <div className={classes["main-image"]}>
        <img src={ImageMeals} alt="A full food!" />
      </div>
    </Fragment>
  );
};

export default Header;
