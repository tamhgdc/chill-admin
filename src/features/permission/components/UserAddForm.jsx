import { Button, Card, DatePicker, Descriptions, Form, Input, message, Modal, Select } from 'antd';
import permissionAPI from 'api/permissionAPI';
import { DEFAULT_PASSWORD } from 'constants';
import { genderList, roleList, statuses } from 'constants';
import moment from 'moment';
import React from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { requiredLabel } from 'utils';
import { CheckSquareOutlined } from '@ant-design/icons';

function PermissionAddForm() {
  const [form] = Form.useForm();
  const history = useHistory();

  const { mutate, isLoading } = useMutation((data) => permissionAPI.add(data), {
    onError: () => {
      message.error('Thêm người dùng thất bại!');
    },

    onSuccess: () => {
      Modal.confirm({
        icon: <CheckSquareOutlined style={{ color: '#2e7d32' }} />,
        title: 'Thêm người dùng thành công!',
        okText: 'Quay về danh sách',
        cancelText: 'Tạo mới',
        onOk() {
          history.push({
            pathname: '/permission',
          });
          return;
        },
        onCancel() {
          form.resetFields();
        },
      });
    },
  });

  const handleFinish = async (values) => {
    values.password = DEFAULT_PASSWORD;
    values.rePassword = DEFAULT_PASSWORD;
    mutate(values);
  };

  return (
    <Form form={form} onFinish={handleFinish}>
      <Card title="Thêm người dùng">
        <Descriptions column={1} bordered className="feature-form permission-form">
          <Descriptions.Item label={requiredLabel('Họ và tên')}>
            <Form.Item
              className="mb-0"
              name="fullName"
              rules={[{ required: true, message: 'Vui lòng điền tên người dùng' }]}
            >
              <Input placeholder="Họ và tên" />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label={requiredLabel('Email')}>
            <Form.Item
              className="mb-0"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng điền email' },
                {
                  type: 'email',
                  message: 'Vui lòng nhập email hợp lệ',
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
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
            <Form.Item
              name="dateOfBirth"
              className="mb-0"
              rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
            >
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

          <Descriptions.Item label={requiredLabel('Loại người dùng')}>
            <Form.Item
              className="mb-0"
              name="role"
              rules={[{ required: true, message: 'Vui lòng chọn loại người dùng!' }]}
            >
              <Select placeholder="Loại người dùng">
                {roleList.map((role) => (
                  <Select.Option value={role.id}>{role.name}</Select.Option>
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

PermissionAddForm.propTypes = {};

export default PermissionAddForm;
