import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import CardFilter from 'components/CardFilter';
import { statuses } from 'constants';
import React, { useEffect } from 'react';
import { checkDisableFrom, checkDisableTo } from 'utils';

function PermissionFilter({ filter, onFilterChange, onResetFilter }) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(filter);
  }, [filter]);

  const handleFinish = (values) => {
    onFilterChange(values);
  };

  const handleResetFilter = () => {
    form.setFieldsValue(filter);
    onResetFilter();
  };

  return (
    <Form form={form} initialValues={filter} onFinish={handleFinish}>
      <CardFilter resetFilter={handleResetFilter}>
        <Row gutter={16} className="justify-content-between">
          <Col span={24}>
            <Row gutter={8} className="d-flex align-items-center flex-wrap">
              <Col span={6}>
                <Form.Item className="mb-4" name="id">
                  <Input placeholder="Id" allowClear />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="status">
                  <Select placeholder="Trạng thái" allowClear>
                    {statuses.map((status) => (
                      <Select.Option key={status.id} value={status.id}>
                        {status.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="created_from">
                  <DatePicker
                    format="DD/MM/YYYY"
                    placeholder="Thời gian tạo từ"
                    className="w-100"
                    disabledDate={(value) => checkDisableFrom(value, 'created_to', form)}
                  />
                </Form.Item>
              </Col>
              
              <Col span={6}>
                <Form.Item name="created_to">
                  <DatePicker
                    format="DD/MM/YYYY"
                    placeholder="Thời gian tạo đến"
                    className="w-100"
                    disabledDate={(value) => checkDisableTo(value, 'created_from', form)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </CardFilter>
    </Form>
  );
}

PermissionFilter.propTypes = {};

export default PermissionFilter;
