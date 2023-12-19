import './App.css';
import { useState } from 'react';
import { MathJax } from "better-react-mathjax";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Two from './Components/two';

function App() {
  const [latex, setLatex] = useState(String.raw``);
  const [coordinates2, setCoordinates2] = useState(["", ""]);
  const [diagonals2, setDiagonals2] = useState(["", ""]);
  const url = 'http://localhost:8000/christoffel';
  const handleChristoffel = () => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        "coordinates": coordinates2,
        "diagonals": diagonals2,
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
          Dimension
        </Typography>
        <Two coordinates={coordinates2} setCoordinates={setCoordinates2} diagonals={diagonals2} setDiagonals={setDiagonals2} />
        <Button onClick={handleChristoffel} variant="outlined">Calculate christoffel symbol</Button>
        <MathJax>
          {String.raw`$$${latex}$$`}
        </MathJax>
      </Container>
    </div>
  );
}

export default App;
