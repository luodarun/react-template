/*eslint-disable*/
import React, { useState, Fragment, useEffect, useContext } from 'react';
import './curriculumManage.less';
import { findAllSchool } from '@/api/school';
import { getValueAndLabel } from '@/utils/common';
import BaseTable from '@/components/common/BaseTable';
import { findAllClassesBySchoolId } from '@/api/classes';
import { deleteCourse, getCourseById, getCourseList, saveCourse } from '@/api/course';
import curriculumColumn from './curriculumColumn';
import { EditFormBaseContext } from '@/components/commonUse/useEditFormBase';
// import {connect} from 'react-redux';
// import { withRouter } from 'react-router-dom'

function curriculumManage () {
  const [tableOption, setTableOption] = useState({
    modularName: '课程表',
    mainKey: 'id',
    tempColumns: curriculumColumn,
    searchFn: getCourseList,
    getDetailFn: getCourseById,
    addFn: saveCourse,
    updateFn: saveCourse,
    deleteFn: deleteCourse,
    scrollY: '440px',
    beforeAction: (editColumn, type, rowData) => {
      tableOption.tempColumns[5].edit = !!(rowData && rowData.courseDetailList && rowData.courseDetailList.length > 0);
    },
    actionButtons: [
      {
        name: '查看'
      },
      {
        name: '编辑'
      },
      {
        name: '删除'
      }
    ]
  });
  const { EditFormBaseData, changeData } = useContext(EditFormBaseContext);

  useEffect(() => {
    tableOption.tempColumns[0].bindParamOption = {
      'onChange': (a) => { // findBySchoolId 根据学校获得学校里面的所有职称
        findAllClassesBySchoolId(a).then(res => {
          changeData({ ...EditFormBaseData, forClassArray: getValueAndLabel(res.data, 'id', 'classesName') });
        });
      }
    };
    tableOption.tempColumns[0].bindParamOption2 = {
      'onChange': (a) => { // findBySchoolId 根据学校获得学校里面的所有职称
        findAllClassesBySchoolId(a).then(res => {
          changeData({ ...EditFormBaseData, forClassArray2: getValueAndLabel(res.data, 'id', 'classesName') });
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
      <div className='curriculum-manage'>
        <BaseTable {...{ tableOption }} />
      </div>
    </Fragment>
  )
}

export default curriculumManage
