import React, { useState } from "react";
import { Btn, MainContainer, Modal } from "../Components";
import { FormatDate } from "../Utilities";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { COLORS } from "../Constants";
import { useNavigate } from "react-router";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Quizzes() {
  const MockData = {
    InProgress: [
      {
        id: 1,
        title: "Math Quiz",
        progress: 80,
        startDate: "2024-01-15T10:00:00Z",
      },
      {
        id: 2,
        title: "Science Quiz",
        progress: 60,
        startDate: "2024-02-01T14:30:00Z",
      },
      {
        id: 3,
        title: "History Quiz",
        progress: 90,
        startDate: "2024-03-10T09:00:00Z",
      },
      {
        id: 4,
        title: "English Quiz",
        progress: 50,
        startDate: "2024-04-20T16:00:00Z",
      },
      {
        id: 5,
        title: "Geography Quiz",
        progress: 75,
        startDate: "2024-05-05T08:15:00Z",
      },
    ],
    Completed: [
      {
        id: 1,
        title: "Physics Quiz",
        score: 85,
        startDate: "2024-01-10T09:00:00Z",
        endDate: "2024-01-20T17:00:00Z",
      },
      {
        id: 2,
        title: "Chemistry Quiz",
        score: 70,
        startDate: "2024-02-05T11:00:00Z",
        endDate: "2024-02-15T15:30:00Z",
      },
      {
        id: 3,
        title: "Biology Quiz",
        score: 95,
        startDate: "2024-03-01T08:00:00Z",
        endDate: "2024-03-10T18:00:00Z",
      },
      {
        id: 4,
        title: "Computer Science Quiz",
        score: 60,
        startDate: "2024-04-12T10:15:00Z",
        endDate: "2024-04-22T16:45:00Z",
      },
      {
        id: 5,
        title: "Art Quiz",
        score: 78,
        startDate: "2024-05-03T13:30:00Z",
        endDate: "2024-05-13T14:00:00Z",
      },
    ],
  };

  const navigate = useNavigate();


  function InProgressQuizItem({ title, progress, startDate, id }) {
    const date = new Date(startDate || new Date());
    return (
      <>
        <div className="Grid-4" style={{ padding: "10px 0" }}>
          <h1 className="title-xs Grey">{title}</h1>
          <h1 className="title-xs Grey Center">{progress}%</h1>
          <h1 className="title-xs Grey Center">{FormatDate(date)}</h1>
          <Btn title={"Continue Quiz"} type={"Accent"} onClick={() => navigate("/quiz/37876")}/>
        </div>
        <hr className="Primary" />
      </>
    );
  }

  function CompletedQuizItem({ title, score, startDate, endDate, id }) {
    const startdate = new Date(startDate || new Date());
    const enddate = new Date(endDate || new Date());

    return (
      <>
        <div className="Grid-5" style={{ padding: "10px 0" }}>
          <h1 className="title-xs Primary">{title}</h1>
          <h1 className="title-xs Primary Center">{score}%</h1>
          <h1 className="title-xs Primary Center">{FormatDate(startdate)}</h1>
          <h1 className="title-xs Primary Center">{FormatDate(enddate)}</h1>
          <Btn title={"View Quiz"} type={"Accent"} onClick={() => navigate("/quiz/feedback/37876")}/>
        </div>
        <hr className="Primary" />
      </>
    );
  }

  const [showNewQuizModal, setShowNewQuizModal] = useState(false);
  const [values, setValues] = useState({
    title: "",
    type: 30,
    level: "",
    file: null,
  });

  const handleChange = (event) => {
    setValues((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };


  return (
    <MainContainer screen={"quizzes"}>
      <div className="Grid-2">
        <h2 className="title-lg Accent">Quizzes</h2>
        <Btn
          title={"+ New Quiz"}
          onClick={() => setShowNewQuizModal(true)}
          type={"Primary"}
          style={{ width: 120 }}
        />
      </div>
      <br />
      <h2 className="title-sm Primary">Quizzes In-Progress</h2>
      {/* <hr className="Secondary Round" /> */}
      <div className="Dashboard-Box">
        <div className="Grid-4">
          <h1 className="title-xs Accent">Quiz Name</h1>
          <h1 className="title-xs Accent Center">Progress</h1>
          <h1 className="title-xs Accent Center">Start Date</h1>
          <h1 className="title-xs Accent"></h1>
        </div>
        <hr className="Accent" />
        {MockData.InProgress.map((item) => (
          <InProgressQuizItem {...item} key={item.id} />
        ))}
      </div>
      <br />
      <hr className="Secondary Round" />
      <h2 className="title-sm Primary">Completed Quizzes</h2>
      <div className="Dashboard-Box">
        <div className="Grid-5">
          <h1 className="title-xs Accent">Quiz Name</h1>
          <h1 className="title-xs Accent Center">Score</h1>
          <h1 className="title-xs Accent Center">Start Date</h1>
          <h1 className="title-xs Accent Center">End Date</h1>
          <h1 className="title-xs Accent"></h1>
        </div>
        <hr className="Accent" />
        {MockData.Completed.map((item) => (
          <CompletedQuizItem {...item} key={item.id} />
        ))}
      </div>

      <Modal
        open={showNewQuizModal}
        setOpen={setShowNewQuizModal}
        style={{ width: "85%" }}
      >
        <h1 className="Primary title-lg">New Quiz</h1><br />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 35,
            alignItems: "flex-start",
          }}
        >
          <TextField
            fullWidth
            required
            label="Title"
            id="filled-size-small"
            variant="standard"
            size="small"
            name="title"
            value={values.title}
            onChange={handleChange}
          />
          <span>
            <p style={{ fontStyle: "italic", marginTop: 0 }}>
              Upload the content from which the quiz must be generated.
            </p>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              style={{
                backgroundColor: COLORS.Grey
              }}
            >
              Upload files
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => {
                  handleChange({
                    target: {
                      name: "file",
                      value: event.target.files[0],
                    },
                  });
                }}
              />
            </Button>
            {values?.file && (
              <div
                style={{
                  border: "2px dashed " + COLORS.Accent,
                  padding: 8,
                  borderRadius: 4,
                  marginTop: 15,
                }}
              >
                <p className="Accent" style={{ margin: 0 }}>
                  Uploaded File: {values?.file?.name}
                </p>
              </div>
            )}
          </span>

          <FormControl variant="standard" fullWidth required>
            <InputLabel id="demo-simple-select-standard-label">
              Level of difficulty
            </InputLabel>
            <Select
              required
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={values.level}
              onChange={handleChange}
              label="Level of difficulty"
              name="level"
            >
              <MenuItem value={"Easy"}>Easy</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"Difficult"}>Difficult</MenuItem>
            </Select>
          </FormControl>
          <span style={{width: "100%"}}>
            <p style={{ fontStyle: "italic", marginTop: 0}}>
              Question type preference
            </p>
            <Stack
              spacing={2}
              direction="row"
              sx={{ alignItems: "center", width: "100%" }}
            >
              <h4>SHORT</h4>
              <Slider
                aria-label="Question Type"
                defaultValue={30}
                value={values.type}
                onChange={(event, value) => {
                  handleChange({
                    target: {
                      name: "type",
                      value: value,
                    },
                  });
                }}
              />
              <h4>LONG</h4>
            </Stack>
          </span>

          <FormControl variant="standard" fullWidth required>
            <InputLabel id="demo-simple-select-standard-label">
              Language
            </InputLabel>
            <Select
              required
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={values?.language}
              onChange={handleChange}
              label="Language"
              name="language"
            >
              <MenuItem value={"French"}>French</MenuItem>
              <MenuItem value={"English"}>English</MenuItem>
              <MenuItem value={"Swahili"}>Swahili</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Time Limit (in minutes)"
            id="filled-size-small"
            variant="standard"
            size="small"
            name="timeLimit"
            value={values?.timeLimit}
            onChange={handleChange}
            type="number"
          />

          {/* <br /> */}

          <Btn onClick={() => navigate("/quiz/38694")} title={"Create Quiz"} type={"Primary"} style={{alignSelf: "flex-end"}}/>
        </div>
      </Modal>
    </MainContainer>
  );
}
