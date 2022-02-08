import Breadcrumb from 'components/Breadcrumb'
import React from 'react'
import UserAddForm from '../components/UserAddForm'

function AddPage(props) {

  const breadcrumb = [
    { path: '/users', name: 'Người dùng' },
    { path: '', active: true, name: 'Thêm người dùng' },
  ]

  return (
    <div className="content-wrapper">
      <Breadcrumb routes={breadcrumb} />

      <div className="content-padding">
        <UserAddForm  />
      </div>
    </div>
  )
}

AddPage.propTypes = {}

export default AddPage
