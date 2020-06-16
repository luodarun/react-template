/*eslint-disable*/
import React, {useState, Fragment, useEffect, useRef} from 'react';
import './schoolNews.less';
import schoolNewsColumn from "./schoolNewsColumn";
import BaseTable from '@/components/common/BaseTable';
import {findAllSchool} from '@/api/school';
import {getValueAndLabel} from '@/utils/common';
import {deletenews, getNewsById, getnewsList, newsUpload, savenews} from '@/api/schoolNews';
// import {connect} from 'react-redux';
// import { withRouter } from 'react-router-dom'

function schoolNews (props) {

  const [tableOption, setTableOption] = useState({
    modularName: '校内新闻',
    mainKey: 'id',
    tempColumns: schoolNewsColumn,
    searchFn: getnewsList,
    getDetailFn: getNewsById,
    addFn: savenews,
    updateFn: savenews,
    deleteFn: deletenews,
    actionColumnWidth: 120,
    scrollY: '440px',
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
      <div className='school-news'>
        <BaseTable{...{tableOption}} />
      </div>
    </Fragment>
  )
}

export default schoolNews
