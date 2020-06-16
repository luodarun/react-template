/*eslint-disable*/
import React, {
  memo,
  useState,
  forwardRef,
  useEffect,
  SyntheticEvent,
} from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Form } from 'antd';
import { courseType1, staticWeek } from '@/constant/index';
import { updateCourseDetail } from '@/api/course';
import StoreTable from 'antd/lib/table/Table';
import { FormComponentProps } from 'antd/es/form';
import { WrappedFormUtils } from 'antd/es/form/Form';
const EditableContext = React.createContext({});

interface EditableRowProps {
  index: number;
  form: WrappedFormUtils<any>;
  [x: string]: any;
}

const EditableRow = ({ form, index, ...props }: EditableRowProps) => {
  return (
    <EditableContext.Provider value={form}>
      <tr {...props} />
    </EditableContext.Provider>
  );
};

const EditableFormRow = Form.create()(EditableRow);

interface EditableCellProps extends FormComponentProps {
  record: any;
  handleSave: (data: any) => void;
  dataIndex: string;
  title: any;
  editable: boolean;
  index: number;
}

class EditableCell extends React.Component<EditableCellProps> {
  input: Input | null = null;
  form: WrappedFormUtils<any> | null = null;
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input && this.input.focus();
      }
    });
  };

  save = (e: SyntheticEvent<any>) => {
    const { record, handleSave } = this.props;
    this.form &&
      this.form.validateFields((error, values) => {
        if (error && error[e.currentTarget.id]) {
          return;
        }
        this.toggleEdit();
        handleSave({ ...record, ...values });
      });
  };

  renderCell = (form: WrappedFormUtils<any>) => {
    this.form = form;
    const { children, dataIndex, record } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: false,
            },
          ],
          initialValue: record[dataIndex],
        })(
          <Input
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
            autoComplete="off"
          />,
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      dataIndex,
      title,
      editable,
      index,
      record,
      handleSave,
      children,
      form,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {this.renderCell}
          </EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

interface EditableTableColumnProps {
  title: string;
  dataIndex: string;
  width: string;
  editable?: boolean;
}

interface EditableTableProps {
  value: any;
  onChange: Function;
  columns: Array<EditableTableColumnProps>;
  isDetail: boolean;
}

const EditableTable = forwardRef(
  (
    { value, onChange, columns, isDetail }: EditableTableProps,
    ref: React.Ref<StoreTable<any>>,
  ) => {
    const [dataSource, setDataSource] = useState(value || []);
    const [splitIndex, setSplitIndex] = useState(1);
    useEffect(() => {
      if (value) {
        let tempArray = [...value];
        setDataSource(tempArray);
      }
    }, [value]);

    const handleSave = (row: any) => {
      let flag = false;
      for (let i = 0; i < staticWeek.length; i++) {
        if (!row[staticWeek[i]]) {
          flag = true;
        }
      }
      if (flag) {
        // 存在空课程的情况
        return;
      } else {
        updateCourseDetail(row).then(() => {
          const newData = [...dataSource];
          const index = newData.findIndex(item => row.id === item.id);
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          onChange(newData);
          setDataSource(newData);
        });
      }
    };

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const selfColumns = columns.map(col => {
      if (!col.editable) {
        return Object.assign({}, col, {
          render: (text: any, row: any, index: number) => {
            return courseType1[text] + row['courseSort'];
          },
        });
      }
      return isDetail
        ? {
            ...col,
          }
        : {
            ...col,
            onCell: (record: any) => ({
              record,
              editable: col.editable,
              dataIndex: col.dataIndex,
              title: col.title,
              handleSave: handleSave,
            }),
          };
    });
    return (
      <div>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          ref={ref}
          rowKey="id"
          size="small"
          pagination={false}
          dataSource={dataSource}
          columns={selfColumns}
        />
      </div>
    );
  },
);
EditableTable.defaultProps = {
  columns: [
    {
      title: '',
      dataIndex: 'type',
      width: '150px',
    },
    {
      title: '周一',
      dataIndex: 'week1',
      width: '100px',
      editable: true,
    },
    {
      title: '周二',
      dataIndex: 'week2',
      width: '100px',
      editable: true,
    },
    {
      title: '周三',
      dataIndex: 'week3',
      width: '100px',
      editable: true,
    },
    {
      title: '周四',
      dataIndex: 'week4',
      width: '100px',
      editable: true,
    },
    {
      title: '周五',
      dataIndex: 'week5',
      width: '100px',
      editable: true,
    },
    {
      title: '周六',
      dataIndex: 'week6',
      width: '100px',
      editable: true,
    },
    {
      title: '周日',
      dataIndex: 'week7',
      width: '100px',
      editable: true,
    },
  ],
};
export default memo(EditableTable);
