import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function Footer(props) {
  const year = moment().format('YYYY');

  return <footer>Copyright &copy; {year} thuongnguyen.it78@gmail.com</footer>;
}

Footer.propTypes = {};

export default Footer;
