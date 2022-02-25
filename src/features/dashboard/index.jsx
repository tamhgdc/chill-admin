import React, { Fragment } from 'react';
import SongStatistic from './components/SongStatistic';
import TotalStatistic from './components/TotalStatistic';

function DashBoard(props) {
  return (
    <Fragment>
      <TotalStatistic />
      <SongStatistic />
    </Fragment>
  );
}

DashBoard.propTypes = {};

export default DashBoard;
