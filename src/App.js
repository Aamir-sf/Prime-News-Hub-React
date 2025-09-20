import "./App.css";
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import About from "./components/About";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const apiKeys = [
    process.env.REACT_APP_NEWS_API,
    process.env.REACT_APP_NEWS_API_1,
    process.env.REACT_APP_NEWS_API_2
  ].filter(key => key); 
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchId, setSearchId] = useState(0);
  const [language, setLanguage] = useState("en");

  const handleSearch = (term) => {
    setSearchQuery(term);
    setSearchId((id) => id + 1); 
  };

  return (
    <div>
      <Router>
        <NavBar onSearch={handleSearch} setLanguage={setLanguage} />
        <LoadingBar height={3} color="#f11946" progress={progress} />

        <Switch>
          <Route exact path="/about">
            <About setProgress={setProgress} />
          </Route>

          <Route exact path="/">
            <News
              setProgress={setProgress}
              apiKeys={apiKeys} 
              key={`top-${searchId}`}
              country="in"
              category="top"
              language={language}
              searchQuery={searchQuery}
              searchId={searchId}
            />
          </Route>

          <Route exact path="/business">
            <News
              setProgress={setProgress}
              apiKeys={apiKeys}
              key={`business-${searchId}`}
              country="in"
              category="business"
              language={language}
              searchQuery={searchQuery}
              searchId={searchId}
            />
          </Route>

          <Route exact path="/entertainment">
            <News
              setProgress={setProgress}
              apiKeys={apiKeys} 
              key={`entertainment-${searchId}`}
              country="in"
              category="entertainment"
              language={language}
              searchQuery={searchQuery}
              searchId={searchId}
            />
          </Route>

          <Route exact path="/health">
            <News
              setProgress={setProgress}
              apiKeys={apiKeys} 
              key={`health-${searchId}`}
              country="in"
              category="health"
              language={language}
              searchQuery={searchQuery}
              searchId={searchId}
            />
          </Route>

          <Route exact path="/science">
            <News
              setProgress={setProgress}
              apiKeys={apiKeys} 
              key={`science-${searchId}`}
              country="in"
              category="science"
              language={language}
              searchQuery={searchQuery}
              searchId={searchId}
            />
          </Route>

          <Route exact path="/sports">
            <News
              setProgress={setProgress}
              apiKeys={apiKeys}
              key={`sports-${searchId}`}
              country="in"
              category="sports"
              language={language}
              searchQuery={searchQuery}
              searchId={searchId}
            />
          </Route>

          <Route exact path="/technology">
            <News
              setProgress={setProgress}
              apiKeys={apiKeys} 
              key={`technology-${searchId}`}
              country="in"
              category="technology"
              language={language}
              searchQuery={searchQuery}
              searchId={searchId}
            />
          </Route>

          <Redirect to="/" />
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
};

export default App;