import userAPI from 'api/userAPI';
import Breadcrumb from 'components/Breadcrumb';
import Error from 'components/Error';
import moment from 'moment';
import queryString from 'query-string';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
import { transformDateToString } from 'utils';
import AlbumFilter from '../components/AlbumFilter';
import AlbumTable from '../components/AlbumTable';

const defaultPagination = {
  page: 1,
  perPage: 10,
};

const breadcrumb = [{ path: '', active: true, name: 'Album' }];

function ListPage(props) {
  const history = useHistory();
  const location = useLocation();

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    const { code, type, status, created_from, created_to, used_from, used_to, perPage, page } = params;
    return {
      ...params,
      code: code ? code : undefined,
      type: type ? Number(type) : undefined,
      status: status ? Number(status) : undefined,
      created_from: created_from ? moment(created_from) : undefined,
      created_to: created_to ? moment(created_to) : undefined,
      used_from: used_from ? moment(used_from) : undefined,
      used_to: used_to ? moment(used_to) : undefined,
      perPage: perPage ? Number(perPage) : defaultPagination.perPage,
      page: page ? Number(page) : defaultPagination.page,
    };
  }, [location.search]);

  const handlePageChange = ({ current, pageSize }) => {
    handleFilterChange({ perPage: pageSize, page: current });
  };

  const handleFilterChange = (newFilter) => {
    const filter = {
      ...queryParams,
      ...newFilter,
    };

    // clean data before sync to url
    const dateKeys = ['created_from', 'created_to', 'used_from', 'used_to'];
    dateKeys.forEach((dateKey) => {
      if (filter[dateKey]) {
        filter[dateKey] = transformDateToString(filter[dateKey]);
      }
    });

    // delete page key before sync to url except change page
    if (!newFilter.page) {
      filter.page = defaultPagination.page;
    }

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filter),
    });
  };

  const resetFilter = () => {
    const defaultFilter = {};

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(defaultFilter),
    });
  };

  const { data = {}, isLoading, isError } = useQuery(['albums', queryParams], () => userAPI.getAll(queryParams));
  const pagination = {
    page: queryParams.page,
    perPage: queryParams.perPage,
    total: data.total,
  };
  
  // if (isError) {
  //   return <Error />;
  // }

  return (
    <div className="content-wrapper">
      <Breadcrumb routes={breadcrumb} />

      <div className="content-padding">
        <AlbumFilter filter={queryParams} onFilterChange={handleFilterChange} onResetFilter={resetFilter} />
        <AlbumTable list={data.data} isLoading={isLoading} pagination={pagination} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}

ListPage.propTypes = {};

export default ListPage;
