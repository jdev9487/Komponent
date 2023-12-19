import './App.css';
import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Two from './Components/two';
import Three from './Components/three';
import Four from './Components/four';
import { Box } from '@mui/material';

function App() {
  const [latex2, setLatex2] = useState(String.raw``);
  const [latex3, setLatex3] = useState(String.raw``);
  const [latex4, setLatex4] = useState(String.raw``);
  const [dimension, setDimension] = useState(2);
  const [coordinates2, setCoordinates2] = useState(["", ""]);
  const [diagonals2, setDiagonals2] = useState(["", ""]);
  const [coordinates3, setCoordinates3] = useState(["", "", ""]);
  const [diagonals3, setDiagonals3] = useState(["", "", ""]);
  const [coordinates4, setCoordinates4] = useState(["", "", "", ""]);
  const [diagonals4, setDiagonals4] = useState(["", "", "", ""]);
  const url = 'http://localhost:8000/christoffel';
  const handleDimensionChange = (e) => {
    setDimension(parseInt(e.target.value))
  }
  const handleChristoffel = () => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        "coordinates": getChosenCoordinates(),
        "diagonals": getChosenDiagonals()
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.text())
    .then(res => {
      var ltx = String.raw`${res}`
      if (dimension === 2) {
        setLatex2(ltx)
      } else if (dimension === 3) {
        setLatex3(ltx)
      } else {
        setLatex4(ltx)
      }
    })
  }
  const getChosenCoordinates = () => {
    if (dimension === 2) {
      return coordinates2
    } else if (dimension === 3) {
      return coordinates3
    } else {
      return coordinates4
    }
  }
  const getChosenDiagonals = () => {
    if (dimension === 2) {
      return diagonals2
    } else if (dimension === 3) {
      return diagonals3
    } else {
      return diagonals4
    }
  }
  const userInterface = () => {
    if (dimension === 2) {
      return (<Two coordinates={coordinates2} setCoordinates={setCoordinates2} diagonals={diagonals2} setDiagonals={setDiagonals2} latex={latex2}/>)
    } else if (dimension === 3) {
      return (<Three coordinates={coordinates3} setCoordinates={setCoordinates3} diagonals={diagonals3} setDiagonals={setDiagonals3} latex={latex3}/>)
    } else {
      return (<Four coordinates={coordinates4} setCoordinates={setCoordinates4} diagonals={diagonals4} setDiagonals={setDiagonals4} latex={latex4}/>)
    }
  }
  return (
    <div className="App">
      <Container>
        <Typography variant="h5" gutterBottom>
          Dimension
        </Typography>
        <Box sx={{ display : 'flex', justifyContent: 'center'}}>
          <Slider
            sx={{width: 50}}
            size='small'
            value={dimension}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={2}
            max={4}
            onChange={handleDimensionChange}
          />
        </Box>
        <Button onClick={handleChristoffel} variant="outlined">Calculate christoffel symbol</Button>
        {userInterface()}
      </Container>
    </div>
  );
}

export default App;
