import React from "react";
import "./Card.scss";

const Card = (props) => {
  return (
    <div className="card">
      <img src={props.user.photo} alt="" />
      <h4 title={props.user.name}>{props.user.name}</h4>
      <div className="information">
        <p title={props.user.position}>{props.user.position}</p>
        <p title={props.user.email}>{props.user.email}</p>
        <p title={props.user.phone}>{props.user.phone}</p>
      </div>
    </div>
  );
};

export default Card;
