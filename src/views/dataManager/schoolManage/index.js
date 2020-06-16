import React, { useState, Fragment } from 'react';
import './schoolManage.less';
import BaseTable from '@/components/common/BaseTable';
import { completeColumn } from './schoolColumn';
import {
  getSchoolListByPage,
  updateSchool,
  getSingleSchoolById,
  addSchool,
  batchDeleteSchool,
} from '@/api/school';
// import PropTypes from 'prop-types';
// import {connect} from 'react-redux';
// import { withRouter } from 'react-router-dom'

function schoolManage() {
  const [tableOption] = useState({
    modularName: '校园',
    scrollY: '450px',
    mainKey: 'id',
    tempColumns: completeColumn,
    searchFn: getSchoolListByPage,
    getDetailFn: getSingleSchoolById,
    addFn: addSchool,
    updateFn: updateSchool,
    deleteFn: batchDeleteSchool,
    actionColumnWidth: 150,
    actionButtons: [
      {
        name: '编辑',
      },
      {
        name: '删除',
      },
    ],
  });

  return (
    <Fragment>
      <div className="school-manage">
        <BaseTable {...{ tableOption }} />
      </div>
    </Fragment>
  );
}

export default schoolManage;
