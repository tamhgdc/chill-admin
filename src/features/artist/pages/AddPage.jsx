import Breadcrumb from 'components/Breadcrumb'
import React from 'react'
import ArtistAddForm from '../components/ArtistAddForm'

function AddPage(props) {
  const breadcrumb = [
    { path: '/artists', name: 'Ca sĩ' },
    { path: '', active: true, name: 'Thêm ca sĩ' },
  ]


  return (
    <div className="content-wrapper">
      <Breadcrumb routes={breadcrumb} />

      <div className="content-padding">
        <ArtistAddForm />
      </div>
    </div>
  )
}

AddPage.propTypes = {}

export default AddPage
