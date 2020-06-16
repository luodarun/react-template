/*eslint-disable*/
import React, { useState, Fragment, useEffect } from 'react';
import './paymentRecord.less';
import paymentRecordColumn from './paymentRecordColumn';
import { findAllSchool } from '@/api/school';
import { getOrderListByPage, getSingleSchoolById } from '@/api/order';
import { getValueAndLabel } from '@/utils/common';
import BaseTable from '@/components/common/BaseTable';
// import {connect} from 'react-redux';
// import { withRouter } from 'react-router-dom'

function paymentRecord (props) {

  const [tableOption, setTableOption] = useState({
    modularName: '支付记录',
    mainKey: 'id',
    showActionButton: false,
    noSelect: true,
    tempColumns: paymentRecordColumn,
    searchFn: getOrderListByPage,
    getDetailFn: getSingleSchoolById,
    actionColumnWidth: 100,
    scrollY: '400px',
    actionButtons: [
      {
        name: '查看'
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
      <div className='payment-record'>
        <BaseTable {...{ tableOption }} />
      </div>
    </Fragment>
  )
}

export default paymentRecord
