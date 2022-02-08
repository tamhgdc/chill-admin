import Breadcrumb from 'components/Breadcrumb';
import React from 'react';
import AlbumAddForm from '../components/AlbumAddForm';

function AddPage(props) {
  const breadcrumb = [
    { path: '/albums', name: 'Album' },
    { path: '', active: true, name: 'Thêm album' },
  ];

  return (
    <div className="content-wrapper">
      <Breadcrumb routes={breadcrumb} />

      <div className="content-padding">
        <AlbumAddForm />
      </div>
    </div>
  );
}

AddPage.propTypes = {};

export default AddPage;
