import Breadcrumb from 'components/Breadcrumb';
import React from 'react';
import SongAddForm from '../components/SongAddForm';

function AddPage(props) {
  const breadcrumb = [
    { path: '/songs', name: 'Bài hát' },
    { path: '', active: true, name: 'Thêm bài hát' },
  ];

  return (
    <div className="content-wrapper">
      <Breadcrumb routes={breadcrumb} />

      <div className="content-padding">
        <SongAddForm />
      </div>
    </div>
  );
}

AddPage.propTypes = {};

export default AddPage;
