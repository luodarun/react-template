/*eslint-disable*/
import React, { useState, Fragment, useRef } from 'react';
import './teacherLeaveReview.less';
import BaseTable from '@/components/common/BaseTable';
import {
  batchTeacherLeave,
  approvalTeacherLeave,
  getSingleTeacherLeaveByID,
  getTeacherLeaveListByPage
} from '@/api/teacherLeave';
import teacherLeaveReviewColumn from './teacherLeaveReviewColumn';
import BaseModal from '@/components/common/BaseModal';
import { Input, message } from 'antd';
const { TextArea } = Input;
// import {connect} from 'react-redux';
// import { withRouter } from 'react-router-dom'

function teacherLeaveReview(props) {
  const refuseFn = (text, record) => {
    setRowId(record.id);
    setRefuseReasonVisible(true);
  };
  const agreeFn = (text, record) => {
    approvalTeacherLeave(record.id, '1', '同意').then(() => {
      tableRef.current.doFetch();
    });
  };
  const [refuseReason, setRefuseReason] = useState('');
  const [rowId, setRowId] = useState('');
  const [refuseReasonVisible, setRefuseReasonVisible] = useState(false);
  const [tableOption, setTableOption] = useState({
    modularName: '教师请假',
    mainKey: 'id',
    scrollY: '430px',
    addButton: false,
    tempColumns: teacherLeaveReviewColumn,
    searchFn: getTeacherLeaveListByPage,
    getDetailFn: getSingleTeacherLeaveByID,
    actionColumnWidth: 120,
    actionButtons: [
      {
        name: '同意',
        isDisabled: rowData => rowData.state !== '0',
        callbackFn: agreeFn
      },
      {
        name: '驳回',
        isDisabled: rowData => rowData.state !== '0',
        callbackFn: refuseFn
      }
    ]
  });
  const tableRef = useRef(null);
  const dealHide = selfType => {
    if (selfType === 'close') {
      setRefuseReasonVisible(false);
    } else {
      if (!refuseReason) {
        message.warning('请输入驳回原因！');
        return;
      }
      approvalTeacherLeave(rowId, '2', refuseReason).then(() => {
        setRefuseReasonVisible(false);
        tableRef.current.doFetch();
      });
    }
  };
  return (
    <Fragment>
      <div className="teacher-leave-review">
        <BaseTable ref={tableRef} {...{ tableOption }} />
        <BaseModal
          modalTitle="驳回原因"
          modalVisible={refuseReasonVisible}
          closable={true}
          hideModal={dealHide}
          noContinue={true}
        >
          <TextArea
            placeholder="请输入驳回原因"
            value={refuseReason}
            onChange={val => setRefuseReason(val.target.value)}
            rows={4}
          />
        </BaseModal>
      </div>
    </Fragment>
  );
}

export default teacherLeaveReview;
