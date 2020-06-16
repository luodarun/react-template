import React, { useState, Fragment, useEffect, useMemo } from 'react';
import './resultsManage.less';
import { findAllSchool } from '@/api/school';
import { getValueAndLabel } from '@/utils/common';
import BaseTable from '@/components/common/BaseTable';
import resultsColumn from './resultsColumn';
import examTypeColumn from './examTypeColumn';
import BaseModal from '@/components/common/BaseModal';
import TypeSettingForm from './TypeSettingForm';
import { Row, Col, Form, Input, Button } from 'antd';
// import {connect} from 'react-redux';
// import { withRouter } from 'react-router-dom'

function resultsManage() {
  const [tableOption, setTableOption] = useState({
    modularName: '学生',
    mainKey: 'id',
    scrollY: '400px',
    tempColumns: resultsColumn,
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
  const [examTypeTableOption] = useState({
    modularName: '考试类型',
    mainKey: 'id',
    scrollY: '400px',
    showPagination: false,
    actionButtons: [
      {
        name: '编辑',
      },
      {
        name: '删除',
      },
    ],
    tempColumns: examTypeColumn,
  });
  const [typeSettingFlag, setTypeSettingFlag] = useState(false);
  /*eslint-disable-next-line*/
  const [batchImportVisible, setBatchImportVisible] = useState(false);
  const [examSettingFlag, setExamSettingFlag] = useState(false);
  const [typeSettingForm, setTypeSettingForm] = useState(null);

  const selfEditForm = getFieldDecorator => (
    <div style={{ border: '1px solid #eee' }}>
      <Row>
        <Col>
          <Form.Item label="语文">
            {getFieldDecorator('yw', {
              initialValue: '',
              rules: [
                {
                  type: 'string',
                  required: true,
                  message: '请赋值',
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
    </div>
  );

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

  const tableButton = () => (
    <>
      <Button
        style={{ marginRight: '10px' }}
        type="primary"
        onClick={() => setTypeSettingFlag(true)}
      >
        科目设置
      </Button>
      <Button
        style={{ marginRight: '10px' }}
        type="primary"
        onClick={() => setBatchImportVisible(true)}
      >
        批量导入
      </Button>
      <Button
        style={{ marginRight: '10px' }}
        type="primary"
        onClick={() => setExamSettingFlag(true)}
      >
        考试类型设置
      </Button>
    </>
  );

  const dealHideTypeSetting = type => {
    if (type === 'close') {
      setTypeSettingFlag(false);
    } else {
      typeSettingForm.validateForm((err, values) => {
        /*eslint-disable-next-line*/
        console.log(values);
      });
    }
  };

  const renderTypeSettingForm = () => {
    return (
      <TypeSettingForm
        wrappedComponentRef={i => setTypeSettingForm(i)}
        schoolArray={tableOption.tempColumns[0].dicData}
      />
    );
  };

  const actionRenderTypeSettingForm = useMemo(() => {
    return renderTypeSettingForm();
  }, [tableOption]);

  return (
    <Fragment>
      <div className="results-manage">
        <BaseTable {...{ tableOption, selfEditForm, tableButton }} />
      </div>
      <BaseModal
        modalTitle="科目设置"
        modalVisible={typeSettingFlag}
        hideModal={dealHideTypeSetting}
        noContinue={true}
      >
        {actionRenderTypeSettingForm}
      </BaseModal>
      <BaseModal
        modalTitle="考试类型设置"
        modalVisible={examSettingFlag}
        closable={true}
        hideModal={() => setExamSettingFlag(false)}
        noFooter={true}
      >
        <BaseTable {...{ tableOption: examTypeTableOption }} />
      </BaseModal>
    </Fragment>
  );
}

export default resultsManage;
