import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  LinearProgress,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { COLORS } from "../Constants";
import { Btn, QuizContainer } from "../Components";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import ReplayIcon from "@mui/icons-material/Replay";
import CorrectIcon from "@mui/icons-material/TaskAlt";

function Header() {
  return (
    <div
      style={{
        display: "grid",
        alignItems: "center",
        padding: "0 24px",
        gridTemplateColumns: "1fr 1fr 1fr",
      }}
    >
      <div>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "block" },
          }}
        >
          KNAI
        </Typography>
      </div>

      <div style={{ textAlign: "center" }}>
        <h4 className="Primary">History Quiz on homosapiens</h4>
      </div>
      <div style={{ textAlign: "right" }}>
        <h4 className="Accent">Time Limit: Unlimited</h4>
      </div>
    </div>
  );
}

export default function FeedbackPage() {
  const MockFeedback = [
    {
      id: 1,
      question: "What is the capital of France?",
      type: "short_answer",
      userAnswer: "Pariss",
      correctAnswer: "Paris",
      status: "partially_correct",
      feedback: "Check your spelling. The correct spelling is Paris.",
    },
    {
      id: 2,
      question: "Explain the significance of photosynthesis.",
      type: "long_answer",
      userAnswer: "Photosynthesis makes food for plants.",
      correctAnswer:
        "Photosynthesis is the process by which green plants use sunlight to synthesize nutrients from carbon dioxide and water, producing oxygen as a byproduct.",
      status: "partially_correct",
      feedback:
        "Expand your answer to include how photosynthesis converts sunlight into nutrients and its importance to the ecosystem.",
    },
    {
      id: 3,
      question: "The Great Wall of China is visible from space.",
      type: "multiple_choice",
      options: ["True", "False"],
      userAnswer: "True",
      correctAnswer: "False",
      status: "incorrect",
      feedback: "The Great Wall is not visible from space with the naked eye.",
    },
    {
      id: 4,
      question: "Select the countries in Africa.",
      type: "multiple_answers",
      options: ["DRC", "USA", "Republic of the Congo", "Australia"],
      userAnswer: ["USA", "DRC"],
      correctAnswer: ["DRC", "Republic of the Congo"],
      status: "incorrect",
      feedback: "Remove 'USA' and add 'Republic of the Congo' to your answer.",
    },
    {
      id: 5,
      question: "Which planet is known as the Red Planet?",
      type: "multiple_choice",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      userAnswer: "Mars",
      correctAnswer: "Mars",
      status: "correct",
      feedback: null,
    },
    {
      id: 6,
      question: "Who wrote the play 'Romeo and Juliet'?",
      type: "short_answer",
      userAnswer: "William Shakespeare",
      correctAnswer: "William Shakespeare",
      status: "correct",
      feedback: null,
    },
    {
      id: 7,
      question:
        "If a car travels 300 kilometers in 5 hours, what is its average speed?",
      type: "short_answer",
      userAnswer: "50 km/h",
      correctAnswer: "60 km/h",
      status: "incorrect",
      feedback: "Recalculate: 300 km divided by 5 hours equals 60 km/h.",
    },
  ];

  const [responses, setResponses] = useState({});
  const [page, setPage] = useState(1);

  let { id } = useParams();
  const navigate = useNavigate();

  function Sidebar() {
    return (
      <div
        style={{
          padding: "0 15px",
          display: "flex",
          flexDirection: "column",
          gap: 55,
          paddingTop: 35,
        }}
      >
        <hr className="Accent Round Small" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column-reverse",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress
              sx={{
                "& .MuiLinearProgress-root": {
                  height: 10,
                },
              }}
              variant="determinate"
              value={85}
            />
          </Box>
          <Box>
            <h2 className="title-xs Grey">Your Score 85%</h2>
          </Box>
        </Box>

        <div className="Grid-2">
          <Btn
            style={{ width: "98%" }}
            type={"Primary"}
            title={"Retry"}
            startIcon={<ReplayIcon />}
            onClick={() => navigate("/quiz/63876")}
          />
          <Btn
            style={{ width: "98%" }}
            title={"Close"}
            endIcon={<ClearIcon />}
            onClick={() => navigate("/dashboard/quizzes")}
          />
        </div>
      </div>
    );
  }

  function SubmitForm(e) {
    e.preventDefault();
    // make API call to save the quiz
    navigate("/dashboard/quizzes");
  }

  let debounceTimeout = null;

  function handlePageChange(nextPage) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      setPage(nextPage);
    }, 100); // Adjust delay as needed
  }

  function DisplayFeedback({ feedback }) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 35,
        }}
      >
        {feedback.map((item, idx) => (
          <div key={item.id}>
            <p>
              {idx + 1}. {item.question}
            </p>

            <div style={{ marginLeft: 19 }}>
              {item.status.toLowerCase() === "correct" && (
                <div
                  className="Flex-Row"
                  style={{
                    gap: 25,
                    margin: "10px 0",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "green",
                      borderRadius: 5,
                      padding: "6px 12px",
                      color: "#fff",
                    }}
                  >
                    <p style={{ margin: 0 }}>
                      Your Answer:{" "}
                      {Array.isArray(item.userAnswer)
                        ? item.userAnswer.join(", ")
                        : item.userAnswer}
                    </p>
                  </div>
                  <CorrectIcon color="success" fontSize={"large"} />
                </div>
              )}

              {(item.status.toLowerCase() === "incorrect" ||
                item.status.toLowerCase() === "partially_correct") && (
                <>
                  <div
                    className="Flex-Row"
                    style={{
                      gap: 25,
                      margin: "10px 0",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: COLORS.Grey,
                        borderRadius: 5,
                        padding: "6px 12px",
                        color: "#fff",
                      }}
                    >
                      <p style={{ margin: 0 }}>
                        Your Answer:{" "}
                        {Array.isArray(item.userAnswer)
                          ? item.userAnswer.join(", ")
                          : item.userAnswer}
                      </p>
                    </div>
                    <ClearIcon style={{ color: "red" }} fontSize={"large"} />
                  </div>

                  <div
                    className="Flex-Row"
                    style={{
                      gap: 25,
                      margin: "10px 0",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "green",
                        borderRadius: 5,
                        padding: "6px 12px",
                        color: "#fff",
                      }}
                    >
                      <p style={{ margin: 0 }}>
                        Correct Answer:{" "}
                        {Array.isArray(item.correctAnswer)
                          ? item.correctAnswer.join(", ")
                          : item.correctAnswer}
                      </p>
                    </div>
                    <CorrectIcon color="success" fontSize={"large"} />
                  </div>
                  <p style={{ color: COLORS.Primary }}>
                    Feedback: {item.feedback}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  function HandleAnswerChange(id, res, checkbox = false) {
    if (res && res !== "" && res !== null) {
      if (!checkbox) {
        setResponses((prev) => {
          return { ...prev, [id]: res };
        });
      } else {
        let temp = { ...responses };
        temp[id] = temp[id] || [];

        if (temp[id].includes(res)) {
          // Remove the answer if it's already selected
          temp[id] = temp[id].filter((item) => item !== res);
          // Delete the key if the array becomes empty
          if (temp[id].length === 0) {
            delete temp[id];
          }
        } else {
          // Add the answer if it's newly selected
          temp[id].push(res);
        }

        setResponses(temp);
      }
    } else {
      let temp = { ...responses };
      delete temp[id];

      setResponses(temp);
    }
  }

  return (
    <QuizContainer Header={Header} Sidebar={Sidebar}>
      <div
        className="Dashboard-Box"
        // style={{ padding: 35, width: "85%", overflow: "auto", margin: "45px auto", position: "relative" }}
        style={{
          fontWeight: 500,
        }}
      >
        {/* <form onSubmit={SubmitForm}>{DisplayQuestions(page)}</form> */}
        <DisplayFeedback feedback={MockFeedback} />
      </div>
    </QuizContainer>
  );
}
