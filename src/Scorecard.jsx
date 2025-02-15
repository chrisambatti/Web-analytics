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
    <div className="container-fluid mt-4 " >
      <h2 className="text-center text-light mb-4">Website Analysis Score</h2>
      <div className="row w-100">
        <div className="col-md-6">
          <div className="row">
          {categories.map((category, index) => (
          <div key={index} className="col-sm-6 mb-2" >
            <div className=" shadow text-center p-2 m-auto h-100 m-2 align-items-center" style={{ width: 150, height: 150 }}>
              <h5 className="mb-4 text-capitalize text-white">{category === "seo" ? "SEO" : category === "isMobileResponsive" ? "Mobile Responsive" : category}</h5>
              <CircularProgressbar
                value={score[category] || 0}
                text={category == "isMobileResponsive" ? (score[category] == 100 ? "Yes" : "No" ) :`${score[category] || 0}%`}
                styles={buildStyles({
                  textColor: "#fff",
                  pathColor: getColor(score[category] || 0),
                  trailColor: "#d6d6d6",
                })}
              />
            </div>
          </div>
        ))}
          </div>
        </div>
        
         <div className="mx-auto col-md-4 col-sm-6 mb-4">
            <div className=" text-white shadow text-center p-3" >
              <h5 className="mb-3 text-capitalize">Overall Rating</h5>
              <CircularProgressbar
                value={overallRating || 0}
                text={overallRating+"%" ||  0}
                styles={buildStyles({
                  textColor: "#fff",
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
