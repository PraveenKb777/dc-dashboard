/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import NoViewScreen from "./components/NoViewScreen/NoViewScreen";
import "./App.css";
import Login from "./pages/Login/Login";
import Details from "./pages/Details/Details";
import { Route, Routes } from "react-router-dom";
import FeedBackView from "./components/FeedBackView/FeedBackView";
import DetailsView from "./components/DetailsView/DetailsView";
import AnswersView from "./components/AnswersView/AnswersView";
import FeedbackList from "./components/FeedbackList/FeedbackList";

export const SCREEN_NAMES = { login: "login", details: "details" };

const App = () => {
  const [noSpace, setNoSpace] = useState(false);
  useEffect(() => {
    window.addEventListener("resize", function () {
      const width = document.body.clientWidth;
      if (width < 640) {
        setNoSpace(true);
      } else {
        setNoSpace(false);
      }
    });
  }, []);

  if (noSpace) {
    return <NoViewScreen />;
  }

  return (
    <div style={{ height: "100%" }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Details />}>
          <Route index element={<DetailsView />} />
          <Route path="/feedback" element={<FeedBackView />}>
            <Route index element={<FeedbackList />} />
            <Route path="answers" element={<AnswersView />} />
          </Route>
        </Route>
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </div>
  );
};

export default App;
