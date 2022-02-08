import { CheckSquareOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Descriptions, Form, Input, message, Modal, Select, Upload } from 'antd';
import artistAPI from 'api/artistAPI';
import categoryAPI from 'api/categoryAPI';
import songAPI from 'api/songAPI';
import { IMAGE_API_URL, UPLOAD_SONG_API_URL } from 'config';
import { statuses } from 'constants';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { requiredLabel, unAccent } from 'utils';

function SongAddForm() {
  const [form] = Form.useForm();
  const history = useHistory();
  const [imageLoading, setImageLoading] = useState(false);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [mediaURL, setMediaURL] = useState(null);

  const { data: categoryList = [], isLoading: categoryLoading } = useQuery(
    'categories',
    () => categoryAPI.getAll({ limit: 1000 }),
    {
      select: (value) => value?.data,
    }
  );

  const { data: artistList = [], isLoading: artistLoading } = useQuery(
    'artists',
    () => artistAPI.getAll({ limit: 1000 }),
    {
      select: (value) => value?.data,
    }
  );

  const { mutate, isLoading } = useMutation((data) => songAPI.add(data), {
    onError: () => {
      message.error('Thêm bài hát thất bại!');
    },

    onSuccess: () => {
      Modal.confirm({
        icon: <CheckSquareOutlined style={{ color: '#2e7d32' }} />,
        title: 'Thêm bài hát thành công!',
        okText: 'Quay về danh sách',
        cancelText: 'Tạo mới',
        onOk() {
          history.push({
            pathname: '/songs',
          });
          return;
        },
        onCancel() {
          form.resetFields();
          setImageURL(null);
          setMediaURL(null);
        },
      });
    },
  });

  const handleFinish = async (values) => {
    const payload = { ...values };
    if (payload.imageURL) {
      payload.imageURL = payload.imageURL.fileList.slice(-1)[0].response.data.path;
    }

    if (payload.mediaURL) {
      payload.mediaURL = payload.mediaURL.fileList.slice(-1)[0].response.data.path;
    }
    mutate(payload);
  };

  const uploadButton = (
    <div>
      {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const uploadButtonMedia = (
    <div>
      {mediaLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
  };

  const beforeUploadMedia = (file) => {
    const isVideo = file.type === 'audio/mpeg' || file.type === 'audio/ogg' || file.type === 'audio/wav';
    if (!isVideo) {
      message.error('You can only upload audio file!');
    }

    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('Image must smaller than 10MB!');
    }

    return isVideo && isLt10M;
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setImageLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      const imageURL = info.file?.response?.data?.path;
      setImageURL(imageURL);
      setImageLoading(false);
    }
  };

  const handleChangeMedia = (info) => {
    if (info.file.status === 'uploading') {
      setMediaLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      const mediaURL = info.file?.response?.data?.path;
      setMediaURL(mediaURL);
      setMediaLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={handleFinish}>
      <Card title="Thêm bài hát">
        <Descriptions column={1} bordered className="feature-form user-form">
          <Descriptions.Item label={requiredLabel('Hình ảnh')}>
            <Form.Item className="mb-0" name="imageURL" rules={[{ required: true, message: 'Vui lòng chọn hình ảnh' }]}>
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={`${IMAGE_API_URL}images`}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageURL && !imageLoading ? (
                  <img src={imageURL} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label={requiredLabel('Âm thanh')} className="upload-media">
            <Form.Item className="mb-0" name="mediaURL" rules={[{ required: true, message: 'Vui lòng tải lên âm thanh' }]}>
              <Upload
                name="song"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={`${UPLOAD_SONG_API_URL}upload-song`}
                beforeUpload={beforeUploadMedia}
                onChange={handleChangeMedia}
              >
                {mediaURL && !mediaLoading ? (
                  <audio controls>
                    <source src={mediaURL} type="audio/ogg" />
                  </audio>
                ) : (
                  uploadButtonMedia
                )}
              </Upload>
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label={requiredLabel('Tên')}>
            <Form.Item className="mb-0" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
              <Input placeholder="Tên" />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label={requiredLabel('Nghệ sỹ')}>
            <Form.Item
              className="mb-0"
              name="artistList"
              rules={[{ required: true, message: 'Vui lòng chọn nghệ sỹ' }]}
            >
              <Select
                mode="multiple"
                placeholder="Chọn nghệ sỹ"
                showSearch
                loading={artistLoading}
                filterOption={(input, option) =>
                  unAccent(option.children).toLowerCase().indexOf(unAccent(input.trim()).toLowerCase()) !== -1
                }
              >
                {artistList.map((artist) => (
                  <Select.Option key={artist._id} value={artist._id}>
                    {artist.fullName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label={requiredLabel('Thể loại')}>
            <Form.Item
              className="mb-0"
              name="categoryId"
              rules={[{ required: true, message: 'Vui lòng chọn thể loại' }]}
            >
              <Select
                placeholder="Chọn thể loại"
                showSearch
                loading={categoryLoading}
                filterOption={(input, option) =>
                  unAccent(option.children).toLowerCase().indexOf(unAccent(input.trim()).toLowerCase()) !== -1
                }
              >
                {categoryList.map((category) => (
                  <Select.Option key={category._id} value={category._id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label={requiredLabel('Trạng thái')}>
            <Form.Item
              className="mb-0"
              name="isActive"
              rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
            >
              <Select placeholder="Trạng thái">
                {statuses.map((status) => (
                  <Select.Option value={status.id}>{status.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item>
            <div className="d-flex justify-content-end">
              <Button danger className="me-2" disabled={isLoading}>
                Hủy bỏ
              </Button>
              <Button type="primary" htmlType="submit" disabled={isLoading} loading={isLoading}>
                Thêm
              </Button>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Form>
  );
}

SongAddForm.propTypes = {};

export default SongAddForm;
