import React, { useState, Fragment, useEffect, useContext } from 'react';
import './studentFaceRecord.less';
import studentFaceRecordColumns from './studentFaceRecordColumn';
import { findAllSchool } from '@/api/school';
import { getOrderListByPage } from '@/api/faceRecord';
import { getValueAndLabel } from '@/utils/common';
import BaseTable from '@/components/common/BaseTable';
import { EditFormBaseContext } from '@/components/commonUse/useEditFormBase';
import { findAllClassesBySchoolId } from '@/api/classes';
// import {connect} from 'react-redux';
// import { withRouter } from 'react-router-dom'

function studentFaceRecord() {
  const [tableOption, setTableOption] = useState({
    modularName: '学生人脸识别',
    mainKey: 'id',
    showActionButton: false,
    noSelect: true,
    tempColumns: studentFaceRecordColumns,
    actionColumnWidth: 200,
    searchFn: getOrderListByPage,
    rowClassName: () => 'maxHeight',
    scrollY: '430px',
  });

  const { EditFormBaseData, changeData } = useContext(EditFormBaseContext);
  useEffect(() => {
    tableOption.tempColumns[0].bindParamOption2 = {
      onChange: a => {
        findAllClassesBySchoolId(a).then(res => {
          changeData({
            ...EditFormBaseData,
            forClassArray2: getValueAndLabel(res.data, 'id', 'classesName'),
          });
        });
      },
    };
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
      <div className="student-face-record">
        <BaseTable {...{ tableOption }} />
      </div>
    </Fragment>
  );
}

export default studentFaceRecord;
