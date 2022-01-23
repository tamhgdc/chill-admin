import { Button, Card, Descriptions, Form, Input, Select } from 'antd';
import { statuses } from 'constants';
import React, { useEffect, useRef, useState } from 'react';
import { differentObject, formatDate } from 'utils';

function CategoryForm({ data = {}, onUpdate }) {
  const [form] = Form.useForm();
  const dataRef = useRef(null);
  const [changedData, setChangedData] = useState({});

  useEffect(() => {
    form.setFieldsValue(data);
    dataRef.current = data;
  }, [data]);

  const handleValuesChange = (changedValues, allValues) => {
    const changedValue = differentObject(allValues, dataRef.current);
    setChangedData(changedValue);
  };

  const handleUpdateClick = () => {
    setChangedData({});
    onUpdate(data.id, changedData);
  };

  const handleResetForm = () => {
    form.resetFields();
    setChangedData({});
  };

  return (
    <Form form={form} initialValues={data} onValuesChange={handleValuesChange} onFinish={handleUpdateClick}>
      <Card title="Chi tiết thể loại">
        <Descriptions column={1} bordered className="feature-form category-form">
          <Descriptions.Item label="ID">
            <Form.Item className="mb-0" name="id">
              <Input placeholder="ID" disabled />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Trạng thái">
            <Form.Item
              className="mb-0"
              name="status"
              rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
            >
              <Select placeholder="Trạng thái">
                {statuses.map((status) => (
                  <Select.Option value={status.id}>{status.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Người tạo">
            <span>{data.creator_info?.name}</span>
          </Descriptions.Item>

          <Descriptions.Item label="Thời gian tạo">
            <span>{formatDate(data.created_at)}</span>
          </Descriptions.Item>

          {Object.keys(changedData).length > 0 && (
            <Descriptions.Item>
              <div className="d-flex justify-content-end">
                <Button type="error" className="me-2" onClick={handleResetForm}>
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

CategoryForm.propTypes = {};

export default CategoryForm;
