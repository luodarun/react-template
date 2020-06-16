/*eslint-disable*/
import React, {
  useState,
  Fragment,
  useRef,
  useEffect,
  useContext
} from 'react';
import './stuLeaveRecord.less';
import stuLeaveRecordColumn from './stuLeaveRecordColumn';
import BaseTable from '@/components/common/BaseTable';
import { findAllSchool } from '@/api/school';
import { getValueAndLabel } from '@/utils/common';
import { findAllClassesBySchoolId } from '@/api/classes';
import {
  getSingleStudentLeaveByID,
  getStudentLeaveListByPage
} from '@/api/stuLeaveRecord';
import { EditFormBaseContext } from '@/components/commonUse/useEditFormBase';
// import {connect} from 'react-redux';
// import { withRouter } from 'react-router-dom'

function stuLeaveRecord(props) {
  const [tableOption, setTableOption] = useState({
    modularName: '学生请假',
    mainKey: 'id',
    scrollY: '430px',
    addButton: false,
    deleteButton: false,
    noSelect: true,
    tempColumns: stuLeaveRecordColumn,
    searchFn: getStudentLeaveListByPage,
    getDetailFn: getSingleStudentLeaveByID
  });
  const { EditFormBaseData, changeData } = useContext(EditFormBaseContext);
  const tableRef = useRef(null);

  useEffect(() => {
    tableOption.tempColumns[0].bindParamOption2 = {
      onChange: a => {
        // findBySchoolId 根据学校获得学校里面的所有职称
        findAllClassesBySchoolId(a).then(res => {
          changeData({
            ...EditFormBaseData,
            forClassArray: getValueAndLabel(res.data, 'id', 'classesName')
          });
        });
      }
    };
    findAllSchool()
      .then(res => {
        tableOption.tempColumns[0].dicData = getValueAndLabel(
          res.data,
          'id',
          'name'
        );
        setTableOption(Object.assign({}, tableOption));
      })
      .catch();
  }, []);

  return (
    <Fragment>
      <div className="stu-leave-record">
        <BaseTable ref={tableRef} {...{ tableOption }} />
      </div>
    </Fragment>
  );
}

export default stuLeaveRecord;
