import { Form, message, Modal } from 'antd'
import playlistAPI from 'api/playlistAPI'
import Breadcrumb from 'components/Breadcrumb'
import React from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'
import PlaylistForm from '../components/PlaylistForm'

function AddPage(props) {
  const [addForm] = Form.useForm()
  const history = useHistory()

  const breadcrumb = [
    { path: '/playlists', name: 'Playlist' },
    { path: '', active: true, name: 'Thêm playlist' },
  ]

  const { mutate, isLoading: createLoading } = useMutation(({ data }) => playlistAPI.add(data), {
    onError: () => {
      message.error('Thêm playlist thất bại!')
    },

    onSuccess: () => {
      Modal.confirm({
        icon: null,
        title: 'Thêm playlist thành công!',
        okText: 'Quay về danh sách',
        cancelText: 'Tạo mới',
        onOk() {
          history.push({
            pathname: '/playlists',
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
        <PlaylistForm form={addForm} createLoading={createLoading} onCreate={handleCreate} />
      </div>
    </div>
  )
}

AddPage.propTypes = {}

export default AddPage
