import { Form, message, Modal } from 'antd'
import songAPI from 'api/songAPI'
import Breadcrumb from 'components/Breadcrumb'
import React from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'
import SongForm from '../components/SongForm'

function AddPage(props) {
  const [addForm] = Form.useForm()
  const history = useHistory()

  const breadcrumb = [
    { path: '/songs', name: 'Bài hát' },
    { path: '', active: false, name: 'Thêm bài hát' },
  ]

  const { mutate, isLoading: createLoading } = useMutation(({ data }) => songAPI.add(data), {
    onError: () => {
      message.error('Thêm bài hát thất bại!')
    },

    onSuccess: () => {
      Modal.confirm({
        icon: null,
        title: 'Thêm bài hát thành công!',
        okText: 'Quay về danh sách',
        cancelText: 'Tạo mới',
        onOk() {
          history.push({
            pathname: '/songs',
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
        <SongForm form={addForm} createLoading={createLoading} onCreate={handleCreate} />
      </div>
    </div>
  )
}

AddPage.propTypes = {}

export default AddPage
