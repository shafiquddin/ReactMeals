import React, { useRef,useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const [noError,setNoError]=useState(true);
  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enterAmount = amountInputRef.current.value;
    const enterAmountNumber = +enterAmount;

    if (
      enterAmount.trim().length === 0 ||
      enterAmountNumber < 1 ||
      enterAmountNumber > 5
    ) {
      setNoError(false);
      return;
    }

  props.onAddToCart(enterAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Quantity"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!noError && <p>please Enter valid Number</p>}
    </form>
  );
};
export default MealItemForm;
