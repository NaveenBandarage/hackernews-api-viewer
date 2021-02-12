import React from "react";
import "./list.css";
import { motion } from "framer-motion"

const List = (props) => {
  const { repos, idx } = props;
  return (
      <motion.div 
      drag
    dragConstraints={{
      top: -50,
      left: -50,
      right: 50,
      bottom: 50,
    }}
      >
      <ul key={idx}>
        <li key={repos.id} className="list">
          <span className="repo-text">{repos.title + ": \n"} </span>
          <span className="repo-description">
            {
              <a href={repos.url} target="_blank">
                {repos.url}
              </a>
            }
          </span>
        </li>
      </ul>
    </motion.div>
  );
};
export default List;
