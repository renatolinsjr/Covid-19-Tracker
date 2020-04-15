import React, { useState, useEffect } from 'react';

import { fetchData } from './api';

import { Cards, CountryPicker, Chart, Footer } from './components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import styles from './App.module.css';
import coronaLogo from './images/image.png';

const App = () => {
  const [data, setData] = useState({});
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const fetchDataFromApi = async () => {
    try {
      setData(await fetchData());
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  const handleCountryChange = async country => {
    setLoading(true);
    setCountry(country);

    if (country === "global") {
      country = ""
      setCountry("")
    }

    const fetchedData = await fetchData(country);
    setData(fetchedData);
    setLoading(false);
  }

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <img className={styles.image} src={coronaLogo} alt="Corona Vírus Logo"/>
        <Cards data={data} loading={loading}/>
        <CountryPicker handleCountryChange={handleCountryChange} loading={loading} />
        <Chart data={data} country={country} loading={loading}/>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;