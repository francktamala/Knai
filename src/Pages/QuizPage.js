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
        <h4 className="Accent">Time Left: Unlimited</h4>
      </div>
    </div>
  );
}

export default function QuizPage() {
  const MockQuestions = [
    {
      id: 1,
      type: "short_answer",
      question: "What is the capital of France?",
    },
    {
      id: 2,
      type: "long_answer",
      question: "Explain the significance of photosynthesis.",
    },
    {
      id: 3,
      type: "multiple_choice",
      question: "The Great Wall of China is visible from space.",
      options: ["True", "False"],
    },
    {
      id: 4,
      type: "multiple_answers",
      question: "Select the countries in Africa.",
      options: ["DRC", "USA", "Republic of the Congo", "Australia"],
    },
    {
      id: 5,
      type: "multiple_choice",
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
    },
    {
      id: 6,
      type: "short_answer",
      question: "Who wrote the play 'Romeo and Juliet'?",
      correct_answer: "William Shakespeare",
    },
    {
      id: 7,
      type: "short_answer",
      question:
        "If a car travels 300 kilometers in 5 hours, what is its average speed?",
      correct_answer: "60 km/h",
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
              value={
                100 * (Object.keys(responses).length / MockQuestions.length)
              }
            />
          </Box>
          <Box>
            <h2 className="title-xs Grey">
              Question {Object.keys(responses).length} out of{" "}
              {MockQuestions.length}
            </h2>
          </Box>
        </Box>

        <div className="Grid-2">
          <Btn
            style={{ width: "98%" }}
            type={"Primary"}
            title={"Exit"}
            startIcon={<ClearIcon />}
            onClick={() => navigate("/dashboard/quizzes")}
          />
          <Btn
            style={{ width: "98%" }}
            title={"Save"}
            endIcon={<SaveIcon />}
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

  function DisplayQuestions(page) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 35,
        }}
      >
        {MockQuestions.slice(page * 5 - 5, page * 5).map((q, idx) => {
          return (
            <div>
              <p>
                {idx + 1}. {q.question}
              </p>

              {/* Short Answer */}
              {q.type === "short_answer" && (
                <TextField
                  fullWidth
                  required
                  label="Answer"
                  variant="standard"
                  size="small"
                  name={`short_answer_${q.id}`}
                  value={responses[q.id] || ""}
                  onChange={(e) => HandleAnswerChange(q.id, e.target.value)}
                />
              )}

              {/* Long Answer */}
              {q.type === "long_answer" && (
                <div className="textarea-wrapper">
                  <textarea
                    style={{ width: "100%", minHeight: 100 }}
                    required
                    placeholder="Your Answer"
                    name={`long_answer_${q.id}`}
                    value={responses[q.id] || ""}
                    onChange={(e) => HandleAnswerChange(q.id, e.target.value)}
                  />
                </div>
              )}

              {/* Multiple Choice (Including True/False) */}
              {q.type === "multiple_choice" && (
                <FormControl>
                  <RadioGroup
                    row
                    name={`multiple_choice_${q.id}`}
                    onChange={(e) => HandleAnswerChange(q.id, e.target.value)}
                  >
                    {q.options.map((option, optionIdx) => (
                      <FormControlLabel
                        key={optionIdx}
                        value={option}
                        control={<Radio checked={responses[q.id] === option || false} />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}

              {/* Multiple Answers (Formerly Checkbox) */}
              {q.type === "multiple_answers" && (
                <div>
                  {q.options.map((option, optionIdx) => (
                    <FormControlLabel
                      key={optionIdx}
                      control={
                        <Checkbox
                          name={`multiple_answers_${q.id}_${optionIdx}`}
                          onChange={(e) =>
                            HandleAnswerChange(q.id, option, true)
                          }
                          checked={responses[q.id] && responses[q.id].includes(option)}
                        />
                      }
                      label={option}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <div className="Flex-Row" style={{ justifyContent: "space-between" }}>
          <Btn
            title={"Back"}
            disabled={page <= 1}
            type={"Accent"}
            action={"button"}
            onClick={() => setPage(page - 1)}
          />
          {page * 5 >= MockQuestions.length ? (
            <Btn
              disabled={MockQuestions.length !== Object.keys(responses).length}
              title={"Submit"}
              type={"Primary"}
              action={"submit"} 
              style={{
                alignSelf: "flex-end",
              }}
            />
          ) : (
            <Btn
              title={"Next"}
              type={"Primary"}
              action={"button"}
              onClick={() => handlePageChange(page + 1)}
            />
          )}
        </div>
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

  // console.log(responses);

  return (
    <QuizContainer Header={Header} Sidebar={Sidebar}>
      <div
        className="Dashboard-Box"
        // style={{ padding: 35, width: "85%", overflow: "auto", margin: "45px auto", position: "relative" }}
        style={{
          fontWeight: 500,
        }}
      >
        <form onSubmit={SubmitForm}>{DisplayQuestions(page)}</form>
      </div>
    </QuizContainer>
  );
}
