// App.js

import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MenuBar from './components/pagecomponents/Menu'
import SentimentAnalyser from "./components/SentimentAnalyser";
import Box from '@mui/material/Box'

const App = () => {
  // State for managing visibility of sentiment analysis and plot components
  const [sentimentVisible, setSentimentVisible] = useState(true); // State for sentiment visibility
  const [plotVisible, setPlotVisible] = useState(true); // State for plot visibility

  // Function to toggle plot visibility
  const setAlPlotVisible = (flag)=>{
    setPlotVisible(flag)
  }

  // Function to toggle sentiment visibility
  const setALSentimentVisible = (flag) =>{
    setSentimentVisible(flag)
  }

  return (
    <Box>
      {/* Menu bar component */}
      <MenuBar setALSentimentVisible={setALSentimentVisible} setAlPlotVisible={setAlPlotVisible} sentimentVisible={sentimentVisible} plotVisible={plotVisible}/>
      
      <div className="App">
        {/* Sentiment analyser component */}
        <SentimentAnalyser  sentimentVisible={sentimentVisible} plotVisible={plotVisible}/>
      </div>
    </Box>
  );
};

export default App;
