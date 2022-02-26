import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import permissionAPI from 'api/permissionAPI';
import CardFilter from 'components/CardFilter';
import { genderList } from 'constants';
import { statuses } from 'constants';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { checkDisableFrom, checkDisableTo } from 'utils';

function UserFilter({ filter, onFilterChange, onResetFilter }) {
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

  const { data: permissionList, isLoading: permissionLoading } = useQuery(
    ['permission'],
    () => permissionAPI.getAll({ limit: 1000, isActive: true }),
    {
      select: (data) => data?.data,
    }
  );

  return (
    <Form form={form} initialValues={filter} onFinish={handleFinish}>
      <CardFilter resetFilter={handleResetFilter}>
        <Row gutter={16} className="justify-content-between">
          <Col span={24}>
            <Row gutter={8} className="d-flex align-items-center flex-wrap">
              <Col span={6}>
                <Form.Item name="q">
                  <Input placeholder="Tên" allowClear />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="email">
                  <Input placeholder="Email" allowClear />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="role">
                  <Select placeholder="Loại người dùng" allowClear>
                    {permissionList &&
                      permissionList.map((role) => (
                        <Select.Option value={Number(role.code)}>{role.name}</Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="gender">
                  <Select placeholder="Giới tính" allowClear>
                    {genderList.map((gender) => (
                      <Select.Option value={gender.id}>{gender.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="isActive">
                  <Select placeholder="Trạng thái" allowClear>
                    {statuses.map((status) => (
                      <Select.Option key={status.id} value={status.id}>
                        {status.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              {/* <Col span={6}>
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
              </Col> */}
            </Row>
          </Col>
        </Row>
      </CardFilter>
    </Form>
  );
}

UserFilter.propTypes = {};

export default UserFilter;
