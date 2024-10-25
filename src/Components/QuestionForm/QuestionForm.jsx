// QuestionForm.js
import React, { useState, useEffect } from "react";
import "./QuestionForm.css"; // Your styles
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

const QuestionForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [topic, setTopic] = useState("Java");
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const [newQuestion, setNewQuestion] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission,
    // e.g., send the data to an API or store it in state.

    setNewQuestion({
      questionTitle: question,
      option1: options[0],
      option2: options[1],
      option3: options[2],
      option4: options[3],
      correctAnswer: correctAnswer,
      difficultyLevel: difficulty,
      topicName: topic,
    });

    // Reset the form
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
    setDifficulty("Easy");
    setTopic("Java");
  };

  // Create axios instance with default config
  const axiosInstance = axios.create({
    baseURL: "/Question", // This will use the proxy when using Vite config
    headers: {
      "Content-Type": "application/json",
    },
  });
  const addQues = async () => {
    try {
      setLoading(true);

      // Get the selected difficulty and topic

      // Step 1: Create the quiz with POST request using axios
      const addQuestionResponse = await axiosInstance.post(
        "/addQues",
        newQuestion
      );
    } catch (error) {
      console.error(
        "Error submitting Question:",
        error.response?.data || error.message
      );
      alert("Failed to submit Question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Use useEffect to log the updated newQuestion when it changes
  useEffect(() => {
    const submitQuestion = async () => {
      if (Object.keys(newQuestion).length !== 0) {
        console.log("New Question object:", newQuestion);

        // Call the async function to submit the new question
        await addQues();

        // Optional: You can dispatch or redirect here if needed
        // dispatch({ type: "insert_question", payload: newQuestion });
        history.push("./");
      }
    };

    submitQuestion(); // Call the async function inside useEffect
  }, [newQuestion]);

  return (
    <div className="question-form">
      <h2>Insert Question</h2>
      <form
        onSubmit={handleSubmit}
        disabled={loading} // Disable if either is not selected
      >
        <div>
          <label>
            Question:
            <textarea
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>Options:</label>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
                placeholder={`Option ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <div>
          <label>
            Correct Answer:
            <select
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              required // Make it required
            >
              <option value="" disabled>
                Select the correct answer
              </option>{" "}
              {/* Placeholder option */}
              {options.map((option, index) => (
                <option key={index} value={index + 1}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>
            Difficulty:
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              required // Make it required
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Topic:
            <select value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option value="Java">Java</option>
              <option value="Computer Network">Computer Network</option>
              <option value="Operating System">Operating System</option>
            </select>
          </label>
        </div>

        <button
          type="submit"
          className={`start ${loading ? "disabled" : ""}`}
          disabled={loading}
        >
          {loading ? "Submitting Question..." : "Submit Question"}
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
