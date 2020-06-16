/*eslint-disable*/
import React, { memo, useState } from 'react'
import {Input} from 'antd'
const BaseInputRange = React.forwardRef(({size, value = {}, onChange}, refs) => {
  const [startNum, setStartNum] = useState(value.startNum || '');
  const [endNum, setEndNum] = useState(value.endNum || '');

  function triggerChange(changedValue) {
    if (onChange) {
      onChange(Object.assign({}, { startNum, endNum, isBaseInputRange: '1' }, changedValue));
    }
  }


  return (
    <div ref={refs}>
      <Input
        type="text"
        size={size}
        value={"startNum" in value ? value.startNum : startNum}
        onChange={({ target: { value: val } }) => {
          const number = parseInt(val || 0, 10);
          if (Number.isNaN(number)) {
            return;
          }
          setStartNum(val);
          triggerChange({ startNum: val });
        }}
        style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
      />
       <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
      <Input
        type="text"
        size={size}
        value={"endNum" in value ? value.endNum : endNum}
        onChange={({ target: { value: val } }) => {
          const number = parseInt(val || 0, 10);
          if (Number.isNaN(number)) {
            return;
          }
          setEndNum(val);
          triggerChange({ endNum: val });
        }}
        style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
      />
    </div>
  )
});
export default memo(BaseInputRange)
