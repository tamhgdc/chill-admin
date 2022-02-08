import Breadcrumb from 'components/Breadcrumb'
import React from 'react'
import ArtistAddForm from '../components/ArtistAddForm'

function AddPage(props) {
  const breadcrumb = [
    { path: '/artists', name: 'Nghệ sỹ' },
    { path: '', active: true, name: 'Thêm nghệ sỹ' },
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
