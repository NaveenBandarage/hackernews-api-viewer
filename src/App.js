import "./App.css";
import "./loading.css";

import {sanitizeUrl} from "@braintree/sanitize-url";
import axios from 'axios';
import {motion, useCycle, useViewportScroll} from "framer-motion";
import React, {useEffect, useRef, useState} from "react";

import List from "./components/List";
import {MenuToggle} from "./MenuToggle";
import {Navigation} from "./Navigation";
import {CircleIndicator} from "./scrollthing";
import logo from "./wsbgif.gif";

function App() {
  const [appState, setAppState] = useState({
    loading : true,
    repos : null,
  });

  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef({width : 0, height : 0});

  useEffect(() => {
    let data = null;
    let promises = [];
    const apiUrl =
        `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`;
    axios.get(apiUrl).then((res) => {
      res.data.forEach((id) => {
        promises.push(
            axios.get(sanitizeUrl(`https://hacker-news.firebaseio.com/v0/item/${
                id}​​​​​.json?print=pretty`)));
      });
      Promise.all(promises)
          .then((res) => {
            console.log(Object.entries(res));
            setAppState({loading : false, repos : res});
          })
          .catch((err) => console.log(err));
    });
  }, []);

  if (appState.loading) {
    return (
        <div className = "wsb-div"><img src = {logo} alt = "loading..." />
        </div>
    );
  }

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: "circle(30px at 40px 40px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Top Stories Today:</h1>
        </div>
      <div className="repo-container">
        {Object.entries(appState.repos)
          .slice(0, 20)
          .map((arr, idx) => {
            return (
              <List
                isLoading={appState.loading}
                repos={arr[1].data}
                idx={idx}
              />);
  })
}
</div>
      <footer>
        <div className="footer">
          Built{" "}
          <span role="img" aria-label="love">
            💚
          </span>{
    " "} with by Naveen Bandarage</div>
      </footer><
    /div>
  );
}
export default App;
