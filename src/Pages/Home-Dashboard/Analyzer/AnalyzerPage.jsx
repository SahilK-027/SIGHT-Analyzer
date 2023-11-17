import React, { useState } from 'react'
import './AnalyzerPage.scss'
import Footer from '../../../components/Footer/Footer'
import Navbar from '../../../components/Navbar/Navbar'
import Dashboard from '../../../components/Dashboard/Dashboard'
import NoAnomaly from '../../../components/NoAnomalyDiv/NoAnomaly'

const AnalyzerPage = ({ user }) => {
  // const analysisHistory = [];
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const analysisHistory = [
    {
      video: "Fight Video",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, quas.",
      TimeStamp: "10 Oct 2023, 5:00pm",
      Analysis: [
        {
          DetectedEvent: "Fight",
          Time: "3min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "7min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "10min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "3min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "7min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "10min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "3min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "7min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "10min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "3min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "7min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "10min 20sec"
        },
      ]
    },
    {
      video: "Fire Video",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, quas.",
      TimeStamp: "11 Oct 2023, 5:00pm",
      Analysis: [
        {
          DetectedEvent: "Fight",
          Time: "3min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "7min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "10min 20sec"
        },
      ]
    },
    {
      video: "Accident Video",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, quas.",
      TimeStamp: "12 Oct 2023, 5:00pm",
      Analysis: [
        {
          DetectedEvent: "Fight",
          Time: "3min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "7min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "10min 20sec"
        },
      ]
    },
    {
      video: "Fight Video 2",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, quas.",
      TimeStamp: "13 Oct 2023, 5:00pm",
      Analysis: [
        {
          DetectedEvent: "Fight",
          Time: "3min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "7min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "10min 20sec"
        },
      ]
    },
    {
      video: "Fight Video 4",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, quas.",
      TimeStamp: "13 Oct 2023, 5:00pm",
      Analysis: [
        {
          DetectedEvent: "Fight",
          Time: "3min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "7min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "10min 20sec"
        },
      ]
    },
    {
      video: "Fight Video 5",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, quas.",
      TimeStamp: "13 Oct 2023, 5:00pm",
      Analysis: [
        {
          DetectedEvent: "Fight",
          Time: "3min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "7min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "10min 20sec"
        },
      ]
    },
    {
      video: "Fight Video 6",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, quas.",
      TimeStamp: "13 Oct 2023, 5:00pm",
      Analysis: [
        {
          DetectedEvent: "Fight",
          Time: "3min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "7min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "10min 20sec"
        },
      ]
    },
    {
      video: "Fight Video 7",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, quas.",
      TimeStamp: "13 Oct 2023, 5:00pm",
      Analysis: [
        {
          DetectedEvent: "Fight",
          Time: "3min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "7min 20sec"
        },
        {
          DetectedEvent: "Fight",
          Time: "10min 20sec"
        },
      ]
    },
  ]

  const handleAnomalyClick = (analysis) => {
    setSelectedAnalysis(analysis);
    setIsModalOpen(true);
  };
  return (
    <div>
      <Navbar user={user} />
      <Dashboard />
      <div className="analysis-container">
        <div>
          <div>
            <h3
              style={{
                fontSize: 18,
                marginBottom: 20,
              }}
            > <i className="fa-regular fa-file-lines"></i> &nbsp; Analyze New Anomaly
            </h3>

            <div className="upload-container card">
              <div className="left">
                <div className="form">
                  <form>
                    <h5 style={{
                      marginBottom: 20
                    }}>Upload a new video</h5>
                    <label> Video Name (unique)*:
                      <input type="text" placeholder='Video file name' />
                    </label>
                    <label> Video Description*:
                      <input type="text" placeholder='Describe the video' />
                    </label>
                    <input type="file" />
                    <button className='start-analysis-button' type="submit">Start Analysis</button>
                  </form>
                </div>
              </div>
              <div className="right">
                <h5>Timestamp Progress</h5>

                <p style={{
                  color: "var(--grey)",
                  textAlign: 'center',
                  width: "80%"
                }}>
                  Click on Start Analysis Button to start processing your video and generate analysis report.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3
              style={{
                fontSize: 18,
                marginBottom: 20,
                marginTop: 50
              }}
            > <i className="fa-regular fa-file-lines"></i> &nbsp; Previous Reports
            </h3>

            <div className='search-bar'>
              <form>
                <input type='text' placeholder='Find an Anomaly with ID ...' />
                <button
                  style={{
                    padding: "6px 10px",
                    background: "var(--blue)",
                    border: 'none',
                    color: 'var(--white)',
                    borderRadius: 6,
                    marginLeft: 8
                  }}
                  type='submit'><i  className="fa-solid fa-magnifying-glass"></i></button>
              </form>
            </div>

            {
              analysisHistory.length
                ?
                <div className="analysis-repo-container">
                  {
                    analysisHistory.map((analysis, id) => (
                      <div key={id} className="analysis-repo">
                        <p className='video-name'><i className="fa-solid fa-file-video"></i> &nbsp; {analysis.video}</p>
                        <p className='video-description'>{analysis.description}</p>
                        <p className='uploaded-on'>Uploaded On: {analysis.TimeStamp}</p>

                        <div className="button-container">
                          <button className='view-analysis-button' onClick={() => handleAnomalyClick(analysis)}>View</button>
                          <button className='delete-analysis-button'>Delete</ button>
                        </div>

                      </div>
                    ))
                  }
                </div>
                :
                (
                  <div className='card' style={{
                    marginTop: 30,
                    padding: 30
                  }}>
                    <NoAnomaly />
                  </div>
                )
            }

            <div className="pagination-btns">
              <button disabled={true}>
                Prev
              </button>

              <span className='page-number-btn'>1/10</span>

              <button>
                Next
              </button>

              <div className="search-page">
                <form>
                  <input style={{
                    background: "var(--bg-color)",
                    border: "1px solid #656e79",
                    padding: "5px 10px",
                    color: "var(--white)",
                    width: "70%",
                    fontSize: 14,
                    borderRadius: 6
                  }} type="text" placeholder='Go to page...' />
                  <button style={{
                    border: "1px solid var(--border-color)",
                    padding: "5px 10px",
                    fontSize: 14,
                    marginLeft: 5
                  }} type='submit'>GO</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h4 style={{ color: "var(--blue)" }}>ID: {selectedAnalysis.video}</h4>
              <p style={{ color: "var(--grey)" }}>Description: {selectedAnalysis.description}</p>
              <p>Uploaded at: {selectedAnalysis.TimeStamp}</p>
              {
                selectedAnalysis.Analysis.map((item, id) => (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexBasis: '5px',
                    margin: 0
                  }} className="analysis">
                    <h6 style={{ margin: 0, padding: 10 }}>🔹 Detected Event: {item.DetectedEvent}</h6>
                    <p style={{ margin: 0, padding: 10 }}> Timestamp: {item.Time}</p>
                  </div>
                ))
              }
              <button className="close-modal-button" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  )
}

export default AnalyzerPage