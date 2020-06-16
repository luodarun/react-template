/*eslint-disable*/
import React, {useState, Fragment, useEffect, useContext, useRef} from 'react';
import './thrAttendance.less';
import BaseTable from '@/components/common/BaseTable';
import thrAttendanceColumn from './thrAttendanceColumn';
import {getValueAndLabel} from '@/utils/common';
import {findAllSchool} from '@/api/school';
import {findTeacherBySchooId} from '@/api/teacher';
import {batchDeleteTeacherSetting, getTeacherAttendanceListByPage, getTeacherSettingById, saveTeacherSetting} from '@/api/thrAttendance';
import {EditFormBaseContext} from '@/components/commonUse/useEditFormBase';
import {Button} from "antd";
// import { withRouter } from 'react-router-dom'

function thrAttendance () {
  const [tableOption, setTableOption] = useState({
    modularName: '教师考勤',
    mainKey: 'id',
    scrollY: '600px',
    beforeAction: () => {
      tableOption.tempColumns[1].edit = true;
    },
    searchFn: getTeacherAttendanceListByPage,
    getDetailFn: getTeacherSettingById,
    addFn: saveTeacherSetting,
    updateFn: saveTeacherSetting,
    deleteFn: batchDeleteTeacherSetting,
    tempColumns: thrAttendanceColumn,
    actionColumnWidth: 150,
    actionButtons: [
      {
        name: '编辑'
      },
      {
        name: '删除'
      }
    ]
  });
  const tableRef = useRef(null);

  const {EditFormBaseData, changeData} = useContext(EditFormBaseContext);

  const tableButton = () => (<><Button style={{marginRight: '10px'}} type="primary" onClick={() => batchAdd()}>批量新增</Button></>);

  const batchAdd = () => {
    tableOption.tempColumns[1].edit = false;
    tableRef.current.addData(true);
  }

  useEffect(() => {
    tableOption.tempColumns[0].bindParamOption2 = {
      'onChange': (a) => {
        findTeacherBySchooId(a).then(res => {
          changeData({...EditFormBaseData, teacherIdArray2: getValueAndLabel(res.data, 'id', 'name')});
        });
      }
    };
    tableOption.tempColumns[0].bindParamOption = {
      'onChange': (a) => {
        findTeacherBySchooId(a).then(res => {
          changeData({...EditFormBaseData, teacherIdArray: getValueAndLabel(res.data, 'id', 'name')});
        });
      }
    };
    findAllSchool().then(res => {
      tableOption.tempColumns[0].dicData = getValueAndLabel(res.data, 'id', 'name');
      setTableOption(Object.assign({}, tableOption));
    }).catch();
  }, []);

  return (
    <Fragment>
      <div className='thr-attendance'>
        <BaseTable {...{tableOption, tableButton}} ref={tableRef} />
      </div>
    </Fragment>
  )
}

export default thrAttendance
