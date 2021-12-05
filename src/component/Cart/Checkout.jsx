import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChar = (value) => value.length === 6;

const Checkout = (props) => {
  const [formValidity, setformValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameref = useRef();
  const streetref = useRef();
  const postalref = useRef();
  const cityref = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameref.current.value;
    const enteredstreet = streetref.current.value;
    const enteredrpostal = postalref.current.value;
    const enteredcity = cityref.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredstreet);
    const postalIsValid = isFiveChar(enteredrpostal);
    const cityIsValid = !isEmpty(enteredcity);

    setformValidity({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    }
    
    props.onConfirm({
      name:enteredName,
      street:enteredstreet,
      postal:enteredrpostal,
      city:enteredcity
    })
  };

  const nameFormControl=`${classes.control} ${formValidity.name?'':classes.invalid}`;
  const streetFormControl=`${classes.control} ${formValidity.street?'':classes.invalid}`;
  const postalFormControl=`${classes.control} ${formValidity.postal?'':classes.invalid}`;
  const cityFormControl=`${classes.control} ${formValidity.city?'':classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameFormControl}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameref} />
        {!formValidity.name && <p>please Enter valid name</p>}
      </div>
      <div className={streetFormControl}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetref} />
        {!formValidity.street && <p>please Enter valid street.</p>}
      </div>
      <div className={postalFormControl}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalref} />
        {!formValidity.postal && <p>please Enter valid postal.</p>}
      </div>
      <div className={cityFormControl}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityref} />
        {!formValidity.city && <p>please Enter valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};
export default Checkout;
