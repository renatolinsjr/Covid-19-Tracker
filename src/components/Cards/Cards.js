import React from 'react';

import CountUp from 'react-countup';
import Moment from 'react-moment';
import cx from 'classnames';

import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import styles from './Cards.module.css';

const Cards = ({ data: {confirmed, recovered, deaths, lastUpdate}, loading }) => {

  const cards = [
    {
      styles: styles.infected,
      title: "Confirmados",
      countUpValue: loading ? "" : confirmed.value,
    },
    {
      styles: styles.recovered,
      title: "Recuperados",
      countUpValue: loading ? "" : recovered.value,
    },
    {
      styles: styles.deaths,
      title: "Óbitos",
      countUpValue: loading ? "" : deaths.value,
    },
  ]

  return(
    <div className={styles.container}>
      <Grid container spacing={0} justify="space-evenly">
        {cards.map((card, i) => (
          <Grid key={i} item component={Card} xs={12} md={3} className={cx(styles.card, card.styles)} >
            <CardContent>
              <Typography align="center" color="textSecondary" gutterBottom>{card.title}</Typography>
              <Typography gutterBottom align="center" variant="h5">
                {loading ? <Skeleton animation="wave" width={86} height={27} style={{margin: "0 auto"}}/> : <CountUp start={0} end={card.countUpValue} duration={2} separator="." />}         
              </Typography>
              <Typography color="textSecondary" style={{display: "inline"}}>
                Atualizado em: {loading ? <Skeleton style={{display: "inline-flex"}} width={100} animation="wave" /> : <Moment format="DD/MM/YYYY">{lastUpdate}</Moment>}
              </Typography>
            </CardContent>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Cards;