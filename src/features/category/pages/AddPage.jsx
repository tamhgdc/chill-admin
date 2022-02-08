import Breadcrumb from 'components/Breadcrumb';
import React from 'react';
import CategoryAddForm from '../components/CategoryAddForm';

function AddPage(props) {
  const breadcrumb = [
    { path: '/categories', name: 'Thể loại' },
    { path: '', active: true, name: 'Thêm thể loại' },
  ];

  return (
    <div className="content-wrapper">
      <Breadcrumb routes={breadcrumb} />

      <div className="content-padding">
        <CategoryAddForm />
      </div>
    </div>
  );
}

AddPage.propTypes = {};

export default AddPage;
