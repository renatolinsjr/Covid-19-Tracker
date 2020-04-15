import React, { useState, useEffect } from 'react';

import { fetchCountries } from '../../api';

import { Select, FormControl, InputLabel, Grow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  input: {
    width: '30%',
    '@media (max-width: 770px)': {
      margin: '0 0 4vh !important',
      gridRow: 2,
      width: '80%',
    }
  },
});

const CountryPicker = ({ handleCountryChange, loading }) => {
  const classes = useStyles();
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
    }

    fetchAPI();
  }, [setFetchedCountries]);

  return(
    <Grow in={true} timeout={2000}>
      <FormControl variant="outlined" className={classes.input}>
        <InputLabel>País</InputLabel>
        <Select native label="País" variant="outlined" defaultValue='' onChange={(e) => handleCountryChange(e.target.value)}>
          <option value="global">Global</option>
          {fetchedCountries.map((country, i) => <option key={i} value={country.originalName}>{country.ptbrName}</option>)}
        </Select>
      </FormControl>
    </Grow>
  );
}

export default CountryPicker;