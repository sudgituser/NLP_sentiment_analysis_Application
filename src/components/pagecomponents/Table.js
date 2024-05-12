import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from "@mui/material/CircularProgress";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// Custom styling for table cell
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'none',
    color: '#B3B9C0',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '0.9rem',
  },
}));

// Custom styling for table row
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'none',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// Customized table component
export default function CustomizedTables({sentiment, confidence, changeClicked}) {
  // Render the customized table
  return (
    <TableContainer component={Box}>
      {/* Title for the table */}
      <Typography variant="subtitle1" sx={{fontFamily:'sans-serif', letterSpacing:'0.02rem'}}><b>Sentiment Result</b></Typography>
      {/* Table component */}
      <Table sx={{ minWidth: 300, color:'#2BCE51', fontSize: '1rem', lineHeight:'2.563rem' }} aria-label="customized table">
        {/* Table header */}
        <TableHead>
          <TableRow>
            <StyledTableCell>TAG</StyledTableCell>
            <StyledTableCell align="left">CONFIDENCE</StyledTableCell>
          </TableRow>
        </TableHead>
        {/* Table body */}
        <TableBody>
          {/* Table row with sentiment and confidence values */}
          <StyledTableRow  sx={{borderBottom:'1px solid #e7eaee'}}>
            {/* TableCell for sentiment value */}
            <StyledTableCell component="th" scope="row">
              {/* Display sentiment value or loading indicator */}
              {sentiment ? sentiment : changeClicked ? <CircularProgress
                  disableShrink
                  size={18}
                  thickness={8}
                  style={{
                    color: "grey",
                    marginRight: "2px",
                    animationDuration: "350ms",
                  }}
                /> : ' '}
            </StyledTableCell>
            {/* TableCell for confidence value */}
            <StyledTableCell align="left" sx={{color:'#2EBF6D', fontFamily:'sans-serif'}}>
              {/* Display confidence value or loading indicator */}
              <b>{confidence ? confidence : changeClicked ? <CircularProgress
                  disableShrink
                  size={18}
                  thickness={8}
                  style={{
                    color: "grey",
                    marginRight: "2px",
                    animationDuration: "350ms",
                  }}
                /> : ' '}</b>
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
