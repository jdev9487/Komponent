import './App.css';
import { useState } from 'react';
import { MathJax } from "better-react-mathjax";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function App() {
  const [latex, setLatex] = useState(String.raw``);
  const [coord1, setCoord1] = useState('')
  const [coord2, setCoord2] = useState('')
  const [diag1, setDiag1] = useState('')
  const [diag2, setDiag2] = useState('')
  const [identifier, setIdentifier] = useState('')
  const url = 'http://localhost:8000/christoffel';
  const handleCoordChange1 = (e) => {
    setCoord1(e.target.value)
  }
  const handleCoordChange2 = (e) => {
    setCoord2(e.target.value)
  }
  const handleDiagChange1 = (e) => {
    setDiag1(e.target.value)
  }
  const handleDiagChange2 = (e) => {
    setDiag2(e.target.value)
  }
  const handleIdentifierChange = (e) => {
    setIdentifier(e.target.value)
  }
  const handleChristoffel = () => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        "variables": [coord1, coord2],
        "diagonals": [diag1, diag2],
        "matrix_identifier": parseInt(identifier)
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.text())
    .then(res => {
      console.log(res)
      setLatex(String.raw`${res}`)
    })
  }
  return (
    <div className="App">
      <Container>
        <Typography variant="h5" gutterBottom>
          Coordinates
        </Typography>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="coord1" label="0" value={coord1} variant="standard" onChange={handleCoordChange1}/>
          <TextField id="coord2" label="1" value={coord2} variant="standard" onChange={handleCoordChange2}/>
        </Box>
        <Typography variant="h5" gutterBottom>
          Diagonals
        </Typography>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="diag1" label="0,0" value={diag1} variant="standard" onChange={handleDiagChange1} />
          <TextField id="diag2" label="1,1" value={diag2} variant="standard" onChange={handleDiagChange2}/>
        </Box>
        <Typography variant="h5" gutterBottom>
          Matrix Identifier
        </Typography>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="matrix_identifier" value={identifier} variant="standard" onChange={handleIdentifierChange} />
        </Box>
        <Button onClick={handleChristoffel} variant="outlined">Calculate christoffel symbol</Button>
        <MathJax>
          {String.raw`$${latex}$`}
        </MathJax>
      </Container>
    </div>
  );
}

export default App;
