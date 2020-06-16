import React, { useState, Fragment, useEffect, useRef } from 'react';
import './bannerManage.less';
import bannerColumn from './bannerColumn';
import {
  deleteBanner,
  getBannerList,
  releaseBanner,
  saveBanner,
  getBannerById,
} from '@/api/banner';
import { findAllSchool } from '@/api/school';
import { getValueAndLabel } from '@/utils/common';
import BaseTable from '@/components/common/BaseTable';
// import {connect} from 'react-redux';
// import { withRouter } from 'react-router-dom'

function bannerManage() {
  const [tableOption, setTableOption] = useState({
    modularName: 'banner',
    mainKey: 'id',
    searchForm: false,
    tempColumns: bannerColumn,
    searchFn: getBannerList,
    getDetailFn: getBannerById,
    addFn: saveBanner,
    updateFn: saveBanner,
    deleteFn: deleteBanner,
    actionColumnWidth: 200,
    rowClassName: () => 'maxHeight',
    scrollY: '400px',
    actionButtons: [
      {
        name: rowData => (rowData.state === '0' ? '发布' : '取消发布'),
        callbackFn: (text, record) => {
          releaseBanner(record.id, record.state === '0' ? '1' : '0').then(
            () => {
              tableRef.current.doFetch();
            },
          );
        },
      },
      {
        name: '编辑',
        isDisabled: rowData => rowData.state !== '0',
      },
      {
        name: '删除',
      },
    ],
  });

  const tableRef = useRef(null);

  useEffect(() => {
    findAllSchool()
      .then(res => {
        tableOption.tempColumns[0].dicData = getValueAndLabel(
          res.data,
          'id',
          'name',
        );
        setTableOption(Object.assign({}, tableOption));
      })
      .catch();
  }, []);

  return (
    <Fragment>
      <div className="banner-manage">
        <BaseTable ref={tableRef} {...{ tableOption }} />
      </div>
    </Fragment>
  );
}

export default bannerManage;
