import React from "react";
import WithListLoading from "./withListLoading";
import "./list.css";
const List = (props) => {
  const { repos, idx } = props;
  return (
    <div>
      <ul key={idx}>
        <li key={repos.id} className="list">
          <span className="repo-text">{repos.title + ": "} </span>
          <span className="repo-description">
            {
              <a href={repos.url} target="_blank">
                {repos.url}
              </a>
            }
          </span>
        </li>
      </ul>
    </div>
  );
};
export default WithListLoading(List);
