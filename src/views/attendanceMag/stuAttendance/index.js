import React, { useState, Fragment, useEffect } from 'react';
import './stuAttendance.less';
import stuAttendanceColumn from './stuAttendanceColumn';
import BaseTable from '@/components/common/BaseTable';
import { getValueAndLabel } from '@/utils/common';
import { findAllSchool } from '@/api/school';
import {
  getStudentAttendanceListByPage,
  saveStudentSetting,
  getStudentSettingById,
  batchDeleteStudent,
} from '@/api/stuAttendance';
// import {connect} from 'react-redux';
// import { withRouter } from 'react-router-dom'

function stuAttendance() {
  const [tableOption, setTableOption] = useState({
    modularName: '学生考勤',
    mainKey: 'id',
    scrollY: '600px',
    searchFn: getStudentAttendanceListByPage,
    getDetailFn: getStudentSettingById,
    addFn: saveStudentSetting,
    updateFn: saveStudentSetting,
    deleteFn: batchDeleteStudent,
    tempColumns: stuAttendanceColumn,
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
      <div className="stu-attendance">
        <BaseTable {...{ tableOption }} />
      </div>
    </Fragment>
  );
}

export default stuAttendance;
