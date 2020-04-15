import React from 'react';

import { Typography, Link } from '@material-ui/core/';

const Footer = () => {

  return(
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link target="_blank" rel="noopener" color="primary" href="https://www.linkedin.com/in/renatolinsjr/">
        Renato Lins
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Footer;