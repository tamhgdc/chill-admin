import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Descriptions, Form, Input, message, Select, Upload } from 'antd';
import { IMAGE_API_URL } from 'config';
import { genderList, roleList, statuses } from 'constants';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { differentObject, formatDate, requiredLabel } from 'utils';

function PermissionForm({ data = {}, onUpdate }) {
  const [form] = Form.useForm();
  const dataRef = useRef(null);
  const [changedData, setChangedData] = useState({});
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarURL, setAvatarURL] = useState(null);

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
    
    if(payload.code) {
      payload.code = Number(payload.code)
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
        <Descriptions column={1} bordered className="feature-form permission-form">
          <Descriptions.Item label="ID">
            <span>{data._id}</span>
          </Descriptions.Item>

          <Descriptions.Item label={requiredLabel('Tên phân quyền')}>
            <Form.Item
              className="mb-0"
              name="name"
              rules={[{ required: true, message: 'Vui lòng điền tên phân quyền' }]}
            >
              <Input placeholder="Tên phân quyền" />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label={requiredLabel('Mã')}>
            <Form.Item
              className="mb-0"
              name="code"
              rules={[{ required: true, message: 'Vui lòng điền mã'}]}
            >
              <Input placeholder="Mã" />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label={requiredLabel('Trạng thái')}>
            <Form.Item
              className="mb-0"
              name="isActive"
              rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
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

PermissionForm.propTypes = {};

export default PermissionForm;
