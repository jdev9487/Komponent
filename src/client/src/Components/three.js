import { Box } from "@mui/material";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { MathJax } from "better-react-mathjax";

function Three(props) {
  const {
    coordinates,
    setCoordinates,
    diagonals,
    setDiagonals,
    latex
  } = props;
  const handleCoordinateChange = (x, e) => {
    setCoordinates(coordinates.map((val, index) => {
      if (index === x) {
        return e.target.value;
      }
      return val
    }))
  }
  const handleDiagonalChange = (x, e) => {
    setDiagonals(diagonals.map((val, index) => {
      if (index === x) {
        return e.target.value;
      }
      return val
    }))
  }
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Typography variant="h5" gutterBottom>
          Coordinates:
        </Typography>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '10ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            key="coord1"
            id="coord1"
            label="1"
            value={coordinates[0]}
            variant="standard"
            onChange={(e) => handleCoordinateChange(0, e)} />
          <TextField
            key="coord2"
            id="coord2"
            label="2"
            value={coordinates[1]}
            variant="standard"
            onChange={(e) => handleCoordinateChange(1, e)} />
          <TextField
            key="coord3"
            id="coord3"
            label="3"
            value={coordinates[2]}
            variant="standard"
            onChange={(e) => handleCoordinateChange(2, e)} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Typography variant="h5" gutterBottom>
          Diagonals: 
        </Typography>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '18ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            key="diag1"
            id="diag1"
            label="1,1"
            value={diagonals[0]}
            variant="standard"
            onChange={(e) => handleDiagonalChange(0, e)} />
          <TextField
            key="diag2"
            id="diag2"
            label="2,2"
            value={diagonals[1]}
            variant="standard"
            onChange={(e) => handleDiagonalChange(1, e)} />
          <TextField
            key="diag3"
            id="diag3"
            label="3,3"
            value={diagonals[2]}
            variant="standard"
            onChange={(e) => handleDiagonalChange(2, e)} />
        </Box>
      </Box>
      <MathJax dynamic>
        {String.raw`$$${latex}$$`}
      </MathJax>
    </Box>
  )
}

export default Three;