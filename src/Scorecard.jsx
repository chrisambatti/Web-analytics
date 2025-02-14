import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ScoreCard = ({ score }) => {
    console.log(score);
    
  const categories = ["seo", "performance", "accessibility", "isMobileResponsive"];
  const overallRating = Math.round(
    categories
      .reduce((sum, category) => sum + (score[category] || 0), 0) / 4
  );
  const getColor = (value) => {
    if (value >= 80) return "#4CAF50"; // Green for good
    if (value >= 50) return "#FFC107"; // Yellow for average
    return "#F44336"; // Red for bad
  };

  return (
    <div className="container mt-4 " >
      <h2 className="text-center text-light mb-4">Website Analysis Score</h2>
      <div className="row">
        {categories.map((category, index) => (
          <div key={index} className="col-md-3 col-sm-6 mb-4">
            <div className="card shadow text-center p-3">
              <h5 className="mb-3 text-capitalize">{category === "seo" ? "SEO" : category === "isMobileResponsive" ? "Mobile Responsive" : category}</h5>
              <CircularProgressbar
                value={score[category] || 0}
                text={category == "isMobileResponsive" ? (score[category] == 100 ? "Yes" : "No" ) :`${score[category] || 0}%`}
                styles={buildStyles({
                  textColor: "#000",
                  pathColor: getColor(score[category] || 0),
                  trailColor: "#d6d6d6",
                })}
              />
            </div>
          </div>
        ))}
         <div className="mx-auto col-md-4 col-sm-6 mb-4">
            <div className="card shadow text-center p-3">
              <h5 className="mb-3 text-capitalize">Overall Rating</h5>
              <CircularProgressbar
                value={overallRating || 0}
                text={overallRating+"%" ||  0}
                styles={buildStyles({
                  textColor: "#000",
                  pathColor: getColor(overallRating || 0),
                  trailColor: "#d6d6d6",
                })}
              />
            </div>
          </div>
      </div>
    
    </div>
    
  );
};

export default ScoreCard;
