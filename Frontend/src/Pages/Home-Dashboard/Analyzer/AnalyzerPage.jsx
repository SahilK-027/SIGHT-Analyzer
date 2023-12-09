import React, { useEffect, useState } from 'react'
import './AnalyzerPage.scss'
import Footer from '../../../components/Footer/Footer'
import Navbar from '../../../components/Navbar/Navbar'
import Dashboard from '../../../components/Dashboard/Dashboard'
import NoAnomaly from '../../../components/NoAnomalyDiv/NoAnomaly'
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import axios from 'axios';

function ProgressBar({ progress, estimatedRemainingTime }) {
  const progressBarWidth = `${progress}%`;
  const estimatedTimeText = `Estimated remaining time: ${estimatedRemainingTime}`;

  return (
    <div className="progress-container">
      <h5 style={{ textAlign: 'center', marginBottom: 12 }}>Analyzing your video</h5>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="progress-out">
          <div className="progress-bar" style={{ background: "#7444ff", width: progressBarWidth }}></div>
        </div>
        <p style={{ display: 'flex', alignItems: 'center', width: '20%', justifyContent: 'center' }}>{progress.toFixed(2)}%</p>
      </div>

      <div className="estimated-time">
        {estimatedTimeText}
      </div>
    </div>
  );
}


const AnalyzerPage = ({ user }) => {
  const [selectedAnalysis, setSelectedAnalysis] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [videoName, setVideoName] = useState(null);
  const [videoDescription, setVideoDescription] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progressData, setProgressData] = useState({
    progress: 0,
    estimated_remaining_time: ''
  });


  useEffect(() => {
    const socket = io('http://127.0.0.1:5000');
    socket.on('progress_update', (data) => {
      setProgressData(data);
    });
    window.addEventListener('beforeunload', handleRefresh);

    setAnalysisHistory(user.upload_video_list);

    return () => {
      socket.disconnect();
      window.removeEventListener('beforeunload', handleRefresh);
    };
  }, [])

  const handleAnomalyClick = (analysis) => {
    setSelectedAnalysis(analysis);
    setIsModalOpen(true);
  };

  const handleRefresh = () => {
    handleStop();
  };

  const handleStop = async () => {
    toast.warning('Refreshing...', {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
    try {
      const response = await axios.get('http://127.0.0.1:5000/stop');
      const data = response.data;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  function getCurrentFormattedTime() {
    const options = {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };

    const formattedTime = new Intl.DateTimeFormat('en-US', options).format(new Date());

    return formattedTime;
  }

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let timeStamp = getCurrentFormattedTime();
    const bodyFormData = new FormData();
    bodyFormData.append('video', videoFile);
    bodyFormData.append('user_mail', user.email);
    bodyFormData.append('video_name', videoName);
    bodyFormData.append('video_description', videoDescription);
    bodyFormData.append('time_stamp', timeStamp);

    setIsAnalyzing(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/analyze', bodyFormData);

      if (response.status === 200) {
        toast.success('Analysis Report Generated', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: 'dark',
        });

        // Clear form data after successful submission
        setVideoName('');
        setVideoDescription('');
      }
      else {
        toast.error('An unexpected error occurred. Please try again later.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: 'dark',
        });
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error(`${error}`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: 'dark',
      });
    }
    finally {
      setIsAnalyzing(false);
      window.location.reload()
    }
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
                  <form onSubmit={handleSubmit}>
                    <h5 style={{
                      marginBottom: 20
                    }}>Upload a new video</h5>
                    <label> Video Name*:
                      <input
                        style={{ color: "white" }}
                        value={videoName}
                        onChange={(e) => setVideoName(e.target.value)}
                        required={true}
                        type="text"
                        placeholder='Video file name'
                      />
                    </label>
                    <label> Video Description*:
                      <input
                        style={{ color: "white" }}
                        value={videoDescription}
                        onChange={(e) => setVideoDescription(e.target.value)}
                        required={true}
                        type="text"
                        placeholder='Describe the video'
                      />
                    </label>
                    <input
                      required={true}
                      accept="video/*"
                      onChange={handleFileChange}
                      type="file"
                    />
                    <button className='start-analysis-button' type="submit">Start Analysis</button>
                  </form>
                </div>
              </div>
              <div className="right">
                {
                  !isAnalyzing
                    ?
                    <>
                      <h5>Timestamp Progress</h5>

                      <p style={{
                        color: "var(--grey)",
                        textAlign: 'center',
                        width: "80%"
                      }}>
                        Click on Start Analysis Button to start processing your video and generate analysis report.
                      </p>
                    </>
                    :
                    <>
                      <ProgressBar progress={progressData.progress} estimatedRemainingTime={progressData.estimated_remaining_time} />

                      <button className='stop' onClick={handleStop}>Stop</button>
                    </>
                }

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
                  type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
              </form>
            </div>

            {
              analysisHistory.length
                ?
                <div className="analysis-repo-container">
                  {
                    analysisHistory.map((analysis, id) => (
                      <div key={id} className="analysis-repo">
                        <p className='video-name'><i className="fa-solid fa-file-video"></i> &nbsp; {analysis.video_name}</p>
                        <p className='video-description'>{analysis.video_description}</p>
                        <p className='uploaded-on'>Uploaded On: {analysis.time_stamp}</p>

                        <div className="button-container">
                          <button className='view-analysis-button'
                            onClick={() => handleAnomalyClick(analysis)}>
                            View
                          </button>
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
          </div>
        </div>
        {
          analysisHistory.length && isModalOpen && selectedAnalysis
            ? (
              <div className='analysis-report'>
                <div className="analysis-content">
                  <h4 style={{ color: "var(--blue)" }}>
                    Video Name: {selectedAnalysis.video_name}
                  </h4>
                  <p style={{ color: "var(--grey)" }}>
                    Description: {selectedAnalysis.video_description}
                  </p>
                  <p>Uploaded at: {selectedAnalysis.time_stamp}</p>

                  <div className="report">
                    {
                      selectedAnalysis.analysis_results.length
                        ?
                        selectedAnalysis.analysis_results.map((anomaly_arr, idx) => (
                          anomaly_arr.map((detection, idx) => (
                            <div className='detection-res-div' key={idx}>
                              <p>Detection No: {idx + 1}</p>
                              <p>Class: {detection.class}</p>
                              <p>Confidence: {detection.confidence}</p>
                              <p>Timestamp: {detection.timestamp} sec</p>
                            </div>
                          ))
                        ))
                        :
                        <div className='detection-res-div'>
                          <p>No Anomaly Detected</p>
                        </div>
                    }

                  </div>

                  <button className="close-analysis-content-button"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )
            : <></>
        }

        <Footer />
      </div>
    </div>
  )
}

export default AnalyzerPage