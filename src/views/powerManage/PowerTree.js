/*eslint-disable*/
import React, {memo, useState, forwardRef} from 'react';
import { Tree, Icon } from 'antd';
import {staticRouter} from '@/constant/index';
import {isNotEmpty} from '@/utils/common';
const { TreeNode } = Tree;
const PowerTree = forwardRef(({value, onChange}, ref) => {
  const [treeData, setTreeData] = useState(staticRouter);
  const [checkedKeys , setCheckedKeys ] = useState(value || []);
  const addNode = (treeNode, e) => {
    e.stopPropagation();
  }

  const deleteNode = (treeNode, e) => {
    e.stopPropagation();
  }

  const onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    setCheckedKeys(checkedKeys);
    onChange(checkedKeys);
  };

  const renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={<div className='power-tree-node'><span>{item.label}</span><Icon onClick={e => addNode(item, e)} type="plus" /><Icon onClick={e => deleteNode(item, e)} type="delete" /></div>} key={item.id} dataRef={item}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.id} {...item} title={<span>{item.label}</span>} dataRef={item} />;
    });

  return (<Tree checkable blockNode selectable={false} checkedKeys={isNotEmpty(value) ? value : checkedKeys} onCheck={onCheck} ref={ref}>{renderTreeNodes(treeData)}</Tree>);
});
export default memo(PowerTree);
