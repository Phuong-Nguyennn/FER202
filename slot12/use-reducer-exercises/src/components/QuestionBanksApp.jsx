import React, { useReducer, useEffect } from "react";
import { Button, Container, Card } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// -------------------- initialState --------------------
const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  showFeedback: false,
  correct: null,
  timeLeft: 10,
  highScore: Number(localStorage.getItem("highScore")) || 0,
};

// -------------------- reducer --------------------
function reducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      const isCorrect =
        action.payload === state.questions[state.currentQuestion].answer;
      return {
        ...state,
        selectedOption: action.payload,
        showFeedback: true,
        correct: isCorrect,
        score: isCorrect ? state.score + 1 : state.score,
      };

    case "NEXT_QUESTION":
      const nextIndex = state.currentQuestion + 1;
      const finished = nextIndex === state.questions.length;
      const newHighScore = Math.max(state.highScore, state.score);

      if (finished) localStorage.setItem("highScore", newHighScore);

      return {
        ...state,
        currentQuestion: finished ? state.currentQuestion : nextIndex,
        selectedOption: "",
        showScore: finished,
        showFeedback: false,
        correct: null,
        timeLeft: 10,
        highScore: newHighScore,
      };

    case "TICK":
      if (state.timeLeft <= 1) {
        const nextIndex = state.currentQuestion + 1;
        const finished = nextIndex === state.questions.length;
        const newHighScore = Math.max(state.highScore, state.score);
        if (finished) localStorage.setItem("highScore", newHighScore);
        return {
          ...state,
          currentQuestion: finished ? state.currentQuestion : nextIndex,
          selectedOption: "",
          showScore: finished,
          showFeedback: false,
          correct: null,
          timeLeft: 10,
          highScore: newHighScore,
        };
      }
      return { ...state, timeLeft: state.timeLeft - 1 };

    case "RESTART_QUIZ":
      return { ...initialState, highScore: state.highScore };

    default:
      return state;
  }
}

// -------------------- COMPONENT --------------------
export default function QuestionBanksApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    currentQuestion,
    selectedOption,
    score,
    showScore,
    showFeedback,
    correct,
    timeLeft,
    highScore,
  } = state;

  const question = questions[currentQuestion];

  useEffect(() => {
    if (showScore || showFeedback) return;
    const timer = setInterval(() => dispatch({ type: "TICK" }), 1000);
    return () => clearInterval(timer);
  }, [showScore, showFeedback]);

  return (
    <Container className="mt-4">
      <Card className="p-4 text-center shadow-sm">
        {showScore ? (
          <div>
            <h2>🎉 Quiz Finished!</h2>
            <h4>
              Your Score: {score} / {questions.length}
            </h4>
            <p>🏆 High Score: {highScore}</p>
            <Button variant="primary" onClick={() => dispatch({ type: "RESTART_QUIZ" })}>
              Restart Quiz
            </Button>
          </div>
        ) : (
          <div>
            <h5>
              Question {currentQuestion + 1} / {questions.length}
            </h5>
            <h4 className="mt-3">{question.question}</h4>

            <div className="mt-3">
              {question.options.map((option, i) => (
                <Button
                  key={i}
                  variant={
                    selectedOption === option
                      ? "success"
                      : "outline-secondary"
                  }
                  className="m-2"
                  onClick={() => dispatch({ type: "SELECT_OPTION", payload: option })}
                  disabled={showFeedback}
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Phản hồi đúng/sai */}
            {showFeedback && (
              <div className="mt-3">
                {correct ? (
                  <p className="text-success fw-bold">
                    <FaCheckCircle /> Correct! 🎉
                  </p>
                ) : (
                  <p className="text-danger fw-bold">
                    <FaTimesCircle /> Incorrect! The correct answer is:{" "}
                    <strong>{question.answer}</strong>
                  </p>
                )}
                <Button
                  variant="primary"
                  className="mt-2"
                  onClick={() => dispatch({ type: "NEXT_QUESTION" })}
                >
                  {currentQuestion === questions.length - 1
                    ? "Finish Quiz"
                    : "Next Question"}
                </Button>
              </div>
            )}

            {/* Hiển thị thời gian */}
            <div className="mt-3">
              <p style={{ color: timeLeft <= 5 ? "red" : "black" }}>
                ⏳ Time left: {timeLeft}s
              </p>
            </div>
          </div>
        )}
      </Card>
    </Container>
  );
}
