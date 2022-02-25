import Breadcrumb from 'components/Breadcrumb'
import React from 'react'
import PermissionAddForm from '../components/PermissionAddForm'

function AddPage(props) {

  const breadcrumb = [
    { path: '/permission', name: 'Người dùng' },
    { path: '', active: true, name: 'Thêm người dùng' },
  ]

  return (
    <div className="content-wrapper">
      <Breadcrumb routes={breadcrumb} />

      <div className="content-padding">
        <PermissionAddForm  />
      </div>
    </div>
  )
}

AddPage.propTypes = {}

export default AddPage
