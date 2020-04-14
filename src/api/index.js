import axios from 'axios';
import portugueseCountries from '../utils/portugueseCountries.js'

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let countryUrl = url;

  if (country) {
    countryUrl = `${url}/countries/${country}`
  }

  try {
    const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(countryUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (err) {
    console.log(err);
  }
}

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    const modifiedData = data.map(dailyData => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (err) {
    console.log(err);
  }
}

export const fetchCountries = async () => {
  try {
    const { data: { countries } } = await axios.get(`${url}/countries`);

    let countryNames = countries.map((country, i) => {
      return {
        ptbrName: portugueseCountries[i].name,
        originalName: country.name
      }
    });

    return countryNames;
  } catch (err) {
    console.log(err);
  }
}