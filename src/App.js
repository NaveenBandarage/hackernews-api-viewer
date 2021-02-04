import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./wsbgif.gif";
import "./loading.css";
import axios from 'axios';
import List from "./components/List";
import { sanitizeUrl } from "@braintree/sanitize-url";
function App() {
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: true,
    repos: null,
  });

    
useEffect(() => {
  let data = null; 
  let promises = [];
  const apiUrl = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`;
  axios.get(apiUrl).then((res)=> {
    res.data.forEach((id)=>{
      promises.push(
        axios.get(
          sanitizeUrl(
            `https://hacker-news.firebaseio.com/v0/item/${id}​​​​​.json?print=pretty`
          )
        )
      );
    })
    Promise.all(promises)
      .then((res) => {
        console.log(Object.entries(res));
        setAppState({ loading: false, repos: res})
     
      })
      .catch((err) => console.log(err));
  })
}, []);

if(appState.loading){
  
  return (
    <div className="wsb-div">
      <img src={logo} alt="loading..." />
    </div>
  );
}

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
              <ListLoading
                isLoading={appState.loading}
                repos={arr[1].data}
                idx={idx}
                ß
              />
            );
          })}
      </div>
      <footer>
        <div className="footer">
          Built{" "}
          <span role="img" aria-label="love">
            💚
          </span>{" "}
          with by Naveen Bandarage
        </div>
      </footer>
    </div>
  );
}
export default App;
