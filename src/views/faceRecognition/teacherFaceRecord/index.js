import React, { useState, Fragment, useEffect } from 'react';
import './teacherFaceRecord.less';
import teacherFaceRecordColumn from './teacherFaceRecordColumn';
import { findAllSchool } from '@/api/school';
import { getTeacherFaceData } from '@/api/faceRecord';
import { getValueAndLabel } from '@/utils/common';
import BaseTable from '@/components/common/BaseTable';
// import {connect} from 'react-redux';
// import { withRouter } from 'react-router-dom'

function teacherFaceRecord() {
  const [tableOption, setTableOption] = useState({
    modularName: '教师人脸识别',
    mainKey: 'id',
    showActionButton: false,
    noSelect: true,
    tempColumns: teacherFaceRecordColumn,
    actionColumnWidth: 200,
    searchFn: getTeacherFaceData,
    rowClassName: () => 'maxHeight',
    scrollY: '430px',
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
      <div className="teacher-face-record">
        <BaseTable {...{ tableOption }} />
      </div>
    </Fragment>
  );
}

export default teacherFaceRecord;
