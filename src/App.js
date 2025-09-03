import "./App.css";
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import About from "./components/About";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 6;
   
  const apiKey = process.env.REACT_APP_NEWS_API;
console.log("API Key:", apiKey); // Debug ke liye

  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchId, setSearchId] = useState(0);

  const handleSearch = (term) => {
    setSearchQuery(term);
    setSearchId((id) => id + 1);
  };

  return (
    <div>
      <Router>
        <NavBar onSearch={handleSearch} />
        <LoadingBar height={3} color="#f11946" progress={progress} />

        <Switch>
          <Route exact path="/about">
            <About setProgress={setProgress} />
          </Route>

          <Route exact path="/">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key={`general-${searchId}`}
              pageSize={pageSize}
              country="us"
              category="general"
              searchQuery={searchQuery}
              searchId={searchId}
            />
          </Route>

          <Route exact path="/business">
            <News setProgress={setProgress} key="business" pageSize={pageSize} country="us" category="business" />
          </Route>
          <Route exact path="/entertainment">
            <News setProgress={setProgress} key="entertainment" pageSize={pageSize} country="us" category="entertainment" />
          </Route>
          <Route exact path="/health">
            <News setProgress={setProgress} key="health" pageSize={pageSize} country="us" category="health" />
          </Route>
          <Route exact path="/science">
            <News setProgress={setProgress} key="science" pageSize={pageSize} country="us" category="science" />
          </Route>
          <Route exact path="/general">
            <News setProgress={setProgress} key="general" pageSize={pageSize} country="us" category="general" />
          </Route>
          <Route exact path="/sports">
            <News setProgress={setProgress} key="sports" pageSize={pageSize} country="us" category="sports" />
          </Route>
          <Route exact path="/technology">
            <News setProgress={setProgress} key="technology" pageSize={pageSize} country="us" category="technology" />
          </Route>

          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
