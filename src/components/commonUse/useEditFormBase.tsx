import React, { useReducer, createContext, ReactNode, Fragment } from 'react';
export const EditFormBaseContext = createContext({});

interface IGlobal {
  userId: number;
}

const initialState: IGlobal = {
  userId: 0,
};
const selfRenderReducer = function(
  state = initialState,
  action: actionData,
): IGlobal {
  switch (action.type) {
    case 'UPDATE_DATA':
      return action.data;
    default:
      return state;
  }
};

interface IProps {
  children: ReactNode;
}

const EditFormBaseWrap: React.SFC<IProps> = props => {
  const [EditFormBaseData, dispatch] = useReducer(selfRenderReducer, {
    userId: 0,
  });
  const changeData = (changeValue: number) => {
    dispatch({ type: 'UPDATE_DATA', data: changeValue });
  };
  return (
    <Fragment>
      <EditFormBaseContext.Provider value={{ EditFormBaseData, changeData }}>
        {props.children}
      </EditFormBaseContext.Provider>
    </Fragment>
  );
};

export default EditFormBaseWrap;
