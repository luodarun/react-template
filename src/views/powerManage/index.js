/*eslint-disable*/
import React,{useState, Fragment, useEffect} from 'react';
import './powerManage.less';
import powerManageColumn from './powerManageColumn';
import {findAllSchool} from '@/api/school';
import {getValueAndLabel} from '@/utils/common';
import {getUserListByPage, getSingleUserByID, updateUser, addUser, batchDeleteTeacher} from '@/api/system';
import BaseTable from '@/components/common/BaseTable';
// import {connect} from 'react-redux';
// import { withRouter } from 'react-router-dom'

function powerManage (props) {

  const [tableOption, setTableOption] = useState({
    modularName: '权限管理',
    mainKey: 'id',
    tempColumns: powerManageColumn,
    searchFn: getUserListByPage,
    getDetailFn: getSingleUserByID,
    addFn: addUser,
    updateFn: updateUser,
    deleteFn: batchDeleteTeacher,
    scrollY: '400px',
    actionColumnWidth: 120,
    actionButtons: [
      {
        name: '编辑'
      },
      {
        name: '删除'
      }
    ]
  });

  useEffect(() => {
    findAllSchool().then(res => {
      tableOption.tempColumns[0].dicData = getValueAndLabel(res.data, 'id', 'name');
      setTableOption(Object.assign({}, tableOption));
    }).catch();
  }, []);

  return (
    <Fragment>
      <div className='power-manage'>
        <BaseTable {...{tableOption}} />
      </div>
    </Fragment>
  )
}

export default powerManage
