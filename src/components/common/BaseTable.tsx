/*eslint-disable*/
import React, {
  memo,
  Fragment,
  useState,
  useMemo,
  useContext,
  forwardRef,
  useImperativeHandle,
  SyntheticEvent,
  ReactNode,
  ReactElement,
} from 'react';
import {
  Table,
  Pagination,
  Button,
  Divider,
  Modal,
  Dropdown,
  Menu,
  Icon,
  message,
} from 'antd';
import BaseSearch from '@/components/common/BaseSearch';
import { EditFormBaseContext } from '@/components/commonUse/useEditFormBase';
import BaseModal from '@/components/common/BaseModal';
import BaseEditForm from '@/components/common/BaseEditForm';
import useGetTableDataApi from '@/components/commonUse/useGetTableDataApi';
import useWinSize from '@/components/commonUse/useWinSize';
import BaseUpload from '@/components/common/BaseUpload';
import { Resizable, ResizeCallbackData } from 'react-resizable';
import { getTestData, getObjType } from '@/utils/common';
import { ascAndDesc } from '@/constant';
import { completeColumn } from '@/views/dataManager/teacherManage/teacherColumn';
const { confirm } = Modal;
interface ResizeableTitleProps {
  onResize: (
    e: SyntheticEvent<Element, Event>,
    data: ResizeCallbackData,
  ) => any;
  width: number;
  [x: string]: any;
}
const ResizeableTitle = (props: ResizeableTitleProps) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

interface BaseTableProps {
  tableOption: tableOption;
  EditContent: (props: {
    rowData: any;
    formItems: Array<completeColumn>;
    selfEditForm: (data: any) => ReactNode;
    wrappedComponentRef: (i: IEditForm) => void;
    isDetail: boolean;
  }) => ReactElement;
  moreButton: ReactNode;
  tableButton: () => ReactNode;
  selfEditForm: (data: any) => ReactNode;
}

interface IEditForm {
  validateForm: (fn: Function) => void;
  resetForm: (names?: string[]) => void;
}

