import React, { useState, Fragment, useEffect } from 'react';
import './thrExDeclaration.less';
import BaseTable from '@/components/common/BaseTable';
import { getValueAndLabel } from '@/utils/common';
import { findAllSchool } from '@/api/school';
import thrExDeclarationColumn from './thrExDeclarationColumn';
import {
  batchDeleteTeacherDeclare,
  getTeacherDeclareListByPage,
  getTeacherDeclareById,
  saveTeacherDeclare,
} from '@/api/thrAttendance';
// import {connect} from 'react-redux';
// import { withRouter } from 'react-router-dom'

function thrExDeclaration() {
  const [tableOption, setTableOption] = useState({
    modularName: '教师异常申报',
    mainKey: 'id',
    scrollY: '440px',
    searchFn: getTeacherDeclareListByPage,
    getDetailFn: getTeacherDeclareById,
    addFn: saveTeacherDeclare,
    updateFn: saveTeacherDeclare,
    deleteFn: batchDeleteTeacherDeclare,
    tempColumns: thrExDeclarationColumn,
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
      <div className="thr-ex-declaration">
        <BaseTable {...{ tableOption }} />
      </div>
    </Fragment>
  );
}

export default thrExDeclaration;
