import { CheckSquareOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Descriptions, Form, Input, message, Modal, Select, Upload } from 'antd';
import categoryAPI from 'api/categoryAPI';
import { IMAGE_API_URL } from 'config';
import { statuses } from 'constants';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { requiredLabel } from 'utils';

function CategoryAddForm() {
  const [form] = Form.useForm();
  const history = useHistory();
  const [bannerLoading, setBannerLoading] = useState(false);
  const [bannerURL, setBannerURL] = useState(null);

  const { mutate, isLoading } = useMutation((data) => categoryAPI.add(data), {
    onError: () => {
      message.error('Thêm danh mục thất bại!');
    },

    onSuccess: () => {
      Modal.confirm({
        icon: <CheckSquareOutlined style={{ color: '#2e7d32' }} />,
        title: 'Thêm danh mục thành công!',
        okText: 'Quay về danh sách',
        cancelText: 'Tạo mới',
        onOk() {
          history.push({
            pathname: '/categories',
          });
          return;
        },
        onCancel() {
          form.resetFields();
          setBannerURL(null);
        },
      });
    },
  });

  const handleFinish = async (values) => {
    const payload = { ...values };
    if (payload.bannerURL) {
      payload.bannerURL = payload.bannerURL.fileList.slice(-1)[0].response.data.path;
    }
    mutate(payload);
  };

  const uploadButton = (
    <div>
      {bannerLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setBannerLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      const bannerURL = info.file?.response?.data?.path;
      setBannerURL(bannerURL);
      setBannerLoading(false);
    }
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

  return (
    <Form form={form} onFinish={handleFinish}>
      <Card title="Thêm thể loại">
        <Descriptions column={1} bordered className="feature-form user-form">
          <Descriptions.Item label={requiredLabel('Hình ảnh')}>
            <Form.Item
              className="mb-0"
              name="bannerURL"
              rules={[{ required: true, message: 'Vui lòng chọn hình ảnh' }]}
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
                {bannerURL && !bannerLoading ? (
                  <img src={bannerURL} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={requiredLabel('Tên')}>
            <Form.Item className="mb-0" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
              <Input placeholder="Tên" />
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

CategoryAddForm.propTypes = {};

export default CategoryAddForm;
