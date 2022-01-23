import { Form, message, Modal } from 'antd'
import userAPI from 'api/userAPI'
import Breadcrumb from 'components/Breadcrumb'
import React from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'
import AlbumForm from '../components/AlbumForm'

function AddPage(props) {
  const [addForm] = Form.useForm()
  const history = useHistory()

  const breadcrumb = [
    { path: '/albums', name: 'Album' },
    { path: '', active: false, name: 'Thêm album' },
  ]

  const { mutate, isLoading: createLoading } = useMutation(({ data }) => userAPI.add(data), {
    onError: () => {
      message.error('Thêm album thất bại!')
    },

    onSuccess: () => {
      Modal.confirm({
        icon: null,
        title: 'Thêm album thành công!',
        okText: 'Quay về danh sách',
        cancelText: 'Tạo mới',
        onOk() {
          history.push({
            pathname: '/albums',
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
        <AlbumForm form={addForm} createLoading={createLoading} onCreate={handleCreate} />
      </div>
    </div>
  )
}

AddPage.propTypes = {}

export default AddPage