const BaseTable = forwardRef((props: BaseTableProps, ref) => {
  const {
    tableOption,
    EditContent,
    moreButton,
    tableButton,
    selfEditForm,
  } = props;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [batchImportVisible, setBatchImportVisible] = useState<boolean>(false);
  const [batchFile, setBatchFile] = useState<FormData>(new FormData());
  const [type, setType] = useState<string>('详情');
  const [rowData, setRowData] = useState<any>({});
  const [selectedRows, setSelectedRows] = useState<Array<Object>>([]);
  const [editForm, setEditForm] = useState<IEditForm | null>(null);
  const [columns, setColumns] = useState<Array<completeColumn>>(() => {
    // let tempColumns = Object.assign([], tableOption.tempColumns).filter(item => !item.hidden);
    let tempColumns = [];
    if (tableOption.tempColumns && tableOption.tempColumns.length > 0) {
      tableOption.tempColumns.forEach(item => {
        if (!item.render && !item.hidden) {
          if (
            (item.type === 'select' || item.type === 'radio') &&
            item.needAutoRender
          ) {
            item.render = row => {
              let str = null;
              item.dicData &&
                item.dicData.forEach(dicItem => {
                  if (String((dicItem as dicDataObj).value) === String(row)) {
                    str = (dicItem as dicDataObj).label;
                  }
                  if ((dicItem as string) === String(row)) {
                    str = dicItem;
                  }
                });
              return str || row;
            };
          }
        }
        !item.hidden && tempColumns.push(item);
      });
      if (tableOption.actionButtons && tableOption.actionButtons.length > 0) {
        tempColumns.push({
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: tableOption.actionColumnWidth || 200,
          render: (text: string | number | boolean | undefined, record: any) =>
            renderActionColumn(text, record),
        });
      }
      if (tableOption.index !== false) {
        tempColumns.unshift({
          title: '序号',
          dataIndex: 'index',
          fixed: tableOption.indexNoFixed ? null : 'left',
          render: (
            text: string | number | boolean | undefined,
            record: any,
            index2: number,
          ) => index2 + 1,
          width: 80,
        });
      }
    }
    return tempColumns.map((item, index) => {
      return Object.assign({}, item, {
        ellipsis: true,
        onHeaderCell: (column: any) => ({
          width: column.width,
          onResize: handleResize(index),
        }),
        title: item.title || '',
        dataIndex: item.dataIndex || '',
      });
    });
  });
  const { total, loading, dataSource, doFetch } = useGetTableDataApi(
    tableOption.searchFn ||
      (() => getTestData(tableOption.mainKey, tableOption.tempColumns)),
  );

  const { EditFormBaseData, changeData }: any = useContext(EditFormBaseContext);
  const size = useWinSize();

  useImperativeHandle(ref, () => ({
    doFetch,
    selectedRows,
    addData,
  }));

  const changePage = (page: number, pageSize?: number) => {
    doFetch && doFetch({ page, pageSize });
  };

  const changePageSize = (page: number, pageSize: number) => {
    doFetch && doFetch({ page, pageSize });
  };

  const showDetail = (row: any) => {
    if (tableOption.getDetailFn) {
      // 有获取详情方法
      tableOption
        .getDetailFn(row[tableOption.mainKey])
        .then((res: selfRes) => {
          tableOption.beforeAction &&
            tableOption.beforeAction(editColumn, 'detail', res.data);
          setType('详情');
          setModalVisible(true);
          setRowData(res.data);
        })
        .catch();
    } else {
      tableOption.beforeAction &&
        tableOption.beforeAction(editColumn, 'detail', row);
      setType('详情');
      setModalVisible(true);
      setRowData(row);
    }
  };

  const addData = (
    noBeforeAction:
      | boolean
      | undefined
      | React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    // 为true时不执行
    if (typeof noBeforeAction !== 'boolean' || noBeforeAction === false) {
      tableOption.beforeAction && tableOption.beforeAction(editColumn, 'add');
    }
    setType('新增');
    changeData({});
    setModalVisible(true);
    setRowData({});
  };

  const editDetail = (row: any) => {
    if (tableOption.getDetailFn) {
      // 有获取详情方法
      tableOption
        .getDetailFn(row[tableOption.mainKey])
        .then((res: selfRes) => {
          tableOption.beforeAction &&
            tableOption.beforeAction(editColumn, 'edit', res.data);
          setType('编辑');
          setModalVisible(true);
          setRowData(res.data);
        })
        .catch();
    } else {
      tableOption.beforeAction &&
        tableOption.beforeAction(editColumn, 'add', row);
      setType('编辑');
      setModalVisible(true);
      setRowData(row);
    }
  };

  const deleteRow = (row: any) => {
    confirm({
      title: '提示',
      content: '是否删除该数据？',
      onOk() {
        tableOption.deleteFn(row[tableOption.mainKey]).then(() => {
          doFetch && doFetch();
        });
      },
      onCancel() {},
    });
  };

  const batchDelete = () => {
    confirm({
      title: '提示',
      content: '是否删除所选数据？',
      onOk() {
        tableOption
          .deleteFn(
            selectedRows
              .map((item: any) => item[tableOption.mainKey])
              .join(','),
          )
          .then(() => {
            doFetch && doFetch();
          });
      },
      onCancel() {},
    });
  };

  const dealModalClose = (selfType: string) => {
    if (selfType === 'close') {
      setModalVisible(false);
      setRowData({});
    } else if (selfType === 'confirm') {
      editForm &&
        editForm.validateForm((err: Error, values: any) => {
          if (!err) {
            let tempFn: getDataFunc = () => {};
            if (type === '编辑') {
              values.id = rowData[tableOption.mainKey];
              tempFn = tableOption.updateFn;
            } else if (type === '新增') {
              tempFn = tableOption.addFn;
            }
            tempFn(values).then(() => {
              doFetch && doFetch();
              setModalVisible(false);
              setRowData({});
            });
          }
        });
    } else {
      editForm &&
        editForm.validateForm((err: Error, values: any) => {
          if (!err) {
            let tempFn: getDataFunc = () => {};
            if (type === '编辑') {
              values.id = rowData[tableOption.mainKey];
              tempFn = tableOption.updateFn;
            } else if (type === '新增') {
              tempFn = tableOption.addFn;
            }
            tempFn(values).then(() => {
              doFetch && doFetch();
              setType('新增');
              setRowData({});
              editForm && editForm.resetForm();
            });
          }
        });
    }
  };

  const dealBatchImportModalClose = (selfType: string) => {
    if (selfType === 'close') {
      setBatchImportVisible(false);
    } else if (selfType === 'confirm') {
      if (batchFile && batchFile.has('file')) {
        tableOption.importFn &&
          tableOption.importFn(batchFile).then((res: selfRes) => {
            message.info(`成功导入${res.data.number}条信息`);
            setBatchImportVisible(false);
            doFetch && doFetch();
          });
      } else {
        message.warning('请上传文件后再来操作!');
      }
    }
  };

  const renderActionColumn = (
    text: string | number | boolean | undefined,
    record: any,
  ) => {
    const defaultButtonAction: {
      [props: string]: Function;
    } = {
      查看: showDetail,
      编辑: editDetail,
      删除: deleteRow,
    };
    const onClick = ({ key }: { key: string }) => {
      const actionButton = tableOption.actionButtons.find(item => {
        return key === item.name;
      });
      actionButton && actionButton.callbackFn
        ? actionButton.callbackFn(text, record)
        : actionButton &&
          defaultButtonAction[actionButton.name as string](text, record);
    };
    const buttons = tableOption.actionButtons;
    let actionButtons = [];
    if (buttons.length > 3) {
      let menuItems = [];
      for (let i = 0; i < buttons.length; i++) {
        if (i < 2) {
          actionButtons.push(
            <Fragment key={i}>
              <Button
                size="small"
                type="link"
                onClick={
                  buttons[i].callbackFn
                    ? () => buttons[i].callbackFn(text, record)
                    : () =>
                        defaultButtonAction[buttons[i].name as string](
                          text,
                          record,
                        )
                }
              >
                {getObjType(buttons[i].name) === 'string'
                  ? buttons[i].name
                  : (buttons[i].name as (record: any) => string)(record)}
              </Button>
              <Divider type="vertical" />
            </Fragment>,
          );
        } else {
          menuItems.push(
            <Menu.Item key={buttons[i].name as string}>
              <Button size="small" type="link">
                {getObjType(buttons[i].name) === 'string'
                  ? buttons[i].name
                  : (buttons[i].name as (record: any) => string)(record)}
              </Button>
            </Menu.Item>,
          );
        }
      }
      const menu = <Menu onClick={onClick}>{menuItems}</Menu>;
      actionButtons.push(
        <Dropdown key="dropdown" overlay={menu} placement="bottomCenter">
          <span style={{ color: '#1890ff' }} className="ant-dropdown-link">
            更多 <Icon type="down" />
          </span>
        </Dropdown>,
      );
    } else {
      actionButtons = buttons.map((item, index) => {
        if (index === buttons.length - 1) {
          return (
            <Button
              key={index}
              size="small"
              type="link"
              disabled={item.isDisabled ? item.isDisabled(record) : false}
              onClick={
                item.callbackFn
                  ? () => item.callbackFn(text, record)
                  : () => defaultButtonAction[item.name as string](text, record)
              }
            >
              {getObjType(item.name) === 'string'
                ? item.name
                : (item.name as (record: any) => string)(record)}
            </Button>
          );
        } else {
          return (
            <Fragment key={index}>
              <Button
                size="small"
                type="link"
                disabled={item.isDisabled ? item.isDisabled(record) : false}
                onClick={
                  item.callbackFn
                    ? () => item.callbackFn(text, record)
                    : () =>
                        defaultButtonAction[item.name as string](text, record)
                }
              >
                {getObjType(item.name) === 'string'
                  ? item.name
                  : (item.name as (record: any) => string)(record)}
              </Button>
              <Divider type="vertical" />
            </Fragment>
          );
        }
      });
    }
    return actionButtons;
  };

  const wrapSearchFn = (data: any, type: string) => {
    if (type === 'query') {
      // 查询按钮
      // console.log(data, type);
    } else if (type === 'reset') {
      // 重置按钮
      columns.forEach((item: completeColumn) => {
        item.sorter = false;
      });
      setColumns(columns);
    }
    doFetch && doFetch(data);
  };

  const editColumn: Array<completeColumn> = [];

  const handleResize = (index: number) => (
    e: Event,
    {
      size,
    }: {
      size: { height: number; width: number };
    },
  ) => {
    const nextColumns = [...columns];
    nextColumns[index].width = size.width;
    setColumns(nextColumns);
  };

  const batchImport = () => {
    setBatchImportVisible(true);
  };

  tableOption.tempColumns.forEach((item, index) => {
    if (item.edit) {
      editColumn.push(
        Object.assign({}, item, {
          editFormOrder: item.editFormOrder || index + 100,
        }),
      );
    }
  });

  const rowSelection = {
    selectedRowKeys: selectedRows.map(
      (record: any) => record[tableOption.mainKey],
    ),
    onChange: (
      selectedRowKeys: Array<string | number>,
      selectedRows: Array<any>,
    ) => setSelectedRows(selectedRows),
  };

  const components = {
    header: {
      cell: ResizeableTitle,
    },
  };

  const handleTableChange = (pagination: any, filters: any, sorter2: any) => {
    columns.forEach(item => {
      item.sorter = sorter2.columnKey === item.dataIndex && sorter2.order;
    });
    setColumns(columns);
    doFetch &&
      doFetch({
        orderKey: sorter2.field,
        sortType: ascAndDesc[sorter2.order] || '',
      });
  };

  const renderEditForm = () => {
    if (EditContent) {
      return (
        <EditContent
          rowData={rowData}
          formItems={editColumn}
          selfEditForm={selfEditForm}
          wrappedComponentRef={i => setEditForm(i)}
          isDetail={type === '详情'}
        />
      );
    } else {
      return (
        <BaseEditForm
          rowData={rowData}
          isDetail={type === '详情'}
          selfEditForm={selfEditForm}
          wrappedComponentRef={(i: IEditForm) => setEditForm(i)}
          formItems={editColumn}
        />
      );
    }
  };
  const renderSearch = () => {
    let tempArray: Array<completeColumn> = [];
    tableOption.tempColumns.forEach((item, index) => {
      if (item.search) {
        tempArray.push(
          Object.assign({}, item, {
            searchOrder: item.searchOrder || index + 100,
          }),
        );
      }
    });
    function getColumn(): number {
      if (size.width > 1500) {
        return 4;
      } else if (size.width <= 1500 && size.width > 1000) {
        return 3;
      } else {
        return 2;
      }
    }
    const searchOption = {
      column: tableOption.searchColumn || getColumn(),
      itemArray: tempArray,
    };
    if (tableOption.searchForm !== false && searchOption.itemArray.length > 0) {
      return (
        <BaseSearch
          searchOption={searchOption}
          searchFn={wrapSearchFn}
          moreButton={moreButton}
        />
      );
    } else {
      return '';
    }
  };

  const actionRenderEditForm = useMemo(() => {
    return renderEditForm();
  }, [EditContent, rowData, type]);

  const actionRenderSearch = useMemo(() => {
    return renderSearch();
  }, [tableOption, moreButton, size]);

  return (
    <Fragment>
      {actionRenderSearch}
      {tableOption.showActionButton !== false ? (
        <div style={{ textAlign: 'right' }}>
          {tableOption.deleteButton !== false && (
            <Button
              style={{ marginRight: '10px' }}
              disabled={selectedRows.length === 0}
              onClick={batchDelete}
            >
              批量删除
            </Button>
          )}
          {tableButton && tableButton()}
          {tableOption.importFn && (
            <Button
              style={{ marginRight: '10px' }}
              type="primary"
              onClick={batchImport}
            >
              批量导入
            </Button>
          )}
          {tableOption.addButton !== false && (
            <Button type="primary" onClick={addData}>
              新增
            </Button>
          )}
        </div>
      ) : (
        ''
      )}
      <Table
        rowKey={tableOption.mainKey}
        components={components}
        style={{ marginTop: 20, flex: 1 }}
        {...tableOption}
        rowSelection={tableOption.noSelect ? undefined : rowSelection}
        scroll={{
          x: 'max-content',
          y: `calc(${size.height}px - ${tableOption.scrollY})`,
        }}
        columns={columns}
        size="middle"
        onChange={handleTableChange}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
      />
      {tableOption.showPagination !== false ? (
        <Pagination
          style={{
            marginTop: '20px',
          }}
          total={total}
          defaultCurrent={1}
          defaultPageSize={20}
          pageSizeOptions={['20', '50', '80', '100', '200']}
          showSizeChanger
          showQuickJumper
          hideOnSinglePage={false}
          showTotal={total => `共 ${total} 条数据`}
          onChange={changePage}
          onShowSizeChange={changePageSize}
        />
      ) : (
        ''
      )}
      <BaseModal
        modalTitle={type}
        modalVisible={modalVisible}
        hideModal={dealModalClose}
      >
        {actionRenderEditForm}
      </BaseModal>

      <BaseModal
        modalTitle="批量导入上传文件"
        modalVisible={batchImportVisible}
        hideModal={dealBatchImportModalClose}
        noContinue={true}
      >
        <BaseUpload
          templateURL={tableOption.templateURL}
          acceptType=".xls,.xlsx"
          type="oneFile"
          onChange={setBatchFile}
        />
      </BaseModal>
    </Fragment>
  );
});

function areEqual() {
  return false;
}
export default memo(BaseTable, areEqual);
