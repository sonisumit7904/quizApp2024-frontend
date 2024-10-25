import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Head.css";
import ImageCard from "./ImageCard";
import axios from "axios";
import QuizTopics from "./QuizTopics";
import { useDispatch } from "react-redux";

const Head = () => {
  const history = useHistory();

  // State to track the selected card and selected topic
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(false);

  const quizSet = [
    {
      difficulty: "Easy",
      desc: "Time : 10 sec",
      questions: 15,
    },
    {
      difficulty: "Medium",
      desc: "Time : 10 sec",
      questions: 10,
    },
    {
      difficulty: "Hard",
      desc: "Time : 10 sec",
      questions: 5,
    },
  ];

  const quizSubject = ["Java", "Operating System", "Computer Network"];

  // Create axios instance with default config
  const axiosInstance = axios.create({
    baseURL: "/Quiz", // Add /Quiz to base URL
    headers: {
      "Content-Type": "application/json",
    },
  });

  const createQuiz = async () => {
    try {
      setLoading(true);

      // Get the selected difficulty and topic
      const selectedDifficulty = quizSet[selectedCard];
      const selectedSubject = quizSubject[selectedTopic];

      // Step 1: Create the quiz with POST request using axios
      const createResponse = await axiosInstance.post("/create", null, {
        params: {
          noOfQues: selectedDifficulty.questions,
          topic: selectedSubject,
          title: `${selectedSubject.toLowerCase()}Quiz`,
        },
      });

      const id = createResponse.data;

      // Step 2: Get the quiz questions using the ID
      const getQuizResponse = await axiosInstance.get(`/get/${id}`);

      const quizData = getQuizResponse.data;

      localStorage.setItem(
        "currentQuiz",
        JSON.stringify({
          id,
          questions: quizData,
          difficulty: selectedDifficulty.difficulty,
          topic: selectedSubject,
        })
      );

      history.push(`/quiz`);
    } catch (error) {
      console.error(
        "Error creating quiz:",
        error.response?.data || error.message
      );
      alert("Failed to create quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const gotoForm = () => {
    history.push("/add-question");
  };

  const clickHandlerCard = (cardIndex) => {
    // If the clicked card is already selected, do nothing
    if (selectedCard === cardIndex) return;

    // Set the selected card index
    setSelectedCard(cardIndex);
  };

  const clickHandlerTopic = (topicIndex) => {
    // If the clicked topic is already selected, do nothing
    if (selectedTopic === topicIndex) return;

    // Set the selected topic index
    setSelectedTopic(topicIndex);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      <div className="quizFlex">
        {quizSet.map((item, index) => (
          <ImageCard
            key={index}
            isSelected={selectedCard === index}
            isDisabled={selectedCard !== null && selectedCard !== index}
            onClick={() => clickHandlerCard(index)}
            quiz={item}
          />
        ))}
      </div>
      <div className="quizTopics">
        {quizSubject.map((sub, index) => (
          <QuizTopics
            key={index}
            isSelected={selectedTopic === index}
            isDisabled={selectedTopic !== null && selectedTopic !== index}
            onClick={() => clickHandlerTopic(index)}
            subject={sub}
          />
        ))}
      </div>

      <hr />
      <button
        onClick={createQuiz}
        className={`start ${
          selectedCard === null || selectedTopic === null || loading
            ? "disabled"
            : ""
        }`}
        disabled={selectedCard === null || selectedTopic === null || loading} // Disable if either is not selected
      >
        {loading ? "Creating Quiz..." : "START QUIZ"}
      </button>
      <button onClick={gotoForm} className={`start`}>
        Insert Question
      </button>
    </div>
  );
};

export default Head;
