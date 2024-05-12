// SentimentAnalyser.js

import React, { useState, useEffect } from "react";
import "../App.css";
import {
  TextField,
  Paper,
  Typography,
  Stack,
  Container,
  CardHeader,
  Card,
  CardContent,
  Box,
  CssBaseline,
  CardActions,
  Button,
  Divider,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LinearBuffer from "./Linearprogressbar";
import CustomizedTables from "./pagecomponents/Table";
import Plot from "react-plotly.js";

// Define custom theme for Material-UI components
const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            border: "none",
            "&:hover": {
              border: "none",
            },
          },
        },
      },
    },
  },
});

// SentimentAnalyser component for analyzing sentiment and displaying plots
const SentimentAnalyser = ({ sentimentVisible, plotVisible }) => {
  // State variables for managing component state
  const [text, setText] = useState(""); // Input text
  const [sentiment, setSentiment] = useState(""); // Predicted sentiment
  const [confidence, setconfidence] = useState(""); // Confidence score
  const [changeClicked, setChangeclicked] = useState(false); // State to track if analysis button is clicked
  const [loader, setloader] = useState(false); // Loading state

  // State variables for storing plot data
  const [plotData, setPlotData] = useState(null); // Plot data for sentiment distribution
  const [plotDataAL, setPlotDataAL] = useState(null); // Plot data for airline-specific sentiment distribution
  const [plotDataALBar, setPlotDataALBar] = useState(null); // Plot data for airline-specific sentiment comparison

  // Base URL for ngrok server
  const ngRokServerBaseUrl = "https://b066-35-247-55-54.ngrok-free.app";

  // Fetch plot data from ngrok server on component mount
  useEffect(() => {
    async function fetchPlotData() {
      setloader(true);
      const response = await axios.post(
        `${ngRokServerBaseUrl}/plot-data-hist-al-sentiment`,
        {
          sentence: "give me plot",
        }
      );
      setPlotData(response.data);
      console.log("response.data", response);
      setloader(false);
    }

    async function fetchPlotDataAL() {
      setloader(true);
      const response = await axios.post(
        `${ngRokServerBaseUrl}/plot-data-hist-al`,
        {
          sentence: "give me plot",
        }
      );
      setPlotDataAL(response.data);
      console.log("response.data", response);
      setloader(false);
    }

    async function fetchPlotDataALBar() {
      setloader(true);
      const response = await axios.post(
        `${ngRokServerBaseUrl}/plot-data-hist-al-bar`,
        {
          sentence: "give me plot",
        }
      );
      setPlotDataALBar(response.data);
      console.log("response.data", response);
      setloader(false);
    }

    fetchPlotData();
    fetchPlotDataAL();
    fetchPlotDataALBar();
  }, []);

  // Function to handle text input change
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Perform sentiment analysis when analysis button is clicked
  useEffect(() => {
    if (changeClicked) {
      setloader(true);
      setSentiment("");
      setconfidence("");
      const fetchData = async () => {
        try {
          const response = await axios.post(
            `${ngRokServerBaseUrl}/getsentiment`,
            {
              sentence: text,
            }
          );
          setSentiment(response.data.sentiment);
          console.log("sentiment", response.data.sentiment);
          setconfidence(response.data.confidence);
          setloader(false);
          setChangeclicked(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [changeClicked]);

  // Render the sentiment analyser component
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <CssBaseline />
        <Box>
          <Stack direction="column" justifyContent="center" alignItems="center">
            <Box />
            {sentimentVisible && (
              <Card
                sx={{
                  minWidth: "60vw",
                  minHeight: "20vh",
                  mt: plotVisible?"3rem":"5rem",
                  background: "#E2E9FF",
                }}
                elevation={0}
              >
                <CardHeader
                  title={
                    <Typography
                      variant="h4"
                      sx={{
                        fontFamily: "georgia",
                        color: "#008BFF",
                        letterSpacing: "0.03rem",
                      }}
                    >
                      <b>sentiment analyzer playground</b>
                    </Typography>
                  }
                  subheader={
                    <Typography
                      variant="caption"
                      sx={{ fontFamily: "georgia", color: "grey", ml: "10rem" }}
                    >
                      Built by group-41 as part of NLP assignment-2
                    </Typography>
                  }
                  sx={{ ml: "13rem" }}
                ></CardHeader>
                <CardContent>
                  <Paper sx={{ p: "1rem" }}>
                    <Stack direction="row" spacing={2}>
                      {" "}
                      {loader && changeClicked ? (
                        <Box>
                          <LinearBuffer />
                        </Box>
                      ) : (
                        ""
                      )}
                      <Stack direction="column" spacing={1}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontFamily: "sans-serif",
                            letterSpacing: "0.02rem",
                          }}
                        >
                          <b>Test with your text here</b>
                        </Typography>
                        <TextField
                          autoFocus
                          placeholder="Enter or paste your text here"
                          multiline
                          minRows={5}
                          maxRows={5}
                          variant="outlined"
                          fullWidth
                          onChange={handleTextChange}
                          value={text}
                          sx={{
                            minHeight: "100%",
                            width: "25vw",
                          }}
                          InputProps={{
                            style: {
                              border: "none", // Border color
                            },
                          }}
                        />
                      </Stack>
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ height: "23vh" }}
                      />
                      <CustomizedTables
                        sentiment={sentiment}
                        confidence={confidence}
                        changeClicked = {changeClicked}
                      />
                    </Stack>
                  </Paper>
                </CardContent>
                <CardActions sx={{ float: "left" }}>
                  <Button
                    variant="contained"
                    disableRipple
                    onClick={() => {
                      setChangeclicked(true);
                    }}
                    sx={{
                      textTransform: "none",
                      mb: "1rem",
                      mr: "1rem",
                      ml: "0.5rem",
                      bgcolor: "#008BFF",
                      border: "none",
                    }}
                    size="large"
                    startIcon={
                      !loader ? (
                        <TaskAltOutlinedIcon sx={{ color: "white" }} />
                      ) : changeClicked ? (
                        <>
                          <CircularProgress
                            disableShrink
                            size={18}
                            thickness={8}
                            style={{
                              color: "white",
                              marginRight: "2px",
                              animationDuration: "350ms",
                            }}
                          />
                        </>
                      ) : (
                        ""
                      )
                    }
                  >
                    <Typography sx={{ fontFamily: "ui-sans-serif" }}>
                      <b>Analyse</b>
                    </Typography>
                  </Button>
                </CardActions>
              </Card>
            )}
            {plotVisible && (
              <Card
                sx={{ minWidth: "60vw", minHeight: "60vh", marginTop: "3rem", marginBottom:'2rem' }}
              >
                <CardHeader
                  title={
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "georgia",
                        color: "#008BFF",
                        letterSpacing: "0.03rem",
                      }}
                    >
                      <b>Proportion of sentiments</b>
                    </Typography>
                  }
                  subheader={
                    <Typography
                      variant="caption"
                      sx={{ fontFamily: "georgia", color: "grey" }}
                    >
                      This graph displays the proportion of sentiments(positive,
                      negative and neutral) in the dataset w.r.t each airline.<br></br>
                      Built by group-41 as part of NLP assignment-2
                    </Typography>
                  }
                  sx={{ textAlign: "center" }}
                ></CardHeader>
                <CardContent
                  sx={{
                    justifyContent: "center",
                    width: "90vw",
                    height: "120vh",
                  }}
                >
                  <Stack
                    direction="column"
                    spacing={2}
                    sx={{ width: "88vw", height: "100vh" }}
                    ustifyContent="center"
                    alignItems="center"
                  >
                    <Stack
                      direction="row"
                      sx={{ width: "88vw", height: "60vh" }}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box
                        sx={{
                          border: "1px solid grey",
                          marginRight: "2rem",
                          width: "40vw",
                          height: "50vh",
                        }}
                      >
                        {plotData && plotData.data ? (
                          <Plot
                            data={plotData.data}
                            layout={plotData.layout}
                            style={{ width: "39vw", height: "48vh" }}
                          />
                        ) : (
                          <CircularProgress
                            size={40}
                            thickness={6}
                            color="primary"
                            style={{
                              marginTop: "25vh",
                              marginLeft: "20rem",
                              animationDuration: "450ms",
                            }}
                          />
                        )}
                      </Box>
                      <Box
                        sx={{
                          border: "1px solid grey",
                          width: "40vw",
                          height: "50vh",
                        }}
                      >
                        {plotDataAL && plotDataAL.data ? (
                          <Plot
                            data={plotDataAL.data}
                            layout={plotDataAL.layout}
                            style={{ width: "39vw", height: "48vh" }}
                          />
                        ) : (
                          <CircularProgress
                            size={40}
                            thickness={6}
                            color="primary"
                            style={{
                              marginTop: "25vh",
                              marginLeft: "20rem",
                              animationDuration: "450ms",
                            }}
                          />
                        )}
                      </Box>
                    </Stack>
                    <Box
                      sx={{
                        border: "1px solid grey",
                        marginRight: "2rem",
                        width: "82vw",
                        height: "65vh",
                      }}
                      justifyContent="center"
                    >
                      {plotDataALBar && plotDataALBar.data ? (
                        <Plot
                          data={plotDataALBar.data}
                          layout={plotDataALBar.layout}
                          style={{ width: "80vw", height: "55vh" }}
                        />
                      ) : (
                        <CircularProgress
                          size={40}
                          thickness={6}
                          color="primary"
                          style={{
                            marginTop: "25vh",
                            marginLeft: "43rem",
                            animationDuration: "450ms",
                          }}
                        />
                      )}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            )}
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SentimentAnalyser;
