import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Descriptions, Form, Input, message, Select, Upload } from 'antd';
import permissionAPI from 'api/permissionAPI';
import { IMAGE_API_URL } from 'config';
import { genderList, roleList, statuses } from 'constants';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { differentObject, formatDate, requiredLabel } from 'utils';

function UserForm({ data = {}, onUpdate }) {
  const [form] = Form.useForm();
  const dataRef = useRef(null);
  const [changedData, setChangedData] = useState({});
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarURL, setAvatarURL] = useState(null);

  const {
    data: permissionList,
    isLoading: permissionLoading,
  } = useQuery(['permission'], () => permissionAPI.getAll({ limit: 1000, isActive: true }), {
    select: (data) => data?.data,
  });


  useEffect(() => {
    setFieldsValue(data);
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    setAvatarURL(data.avatarURL);
  }, [data]);

  const handleValuesChange = (changedValues, allValues) => {
    const changedValue = differentObject(allValues, dataRef.current);
    if (changedValues.dateOfBirth && moment(changedValues.dateOfBirth).isSame(dataRef.current.dateOfBirth)) {
      delete changedValue.dateOfBirth;
    }
    setChangedData(changedValue);
  };

  const handleUpdateClick = () => {
    const payload = { ...changedData };
    setChangedData({});
    if (payload.avatarURL) {
      payload.avatarURL = payload.avatarURL.fileList.slice(-1)[0].response.data.path;
    }
    onUpdate(data._id, payload);
  };

  const handleResetForm = () => {
    setFieldsValue(data);
    setChangedData({});
    setAvatarURL(data.avatarURL);
  };

  const uploadButton = (
    <div>
      {avatarLoading ? <LoadingOutlined /> : <PlusOutlined />}
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

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setAvatarLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      const avatarURL = info.file?.response?.data?.path;
      setAvatarURL(avatarURL);
      setAvatarLoading(false);
    }
  };

  const setFieldsValue = (values) => {
    form.setFieldsValue({ ...values, dateOfBirth: values.dateOfBirth && moment(values.dateOfBirth) });
  };

  return (
    <Form form={form} onValuesChange={handleValuesChange} onFinish={handleUpdateClick}>
      <Card title="Chi tiết người dùng">
        <Descriptions column={1} bordered className="feature-form user-form">
          <Descriptions.Item label="ID">
            <span>{data._id}</span>
          </Descriptions.Item>

          <Descriptions.Item label={requiredLabel('Ảnh đại diện')}>
            <Form.Item className="mb-0" name="avatarURL">
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={`${IMAGE_API_URL}images`}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {avatarURL && !avatarLoading ? (
                  <img src={avatarURL} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label={requiredLabel('Họ và tên')}>
            <Form.Item
              className="mb-0"
              name="fullName"
              rules={[{ required: true, message: 'Vui lòng điền tên người dùng' }]}
            >
              <Input placeholder="Họ và tên" />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Email">
            <span>{data.email}</span>
          </Descriptions.Item>

          <Descriptions.Item label={requiredLabel('Giới tính')}>
            <Form.Item className="mb-0" name="gender" rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}>
              <Select placeholder="Giới tính">
                {genderList.map((gender) => (
                  <Select.Option value={gender.id}>{gender.name}</Select.Option>
                ))}
              </Select>
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
              />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label={requiredLabel('Loại người dùng')}>
            <Form.Item
              className="mb-0"
              name="role"
              rules={[{ required: true, message: 'Vui lòng chọn loại người dùng' }]}
            >
              <Select placeholder="Loại người dùng">
                {permissionList && permissionList.map((role) => (
                  <Select.Option value={Number(role.code)}>{role.name}</Select.Option>
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

          <Descriptions.Item label="Thời gian tạo">
            <span>{formatDate(data.createdAt)}</span>
          </Descriptions.Item>

          <Descriptions.Item label="Thời gian cập nhật">
            <span>{formatDate(data.updatedAt)}</span>
          </Descriptions.Item>

          {Object.keys(changedData).length > 0 && (
            <Descriptions.Item>
              <div className="d-flex justify-content-end">
                <Button danger className="me-2" onClick={handleResetForm}>
                  Hủy bỏ
                </Button>
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
              </div>
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>
    </Form>
  );
}

UserForm.propTypes = {};

export default UserForm;
