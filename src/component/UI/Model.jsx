import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Model.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} ></div>;
};

const ModelOverelay = (props) => {
  return (
    <div>
      <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlay");

const Model = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModelOverelay>{props.children}</ModelOverelay>,
        portalElement
      )}
    </Fragment>
  );
};
export default Model;
