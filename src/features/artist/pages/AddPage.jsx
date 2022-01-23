import { Form, message, Modal } from 'antd'
import artistAPI from 'api/artistAPI'
import Breadcrumb from 'components/Breadcrumb'
import React from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'
import ArtistForm from '../components/ArtistForm'

function AddPage(props) {
  const [addForm] = Form.useForm()
  const history = useHistory()

  const breadcrumb = [
    { path: '/artists', name: 'Nghệ sỹ' },
    { path: '', active: false, name: 'Thêm nghệ sỹ' },
  ]

  const { mutate, isLoading: createLoading } = useMutation(({ data }) => artistAPI.add(data), {
    onError: () => {
      message.error('Thêm nghệ sỹ thất bại!')
    },

    onSuccess: () => {
      Modal.confirm({
        icon: null,
        title: 'Thêm nghệ sỹ thành công!',
        okText: 'Quay về danh sách',
        cancelText: 'Tạo mới',
        onOk() {
          history.push({
            pathname: '/artists',
          })
          return
        },
        onCancel() {
          addForm.resetFields()
        },
      })
    },
  })

  const handleCreate = (data) => {
    mutate({ data })
  }

  return (
    <div className="content-wrapper">
      <Breadcrumb routes={breadcrumb} />

      <div className="content-padding">
        <ArtistForm form={addForm} createLoading={createLoading} onCreate={handleCreate} />
      </div>
    </div>
  )
}

AddPage.propTypes = {}

export default AddPage
