import style from 'styled-components/macro';
import { styled } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Grid, Grow } from '@material-ui/core';

// const MyButton = styled(Button)({
//   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//   border: 0,
//   borderRadius: 3,
//   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//   color: 'white',
//   height: 48,
//   padding: '0 30px',
// });

// export default function StyledComponents() {
//   return <MyButton>Styled Components</MyButton>;
// }

const handleBackgroundColorType = type => {
  switch (type) {
    case "confirmed":
      return "rgba(0, 0, 255, 0.05)";
    case "recovered":
      return "rgba(0, 255, 0, 0.05)";
    case "deaths":
      return "rgba(255, 0, 0, 0.05)";
    default:
      return "#fff";
  }
};

const handleBorderColorType = type => {
  switch (type) {
    case "confirmed":
      return "10px solid rgba(0, 0, 255, 0.5)";
    case "recovered":
      return "10px solid rgba(0, 255, 0, 0.5)";
    case "deaths":
      return "10px solid rgba(255, 0, 0, 0.5)";
    default:
      return "#fff";
  }
};

export const Container = style.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CardStyled = styled(Card)({
  transition: 'all ease-in-out 0.2s',
  textAlign: 'center',
  maxWidth: '280px',
  background: ({ type }) => handleBackgroundColorType(type),
  borderBottom: ({ type }) => handleBorderColorType(type),
  '&:hover': {
    transform: 'scale(1.1) !important',
  },
  '@media (max-width: 770px)': {
    margin: '0 0 4vh !important',
  }
});

// export const GridCardStyled = styled(Grid)({
  
// });

// .card:hover {
//   transform: scale(1.1) !important;
// }

// .infected {
//   border-bottom: 10px solid rgba(0, 0, 255, 0.5);
//   background: rgba(0, 0, 255, 0.05) !important;
// }

// .recovered {
//   border-bottom: 10px solid rgba(0, 255, 0, 0.5);
//   background: rgba(0, 255, 0, 0.05) !important;
// }

// .deaths {
//   border-bottom: 10px solid rgba(255, 0, 0, 0.5);
//   background: rgba(255, 0, 0, 0.05) !important;
// }

// h1 {
//   font-size: 1.2rem !important;
// }

// h2 {
//   font-size: 2rem !important;
// }

// @media (max-width: 770px) {
//   .card {
//     margin: 2vh 0 !important;
//   }
// }