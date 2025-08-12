import { useState, useEffect } from 'react'
import './App.css'
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = "https://www.usanpn.org/npn_portal/observations/getSummarizedData.json?&start_date=2021-01-01&end_date=2021-12-10&state=OR&kingdom=Plantae&request_src=rest_test";

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

  return (
    <>
      {loading && (<CircularProgress />)}
      {error && (<Alert severity="error">Error: {error.message}</Alert>)}
    </>
  )
}

export default App
