import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import artistAPI from 'api/artistAPI';
import categoryAPI from 'api/categoryAPI';
import CardFilter from 'components/CardFilter';
import { statuses } from 'constants';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { checkDisableFrom, checkDisableTo, unAccent } from 'utils';

function AlbumFilter({ filter, onFilterChange, onResetFilter }) {
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


  const { data: categoryList = [] } = useQuery('categories', () => categoryAPI.getAll({ limit: 1000 }), {
    select: (value) => value?.data,
  });

  const { data: artistList = [], isLoading: artistLoading } = useQuery(
    'artists',
    () => artistAPI.getAll({ limit: 1000 }),
    {
      select: (value) => value?.data,
    }
  );

  return (
    <Form form={form} initialValues={filter} onFinish={handleFinish}>
      <CardFilter resetFilter={handleResetFilter}>
        <Row gutter={16} className="justify-content-between">
          <Col span={24}>
            <Row gutter={8} className="d-flex align-items-center flex-wrap">
              <Col span={6}>
                <Form.Item className="mb-4" name="q">
                  <Input placeholder="Tên" allowClear />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="artistId">
                  <Select
                    placeholder="Chọn ca sĩ"
                    showSearch
                    allowClear
                    loading={artistLoading}
                    filterOption={(input, option) =>
                      unAccent(option.children).toLowerCase().indexOf(unAccent(input.trim()).toLowerCase()) !== -1
                    }
                  >
                    {artistList &&
                      artistList?.map((artist) => (
                        <Select.Option key={artist._id} value={artist._id}>
                          {artist.fullName}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name="categoryId">
                  <Select
                    placeholder="Chọn thể loại"
                    showSearch
                    allowClear
                    loading={artistLoading}
                    filterOption={(input, option) =>
                      unAccent(option.children).toLowerCase().indexOf(unAccent(input.trim()).toLowerCase()) !== -1
                    }
                  >
                    {categoryList &&
                      categoryList?.map((category) => (
                        <Select.Option key={category._id} value={category._id}>
                          {category.name}
                        </Select.Option>
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

AlbumFilter.propTypes = {};

export default AlbumFilter;
