import React from 'react';

import CountUp from 'react-countup';
import Moment from 'react-moment';

import { CardContent, Typography, Grid, Grow, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Skeleton from '@material-ui/lab/Skeleton';

import { Container } from './styled';

const useStyles = makeStyles({
  card: {
    transition: 'transform ease-in-out 0.2s, opacity 2s ease-in-out !important',
    textAlign: 'center',
    width: '280px',
    height: '151px',
    '&:hover': {
      transform: 'scale(1.1) !important',
    },
    '@media (max-width: 770px)': {
      margin: '0 0 4vh !important',
    }
  },
  confirmed: {
    borderBottom: '10px solid rgba(0, 0, 255, 0.5)',
    background: 'rgba(0, 0, 255, 0.05) !important',
  },
  recovered: {
    borderBottom: '10px solid rgba(0, 255, 0, 0.5)',
    background: 'rgba(0, 255, 0, 0.05) !important',
  },
  deaths: {
    borderBottom: '10px solid rgba(255, 0, 0, 0.5)',
    background: 'rgba(255, 0, 0, 0.05) !important',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  countNumbers: {
    fontSize: '2.5rem',
  }
});

const Cards = ({ data: {confirmed, recovered, deaths, lastUpdate}, loading }) => {
  const classes = useStyles();
  const cards = [
    {
      type: "confirmed",
      title: "CONFIRMADOS",
      countUpValue: loading ? "" : confirmed.value,
    },
    {
      type: "recovered",
      title: "RECUPERADOS",
      countUpValue: loading ? "" : recovered.value,
    },
    {
      type: "deaths",
      title: "ÓBITOS",
      countUpValue: loading ? "" : deaths.value,
    },
  ]
  
  return(
    <Container>
      <Grid container spacing={0} justify="space-evenly">
        {cards.map((card, i) => (
          <Grow key={i} in={true}>
            <Card type={card.type} className={`${classes.card} ${classes[card.type]}`}>
              <CardContent>
                <Typography align="center" variant="h1" color="textSecondary" gutterBottom className={classes.title}>{card.title}</Typography>
                <Typography align="center" variant="h2" gutterBottom className={classes.countNumbers}>
                  {loading ? <Skeleton animation="wave" width={140} height={48} style={{margin: "0 auto"}}/> : <CountUp start={0} end={card.countUpValue} duration={2} separator="." />}         
                </Typography>
                <Typography color="textSecondary" variant="caption" style={{display: "inline"}}>
                  atualizado em: {loading ? <Skeleton style={{display: "inline-flex"}} width={108} animation="wave" /> : <Moment format="DD/MM/YYYY - HH:mm">{lastUpdate}</Moment>}
                </Typography>
              </CardContent>
            </Card>
          </Grow>
        ))}
      </Grid>
    </Container>
  );
}

export default Cards;