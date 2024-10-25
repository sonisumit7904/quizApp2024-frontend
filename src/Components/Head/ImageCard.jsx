import React from "react";
import "./ImageCard.css";
const ImageCard = ({ isSelected, isDisabled, onClick, quiz }) => {
  return (
    <div
      className={`card ${isSelected ? "selected" : ""} ${
        isDisabled ? "disabled" : ""
      }`}
      onClick={isDisabled ? null : onClick} // Prevent click if disabled
    >
      <img src={quiz.difficulty.toLowerCase() + ".jpg"} alt="Avatar" />
      <div className="cardContainer">
        <h4>
          <b>{quiz.difficulty}</b>
        </h4>
        <p>{quiz.desc}</p>
        <p>{quiz.questions} Questions</p>
      </div>
    </div>
  );
};

export default ImageCard;
