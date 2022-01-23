import { Breadcrumb as BreadcrumbAntD } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const defaultRoutes = [{ path: '/dashboard', name: 'Trang chủ' }]

function Breadcrumb({ routes }) {
  const renderItems = (routes) => {
    return [...defaultRoutes, ...routes].map((item, index) => {
      if (item.active || item.disabled) {
        return <BreadcrumbAntD.Item key={'item' + index}>{item.name}</BreadcrumbAntD.Item>
      }

      return (
        <BreadcrumbAntD.Item key={'item' + index} className="cursor-pointer">
          <Link to={item.path}>{item.name}</Link>
        </BreadcrumbAntD.Item>
      )
    })
  }

  return <BreadcrumbAntD className="mb-3">{renderItems(routes)}</BreadcrumbAntD>
}

export default Breadcrumb
