import React, { useState, Fragment, useEffect } from 'react';
import './strangerFaceRecord.less';
import strangerFaceRecordColumn from './strangerFaceRecordColumn';
import { findAllSchool } from '@/api/school';
import { getStangerFaceData } from '@/api/faceRecord';
import { getValueAndLabel } from '@/utils/common';
import BaseTable from '@/components/common/BaseTable';
// import {connect} from 'react-redux';
// import { withRouter } from 'react-router-dom'

function strangerFaceRecord() {
  const [tableOption, setTableOption] = useState({
    modularName: '陌生人人脸识别',
    mainKey: 'id',
    showActionButton: false,
    noSelect: true,
    searchFn: getStangerFaceData,
    tempColumns: strangerFaceRecordColumn,
    actionColumnWidth: 200,
    rowClassName: () => 'maxHeight',
    scrollY: '370px',
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
      <div className="stranger-face-record">
        <BaseTable {...{ tableOption }} />
      </div>
    </Fragment>
  );
}

export default strangerFaceRecord;
