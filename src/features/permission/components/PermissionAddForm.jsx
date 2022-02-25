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
    values.code = Number(values.code);
    mutate(values);
  };

  return (
    <Form form={form} onFinish={handleFinish}>
      <Card title="Thêm phân quyền">
        <Descriptions column={1} bordered className="feature-form permission-form">
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
