import React, {
  useState,
  Fragment,
  useEffect,
  useContext,
  useRef,
} from 'react';
import './teacherManage.less';
import { completeColumn } from './teacherColumn';
import BaseTable from '@/components/common/BaseTable';
import teacherTitleColumn from './teacherTitleColumn';
import { getValueAndLabel, renderSelect } from '@/utils/common';
import {
  getTeacherListByPage,
  addTeacher,
  batchDeleteTeacher,
  getSingleTeacherById,
  importTeacher,
  findTeacherCountBySchooId,
  updateTeacher,
} from '@/api/teacher';
import {
  getTeacherTitleListByPage,
  addTeacherTitle,
  batchDeleteTeacherTitle,
  getSingleTeacherTitleById,
  findBySchoolId,
  updateTeacherTitle,
} from '@/api/teacherTitle';
import { findAllSchool } from '@/api/school';
import { findAllClassesBySchoolId } from '@/api/classes';
import { Button, message, Select } from 'antd';
import { EditFormBaseContext } from '@/components/commonUse/useEditFormBase';
import BaseUpload from '@/components/common/BaseUpload';
import BaseModal from '@/components/common/BaseModal';
// import {connect} from 'react-redux';
// import { withRouter } from 'react-router-dom'

function teacherManage() {
  const [tableOption, setTableOption] = useState({
    modularName: '教师',
    mainKey: 'id',
    scrollY: '400px',
    tempColumns: completeColumn,
    searchFn: getTeacherListByPage,
    getDetailFn: getSingleTeacherById,
    addFn: addTeacher,
    updateFn: updateTeacher,
    deleteFn: batchDeleteTeacher,
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
  const [teacherTitleTableOption, setTeacherTitleTableOption] = useState({
    modularName: '教师职称',
    mainKey: 'id',
    scrollY: '400px',
    tempColumns: teacherTitleColumn,
    searchFn: getTeacherTitleListByPage,
    getDetailFn: getSingleTeacherTitleById,
    addFn: addTeacherTitle,
    updateFn: updateTeacherTitle,
    deleteFn: batchDeleteTeacherTitle,
    actionColumnWidth: 150,
    actionButtons: [
      {
        name: '编辑',
      },
      {
        name: '删除',
      },
    ],
  });
  const [batchImportVisible, setBatchImportVisible] = useState(false);
  const [changeNumVisible, setChangeNumVisible] = useState(false);
  const [batchExcelFile, setBatchExcelFile] = useState(new FormData());
  const [selectedSchool, setSelectedSchool] = useState('');
  const [allSchools, setAllSchools] = useState([]);
  const { EditFormBaseData, changeData } = useContext(EditFormBaseContext);
  const tableRef = useRef(null);

  const importStudentFile = () => {
    setSelectedSchool('');
    setBatchImportVisible(true);
  };

  const dealBatchImportModalClose = selfType => {
    if (selfType === 'close') {
      setBatchImportVisible(false);
    } else if (selfType === 'confirm') {
      if (batchExcelFile.formData && batchExcelFile.formData.has('file')) {
        importTeacher(selectedSchool, batchExcelFile.formData).then(res => {
          if (res.data.success === '0') {
            let tempStr = res.data.errList
              .map(item => item.errMessage)
              .join(',');
            message.warning('导入失败,原因为' + tempStr);
          } else {
            message.success(`成功导入${res.data.number}条信息`);
            setBatchImportVisible(false);
            tableRef.current.doFetch();
          }
        });
      } else {
        message.warning('请上传文件后再来操作!');
      }
    }
  };

  const tableButton = () => (
    <>
      <Button
        style={{ marginRight: '10px' }}
        type="primary"
        onClick={() => setChangeNumVisible(true)}
      >
        职称设置
      </Button>
      <Button
        style={{ marginRight: '10px' }}
        type="primary"
        onClick={importStudentFile}
      >
        批量导入
      </Button>
    </>
  );

  useEffect(() => {
    tableOption.tempColumns[0].bindParamOption = {
      onChange: a => {
        Promise.all([
          findTeacherCountBySchooId(a),
          findAllClassesBySchoolId(a),
          findBySchoolId(a),
        ]).then(res => {
          changeData({
            ...EditFormBaseData,
            teacherNum: res[0].data,
            mainClassArray: getValueAndLabel(res[1].data, 'id', 'classesName'),
            teacherTitleArray: getValueAndLabel(res[2].data, 'id', 'name'),
          });
        });
      },
    };
    tableOption.tempColumns[0].bindParamOption2 = {
      onChange: a => {
        Promise.all([findAllClassesBySchoolId(a), findBySchoolId(a)]).then(
          res => {
            changeData({
              ...EditFormBaseData,
              mainClassArray2: getValueAndLabel(
                res[0].data,
                'id',
                'classesName',
              ),
              teacherTitleArray2: getValueAndLabel(res[1].data, 'id', 'name'),
            });
          },
        );
      },
    };
    findAllSchool()
      .then(res => {
        tableOption.tempColumns[0].dicData = getValueAndLabel(
          res.data,
          'id',
          'name',
        );
        teacherTitleTableOption.tempColumns[0].dicData = getValueAndLabel(
          res.data,
          'id',
          'name',
        );
        setTableOption(Object.assign({}, tableOption));
        setTeacherTitleTableOption(teacherTitleTableOption);
        setAllSchools(getValueAndLabel(res.data, 'id', 'name'));
      })
      .catch();
  }, []);

  return (
    <Fragment>
      <div className="teacher-manage">
        <BaseTable ref={tableRef} {...{ tableOption, tableButton }} />
      </div>
      <BaseModal
        modalTitle="批量导入上传文件"
        modalVisible={batchImportVisible}
        hideModal={dealBatchImportModalClose}
        noContinue={true}
      >
        <div style={{ display: 'flex' }}>
          <div>
            <span>所属学校：</span>
            <Select
              style={{ width: 200 }}
              value={selectedSchool}
              onChange={a => {
                setSelectedSchool(a);
              }}
            >
              {renderSelect(allSchools)}
            </Select>
          </div>
        </div>
        <div style={{ height: '20px' }}></div>
        <BaseUpload
          acceptType=".xls,.xlsx"
          type="oneFile"
          actionName="上传表格"
          templateURL="上传教师模板.xlsx"
          onChange={setBatchExcelFile}
        />
      </BaseModal>
      <BaseModal
        modalTitle="职称设置"
        modalVisible={changeNumVisible}
        closable={true}
        hideModal={() => setChangeNumVisible(false)}
        noFooter={true}
      >
        <BaseTable {...{ tableOption: teacherTitleTableOption }} />
      </BaseModal>
    </Fragment>
  );
}

export default teacherManage;
