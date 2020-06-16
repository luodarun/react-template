import React, { useState, Fragment, useEffect } from 'react';
import './equipmentManage.less';
import BaseTable from '@/components/common/BaseTable';
import equipmentManageColumn from './equipmentManageColumn';
import { getValueAndLabel } from '@/utils/common';
import { findAllSchool } from '@/api/school';
import {
  addEquipment,
  updateEquipment,
  batchDeleteEquipment,
  getSingleEquipmentByID,
  getEquipmentListByPage,
} from '@/api/equipmentManage';
// import {connect} from 'react-redux';
// import { withRouter } from 'react-router-dom'

function equipmentManage() {
  const [tableOption, setTableOption] = useState({
    modularName: '硬件管理',
    mainKey: 'id',
    scrollY: '400px',
    tempColumns: equipmentManageColumn,
    searchFn: getEquipmentListByPage,
    getDetailFn: getSingleEquipmentByID,
    addFn: addEquipment,
    updateFn: updateEquipment,
    deleteFn: batchDeleteEquipment,
    actionColumnWidth: 200,
    actionButtons: [
      {
        name: '查看',
      },
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
      <div className="equipment-manage">
        <BaseTable {...{ tableOption }} />
      </div>
    </Fragment>
  );
}

export default equipmentManage;
