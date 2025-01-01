import React from "react";
import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { MainContainer } from "./Components";
import { Analytics, Dashboard, FeedbackPage, QuizPage, Quizzes } from "./Pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Analytics />} />
          <Route path="quizzes" element={<Quizzes />} />
        </Route>
        <Route path="quiz">
          <Route path=":id" element={<QuizPage />} />
          <Route path="feedback">
            <Route path=":id" element={<FeedbackPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
