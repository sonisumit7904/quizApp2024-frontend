import React from "react";
import "./QuizTopics.css";
const QuizTopics = ({ isSelected, isDisabled, onClick, subject }) => {
  return (
    <div
      className={`card ${isSelected ? "selected" : ""} ${
        isDisabled ? "disabled" : ""
      }`}
      onClick={isDisabled ? null : onClick} // Prevent click if disabled
    >
      {/* <img src="./zukoDragon.jpg" alt="Avatar" /> */}
      <div className="cardContainer">
        <h4>
          <b>{subject}</b>
        </h4>
        {/* <p>Architect & Engineer</p> */}
      </div>
    </div>
  );
};

export default QuizTopics;
