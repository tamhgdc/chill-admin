import { CheckSquareOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Descriptions, Form, Input, message, Modal, Select, Upload } from 'antd';
import artistAPI from 'api/artistAPI';
import { IMAGE_API_URL } from 'config';
import { statuses } from 'constants';
import moment from 'moment';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { requiredLabel } from 'utils';

function ArtistAddForm() {
  const [form] = Form.useForm();
  const history = useHistory();
  const [imageLoading, setImageLoading] = useState(false);
  const [bannerLoading, setBannerLoading] = useState(false);
  const [avatarURL, setAvatarURL] = useState(null);
  const [bannerURL, setBannerURL] = useState(null);

  const { mutate, isLoading } = useMutation((data) => artistAPI.add(data), {
    onError: () => {
      message.error('Thêm ca sĩ thất bại!');
    },

    onSuccess: () => {
      Modal.confirm({
        icon: <CheckSquareOutlined style={{ color: '#2e7d32' }} />,
        title: 'Thêm ca sĩ thành công!',
        okText: 'Quay về danh sách',
        cancelText: 'Tạo mới',
        onOk() {
          history.push({
            pathname: '/artists',
          });
          return;
        },
        onCancel() {
          form.resetFields();
          setAvatarURL(null);
          setBannerURL(null);
        },
      });
    },
  });

  const handleFinish = async (values) => {
    const payload = { ...values };
    if (payload.avatarURL) {
      payload.avatarURL = payload.avatarURL.fileList.slice(-1)[0].response.data.path;
    }
    if (payload.bannerURL) {
      payload.bannerURL = payload.bannerURL.fileList.slice(-1)[0].response.data.path;
    }
    mutate(payload);
  };

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

  const beforeUploadBanner = (file) => {
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

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setImageLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      const avatarURL = info.file?.response?.data?.path;
      setAvatarURL(avatarURL);
      setImageLoading(false);
    }
  };

  const handleChangeBanner = (info) => {
    if (info.file.status === 'uploading') {
      setBannerLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      const avatarURL = info.file?.response?.data?.path;
      setBannerURL(avatarURL);
      setBannerLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  );

  const uploadButtonBanner = (
    <div>
      {bannerLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  );

  return (
    <Form form={form} onFinish={handleFinish}>
      <Card title="Thêm ca sĩ">
        <Descriptions column={1} bordered className="feature-form user-form">
          <Descriptions.Item label={requiredLabel('Ảnh đại diện')}>
            <Form.Item
              className="mb-0"
              name="avatarURL"
              rules={[{ required: true, message: 'Vui lòng chọn ảnh đại diện' }]}
            >
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={`${IMAGE_API_URL}images`}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {avatarURL && !imageLoading ? (
                  <img src={avatarURL} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label={requiredLabel('Ảnh bìa')}>
            <Form.Item className="mb-0" name="bannerURL" rules={[{ required: true, message: 'Vui lòng chọn ảnh bìa' }]}>
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={`${IMAGE_API_URL}images`}
                beforeUpload={beforeUploadBanner}
                onChange={handleChangeBanner}
              >
                {bannerURL && !bannerLoading ? (
                  <img src={bannerURL} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButtonBanner
                )}
              </Upload>
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label={requiredLabel('Tên')}>
            <Form.Item className="mb-0" name="fullName" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
              <Input placeholder="Tên" />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label={requiredLabel('Ngày sinh')}>
            <Form.Item name="dateOfBirth" className="mb-0">
              <DatePicker
                disabledDate={(value) => {
                  if (value.valueOf() > moment().valueOf()) {
                    return true;
                  }
                }}
                placeholder="Ngày sinh"
                style={{ display: 'block' }}
                format="DD/MM/YYYY"
                allowClear={false}
                rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
              />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label={requiredLabel('Mô tả')}>
            <Form.Item className="mb-0" name="description" rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}>
              <Input.TextArea placeholder="Mô tả" />
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

ArtistAddForm.propTypes = {};

export default ArtistAddForm;
