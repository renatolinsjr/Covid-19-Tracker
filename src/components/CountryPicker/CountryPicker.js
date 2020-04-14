import React, { useState, useEffect } from 'react';

import { fetchCountries } from '../../api';

import { Select, FormControl, InputLabel } from '@material-ui/core';

import styles from './CountryPicker.module.css';

const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
    }

    fetchAPI();
  }, [setFetchedCountries]);

  return(
    <FormControl variant="outlined" className={styles.formControl}>
      <InputLabel>País</InputLabel>
      <Select native label="País" variant="outlined" defaultValue='' onChange={(e) => handleCountryChange(e.target.value)}>
        <option value="global">Global</option>
        {fetchedCountries.map((country, i) => <option key={i} value={country.originalName}>{country.ptbrName}</option>)}
      </Select>
    </FormControl>
  );
}

export default CountryPicker;