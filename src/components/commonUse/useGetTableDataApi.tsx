import { useState, useEffect, useReducer } from 'react';

interface dataFetchReducerState {
  loading: boolean;
  total: number;
  dataSource: Array<any>;
  doFetch?: (data?: any) => void;
}

interface actionType {
  type: string;
  total?: number;
  data?: Array<any>;
}

const dataFetchReducer = function(
  state: dataFetchReducerState,
  action: actionType,
): dataFetchReducerState {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        loading: true,
        total: 0,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        total: action.total || 0,
        dataSource: action.data || [],
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        total: 0,
      };
    default:
      throw new Error();
  }
};

function useGetTableDataApi(searchFn: getDataFunc): dataFetchReducerState {
  const [allSearchData, setAllSearchData] = useState({
    page: 1,
    pageSize: 20,
  });
  const [state, dispatch] = useReducer(dataFetchReducer, {
    loading: false,
    total: 0,
    dataSource: [],
  });

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const res = await searchFn(allSearchData);
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', data: res.data, total: res.total });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [allSearchData]);

  const doFetch = (data: any) => {
    setAllSearchData({
      page: allSearchData.page,
      pageSize: allSearchData.pageSize,
      ...data,
    });
  };

  return { ...state, doFetch };
}
export default useGetTableDataApi;
