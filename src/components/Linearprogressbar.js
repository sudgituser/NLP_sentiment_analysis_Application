import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

// LinearBuffer component to display linear progress with buffer
export default function LinearBuffer() {
  // State variables for progress and buffer
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  // Ref to hold progress function
  const progressRef = React.useRef(() => {});

  // Effect to update progress and buffer
  React.useEffect(() => {
    // Function to update progress and buffer
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  // Effect to update progress and buffer periodically
  React.useEffect(() => {
    // Interval to update progress and buffer
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    // Cleanup function to clear interval
    return () => {
      clearInterval(timer);
    };
  }, []);

  // Render linear progress with buffer
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
    </Box>
  );
}
