import React, { useState } from "react";
import { AppBar, Toolbar, Typography, FormGroup, FormControlLabel, Switch } from "@mui/material";
import Box from '@mui/material/Box'

// MenuBar component to display the application menu bar
const MenuBar = ({setALSentimentVisible, setAlPlotVisible, sentimentVisible, plotVisible}) => {
  // Function to handle toggle of sentiment visibility
  const handleSentimentToggle = () => {
    setALSentimentVisible(!sentimentVisible);
  };

  // Function to handle toggle of plot visibility
  const handlePlotToggle = () => {
    setAlPlotVisible(!plotVisible);
  };

  // Render the application menu bar
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, letterSpacing:'0.07rem' }}>
          {/* Application title */}
          <b><span style={{color:'#E1F5FE'}}> Sentiment Analyzer</span></b>
        </Typography>
        <Box sx={{ display: "flex", border:'0.5px solid white', pl:'1rem', borderRadius:'1rem' }}>
          {/* Switches for sentiment analysis and plot visualization */}
          <FormGroup sx={{display:'flex', flexDirection:'column'}}>
            {/* Switch for sentiment analysis */}
            <FormControlLabel
              control={
                <Switch
                  checked={sentimentVisible}
                  size="small"
                  onChange={handleSentimentToggle}
                  name="sentimentVisible"
                  color="default"
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#4CAF50", // Green color when switch is on
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#A5D6A7", // Track color when switch is on
                    },
                  }}
                />
              }
              // Label for sentiment analysis switch
              label={<Typography variant="subtitle1" sx={{fontFamily:'ui-sans-serif', letterSpacing:'0.02rem'}}>Realtime Sentiment Analyzer</Typography>}
            />
            {/* Switch for plot visualization */}
            <FormControlLabel
              control={
                <Switch
                  checked={plotVisible}
                  size="small"
                  onChange={handlePlotToggle}
                  name="plotVisible"
                  color="default"
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#4CAF50", // Green color when switch is on
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#A5D6A7", // Track color when switch is on
                    },
                  }}
                />
              }
              // Label for plot visualization switch
              label={<Typography variant="subtitle1" sx={{fontFamily:'ui-sans-serif', letterSpacing:'0.02rem'}}>Airline Sentiments Visualisation</Typography>}
            />
          </FormGroup>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
