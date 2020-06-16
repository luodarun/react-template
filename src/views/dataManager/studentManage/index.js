import React, {
  useState,
  Fragment,
  useEffect,
  useContext,
  useRef,
} from 'react';
import './studentManage.less';
import BaseTable from '@/components/common/BaseTable';
import { completeColumn } from './studentColumn';
import changeNumColumn from './changeNumColumn';
import { getValueAndLabel, renderSelect } from '@/utils/common';
import {
  getStudentListByPage,
  updateStudent,
  getSingleStudentById,
  addStudent,
  batchDeleteStudent,
  findStudentCountBySchooId,
  importStudent,
  getChangeNumberList,
  getChangeNumberCountByState,
  changeState,
} from '@/api/student';
import { findAllSchool } from '@/api/school';
import { findAllClassesBySchoolId } from '@/api/classes';
import { EditFormBaseContext } from '@/components/commonUse/useEditFormBase';
import { Button, message, Select } from 'antd';
import BaseUpload from '@/components/common/BaseUpload';
import BaseModal from '@/components/common/BaseModal';
import { classTypes } from '@/constant/index';
// import {connect} from 'react-redux';
// import { withRouter } from 'react-router-dom'

function studentManage() {
  const [tableOption, setTableOption] = useState({
    modularName: '学生',
    mainKey: 'id',
    scrollY: '400px',
    tempColumns: completeColumn,
    searchFn: getStudentListByPage,
    getDetailFn: getSingleStudentById,
    addFn: addStudent,
    updateFn: updateStudent,
    deleteFn: batchDeleteStudent,
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
  const [changeNumTableOption, setChangeNumTableOption] = useState({
    modularName: '学生',
    mainKey: 'id',
    scrollY: '400px',
    noSelect: true,
    searchForm: false,
    indexNoFixed: true,
    searchFn: getChangeNumberList,
    showActionButton: false,
    tempColumns: changeNumColumn,
  });
  const [statusObj, setStatusObj] = useState({});
  const [batchImportVisible, setBatchImportVisible] = useState(false);
  const [changeNumVisible, setChangeNumVisible] = useState(false);
  const [batchExcelFile, setBatchExcelFile] = useState(new FormData());
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [allSchools, setAllSchools] = useState([]);
  const { EditFormBaseData, changeData } = useContext(EditFormBaseContext);
  const tableRef = useRef(null);
  const tableRef2 = useRef(null);
  const importStudentFile = () => {
    setSelectedSchool('');
    setSelectedGrade('');
    setBatchImportVisible(true);
  };
  const renderButton = (text, rowData) =>
    text === '1' ? (
      <Button
        type="link"
        onClick={() =>
          changeState(rowData.id).then(() => {
            tableRef2.current.doFetch();
            getChangeNumberCountByState().then(res => {
              setStatusObj(res.data);
            });
          })
        }
      >
        处理
      </Button>
    ) : (
      '已处理'
    );

  const dealBatchImportModalClose = selfType => {
    if (selfType === 'close') {
      setBatchImportVisible(false);
    } else if (selfType === 'confirm') {
      if (
        batchExcelFile.formData &&
        batchExcelFile.formData.has('file') &&
        selectedSchool &&
        selectedGrade
      ) {
        importStudent(
          selectedSchool,
          selectedGrade,
          batchExcelFile.formData,
        ).then(res => {
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
        message.warning('请上传文件且选择学校年级后再来操作!');
      }
    }
  };

  const showNumChange = () => {
    getChangeNumberCountByState().then(res => {
      setStatusObj(res.data);
      setChangeNumVisible(true);
    });
  };

  const tableButton = () => (
    <>
      <Button
        style={{ marginRight: '10px' }}
        type="primary"
        onClick={() => showNumChange()}
      >
        号码变更
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
        findStudentCountBySchooId(a).then(res1 => {
          findAllClassesBySchoolId(a).then(res => {
            changeData({
              ...EditFormBaseData,
              studentNum: res1.data,
              classesIdArray: getValueAndLabel(res.data, 'id', 'classesName'),
            });
          });
        });
      },
    };
    findAllSchool()
      .then(res => {
        tableOption.tempColumns[0].dicData = getValueAndLabel(
          res.data,
          'id',
          'name',
        );
        setTableOption(Object.assign({}, tableOption));
        setAllSchools(getValueAndLabel(res.data, 'id', 'name'));
      })
      .catch();
    changeNumTableOption.tempColumns.push({
      title: '状态',
      dataIndex: 'state',
      overHidden: true,
      render: renderButton,
    });
    setChangeNumTableOption(changeNumTableOption);
  }, []);

  return (
    <Fragment>
      <div className="student-manage">
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
          <div style={{ marginLeft: '30px' }}>
            <span>年级：</span>
            <Select
              style={{ width: 200 }}
              value={selectedGrade}
              onChange={a => {
                setSelectedGrade(a);
              }}
            >
              {renderSelect(classTypes)}
            </Select>
          </div>
        </div>
        <div style={{ height: '20px' }}></div>
        <BaseUpload
          acceptType=".xls,.xlsx"
          type="oneFile"
          actionName="上传表格"
          templateURL="上传学生模板.xlsx"
          onChange={setBatchExcelFile}
        />
      </BaseModal>
      <BaseModal
        modalTitle="号码变更"
        modalVisible={changeNumVisible}
        closable={true}
        hideModal={() => setChangeNumVisible(false)}
        noFooter={true}
      >
        <div className="number-change-div">
          <span>号码变更申请：{statusObj.total}</span>
          <span>已处理：{statusObj.treated}</span>
          <span>未处理：{statusObj.untreated}</span>
        </div>
        <BaseTable ref={tableRef2} {...{ tableOption: changeNumTableOption }} />
      </BaseModal>
    </Fragment>
  );
}

export default studentManage;
