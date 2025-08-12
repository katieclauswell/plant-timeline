import { useState, useEffect } from 'react'
import './App.css'
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = "https://services.usanpn.org/npn_portal/observations/getAllObservationsForSpecies.json?species_id[0]=52&species_id[1]=53&start_date=2008-01-01&end_date=2011-12-31";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(data)

  const renderChart = () => {
    return (
      <ChartContainer
        series={[
          {
            type: 'bar',
            data: [1, 2, 3, 2, 1],
          },
          {
            type: 'line',
            data: [4, 3, 1, 3, 4],
          },
        ]}
        xAxis={[
          {
            data: ['A', 'B', 'C', 'D', 'E'],
            scaleType: 'band',
            id: 'x-axis-id',
            height: 45,
          },
        ]}
      >
        <LinePlot />
        <MarkPlot />
        <ChartsXAxis label="X axis" axisId="x-axis-id" />
      </ChartContainer>
    );
  };

  return (
    <Paper>
      <Typography variant="h4" gutterBottom>
        Plant Timeline
      </Typography>
      {loading && (<CircularProgress />)}
      {error && (<Alert severity="error">Error: {error.message}</Alert>)}
      {data && renderChart()}
    </Paper>
  )
}

export default App
