import React, { useState, useEffect } from 'react';

import { fetchDailyData } from '../../api';

import { Line, Bar } from 'react-chartjs-2';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '65%',
    minHeight: '400px',
    '@media only screen and (max-width: 770px)': {
      width: '100%',
    }
  },
});

const Chart = ({ data: {confirmed, recovered, deaths}, country, loading }) => {
  const classes = useStyles();
  const [dailyData, setDailyData] = useState([]);

  const lineChart = () => {
    if (!dailyData.length) return null;
    return (
      <Line 
        data={{
          labels: dailyData.map(({ date }) => new Intl.DateTimeFormat('pt-BR').format(new Date(date))),
          datasets: [{
            data: dailyData.map(({ confirmed }) => confirmed),
            label: 'Confirmados',
            borderColor: '#3333ff',
            fill: true,
          }, {
            data: dailyData.map(({ deaths }) => deaths),
            label: 'Mortos',
            borderColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          }],
        }}
      />
    );    
  };

  const barChart = () => {
    if (!confirmed) return null;
    return (
      <Bar 
        data={{
          labels: ['Confirmados', 'Curados', 'Óbitos'],
          datasets: [{
            label: 'Pessoas',
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)',
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          }],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: country }
        }}
      />
    )
  }

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, []);

  return( 
    <div className={classes.container}>
      {loading ? <CircularProgress /> : country ? barChart() : lineChart()}
    </div>
  );
}

export default Chart;