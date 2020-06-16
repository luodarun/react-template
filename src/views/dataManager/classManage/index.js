import React, { useState, Fragment, useEffect } from 'react';
import './classManage.less';
import BaseTable from '@/components/common/BaseTable';
import { completeColumn } from './classesColumn';
import { getValueAndLabel } from '@/utils/common';
import {
  getClassesListByPage,
  updateClasses,
  getSingleClassesById,
  addClasses,
  batchDeleteClasses,
  importClasses,
} from '@/api/classes';
import { findAllSchool } from '@/api/school';
import ClassesEditForm from './classesEditForm';
// import {connect} from 'react-redux';
// import { withRouter } from 'react-router-dom'

function classManage() {
  const [tableOption, setTableOption] = useState({
    modularName: '班级',
    mainKey: 'id',
    tempColumns: completeColumn,
    searchFn: getClassesListByPage,
    getDetailFn: getSingleClassesById,
    addFn: addClasses,
    updateFn: updateClasses,
    deleteFn: batchDeleteClasses,
    importFn: importClasses,
    actionColumnWidth: 150,
    scrollY: '450px',
    templateURL: '班级模板.xlsx',
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
      <div className="class-manage">
        <BaseTable {...{ tableOption, EditContent: ClassesEditForm }} />
      </div>
    </Fragment>
  );
}

export default classManage;
