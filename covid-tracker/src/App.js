import React, { useState, useEffect } from 'react';

import { fetchData } from './api';

import { Cards, CountryPicker, Chart } from './components';

import styles from './App.module.css';
import coronaLogo from './images/image.png';

const App = () => {
  const [data, setData] = useState({});
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);

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
    const fetchedData = await fetchData(country);

    setData(fetchedData);
    setCountry(country);
    setLoading(false);
  }

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return (
    <div className={styles.container}>
      <img className={styles.image} src={coronaLogo} alt="Corona Vírus Logo"/>
      <Cards data={data} loading={loading}/>
      <CountryPicker handleCountryChange={handleCountryChange} loading={loading} />
      <Chart data={data} country={country} loading={loading}/>
    </div>
  );
}

export default App;