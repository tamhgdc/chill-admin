import { Form, message, Modal } from 'antd'
import userAPI from 'api/userAPI'
import Breadcrumb from 'components/Breadcrumb'
import React from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'
import UserForm from '../components/UserForm'

function AddPage(props) {
  const [addForm] = Form.useForm()
  const history = useHistory()

  const breadcrumb = [
    { path: '/users', name: 'Người dùng' },
    { path: '', active: false, name: 'Thêm người dùng' },
  ]

  const { mutate, isLoading: createLoading } = useMutation(({ data }) => userAPI.add(data), {
    onError: () => {
      message.error('Thêm người dùng thất bại!')
    },

    onSuccess: () => {
      Modal.confirm({
        icon: null,
        title: 'Thêm người dùng thành công!',
        okText: 'Quay về danh sách',
        cancelText: 'Tạo mới',
        onOk() {
          history.push({
            pathname: '/users',
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
        <UserForm form={addForm} createLoading={createLoading} onCreate={handleCreate} />
      </div>
    </div>
  )
}

AddPage.propTypes = {}

export default AddPage
