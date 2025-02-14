import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ScoreCard from "./Scorecard";

function App() {
  
  const [inputs, setInputs] = useState()
  const [score, setScore] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const getScore = () => {
    if (!results || !results.website) return;

    let sum = 0;
    for (let i in results.website) {
      if (["seo", "performance", "accessibility"].includes(i)) {
        sum += results.website[i];
      }
    }
    let percent = sum / 3;
    setScore({ sum, percent });
  };

  const handleSubmit = async ()=>{
    setLoading(true)
    const apiKey = "AIzaSyDalQnbFCoO68x_o1unsfpGR27OWAlFC44"
    try{
      const response = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${inputs}&key=${apiKey}&category=performance&category=accessibility&category=seo`)
      const data = await response.json()
      console.log(data);
      const performance = (data.lighthouseResult.categories.performance?.score ?? 0) * 100;
      const accessibility = (data.lighthouseResult.categories.accessibility?.score ?? 0) * 100;
      const seo = (data.lighthouseResult.categories.seo?.score ?? 0) * 100;
      const isMobileResponsive = data.lighthouseResult.audits?.viewport?.score === 1 ? 100 : 0;
      console.log({ "seo":seo, "performance": performance, "accessibility": accessibility, "isMobileResponsive": isMobileResponsive });
      setResults({ "seo":seo, "performance": performance, "accessibility": accessibility, "isMobileResponsive": isMobileResponsive })
    }
    catch(err){
      console.log("ERROR",err)
    }
    finally{
      setLoading(false)
    }
  }

  // Run getScore whenever results change
  useEffect(() => {
    if (results) {
      getScore();
    }
  }, [results]);

  return (
    <> <img  src="public/logo.png" className="mx-3 mt-3"></img>
      <div className="container mt-5 ">
      {!loading && !results && (
        <div className="container form-container ">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">How Strong Is Your Digital Presence? <br /> Find Out in Seconds!</h1>
              <form onSubmit={handleSubmit}>
                  <div className="mb-3" >
                    <label htmlFor="Website" className="form-label">Website</label>
                    <input
                      type="text"
                      name="website"
                      id="Website"
                      value={inputs}
                      onInput={(e)=>{setInputs(e.target.value)}}
                      placeholder={`https://www.website.com/`}
                      className="form-control"
                    />
                  </div>
                <button type="submit" className="btn btn-primary w-100 .text-info bg-info " >
                  Analyze
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* loading screen */}
      {loading && (
  <div className="d-flex flex-column align-items-center justify-content-center  ">
    <div className="spinner-border text-primary" style={{ width: "4rem", height: "4rem" }} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <p className="text-light mt-3 fs-5 fw-medium">Analyzing... Please wait.</p>
  </div>
)}


      {/* result screen */}
      {results && !loading && (
        <div className="col-md-12 summary-container mt-4">
          <div className="container">
            <ScoreCard score={results} />
            <a href="https://ufbdigitaledge.com/#contact" className="btn btn-primary mx-auto d-block my-2 bg-info ">Boost My Digital health</a>
          </div>
          <footer className="text-center mt-3 text-light">
          © Copyright 2025 <span className="text-info"> UFB Digitaledge </span>
          </footer>
        </div>
        
      )}
      
    </div>
    
    </> 
  )
}

export default App
