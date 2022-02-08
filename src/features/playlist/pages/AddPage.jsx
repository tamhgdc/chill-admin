import Breadcrumb from 'components/Breadcrumb';
import React from 'react';
import PlaylistAddForm from '../components/PlaylistAddForm';

function AddPage(props) {
  const breadcrumb = [
    { path: '/playlists', name: 'Playlist' },
    { path: '', active: true, name: 'Thêm playlist' },
  ];
  return (
    <div className="content-wrapper">
      <Breadcrumb routes={breadcrumb} />

      <div className="content-padding">
        <PlaylistAddForm />
      </div>
    </div>
  );
}

AddPage.propTypes = {};

export default AddPage;
