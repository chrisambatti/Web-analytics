import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ScoreCard from "./Scorecard";

function App() {
  const [inputs, setInputs] = useState("");
  const [score, setScore] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Regex pattern: Only allow "www.xyz.com" format (without https://)
  const domainPattern = /^www\.[a-zA-Z0-9-]+\.(com|io|ai|net|gov|org|in|co.in)$/;

  const validateDomain = (input) => {
    return domainPattern.test(input);
  };

  const getScore = () => {
    if (!results) return;

    let sum = 0;
    for (let i in results) {
      if (["seo", "performance", "accessibility"].includes(i)) {
        sum += results[i];
      }
    }
    let percent = sum / 3;
    setScore({ sum, percent });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateDomain(inputs)) {
      alert("Invalid domain! Please enter in the format: www.example.com");
      return;
    }

    setLoading(true);
    const apiKey = "AIzaSyDalQnbFCoO68x_o1unsfpGR27OWAlFC44";

    try {
      // Send URL to API as is (without https://)
      const response = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://${inputs}&key=${apiKey}&category=performance&category=accessibility&category=seo`
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.lighthouseResult || !data.lighthouseResult.categories) {
        throw new Error("Invalid API response. No categories found.");
      }

      const performance = (data.lighthouseResult.categories.performance?.score ?? 0) * 100;
      const accessibility = (data.lighthouseResult.categories.accessibility?.score ?? 0) * 100;
      const seo = (data.lighthouseResult.categories.seo?.score ?? 0) * 100;
      const isMobileResponsive = data.lighthouseResult.audits?.viewport?.score === 1 ? 100 : 0;

      setResults({ seo, performance, accessibility, isMobileResponsive });
    } catch (err) {
      console.error("ERROR", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (results) {
      getScore();
    }
  }, [results]);

  return (
    <>
      <a href="#">
        <img src="/logo.png" className="mx-3 mt-3" alt="Logo" />
      </a>

      <div className="container-fluid mt-5">
        {!loading && !results && (
          <div className="container-fluid form-container">
            <div className="card shadow">
              <div className="card-body">
                <h1 className="card-title text-center mb-4">
                  How Strong Is Your Digital Presence? <br /> Find Out in Seconds!
                </h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="Website" className="form-label">
                      Website
                    </label>
                    <input
                      type="text"
                      name="website"
                      id="Website"
                      value={inputs}
                      onChange={(e) => setInputs(e.target.value)}
                      placeholder="www.example.com"
                      className="form-control"
                    />
                  </div>
                  <button type="submit" className="btn text-light w-100 text-info bg-info">
                    Analyze
                  </button>
                </form>
                {error && <p className="text-danger mt-2">{error}</p>}
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="spinner-border text-primary" style={{ width: "4rem", height: "4rem" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-light mt-3 fs-5 fw-medium">Analyzing... Please wait.</p>
          </div>
        )}

        {results && !loading && (
          <div className="col-md-12 summary-container mt-4">
            <div className="container text-center">
              <ScoreCard score={results} website={inputs} />

              <div className="d-flex justify-content-center align-items-center gap-3 my-2">
                <a href="https://ufbdigitaledge.com/#contact" className="btn btn-primary bg-info">
                  Boost My Digital Health
                </a>
                <a href="https://ufbdigitaledge.com/" className="text-light text-decoration-none custom-hover">
                  No Thanks, I’m Good with Poor Health
                </a>
              </div>
            </div>
            <footer className="text-center mt-3 text-light">
              © Copyright 2025{" "}
              <a href="https://ufbdigitaledge.com/" className="text-info text-decoration-none">
                {" "}
                UFB Digitaledge{" "}
              </a>
            </footer>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
