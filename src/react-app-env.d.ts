/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  >>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

interface stringObj {
  [propName: string]: string;
}

interface actionData<T = any> {
  type: string;
  data?: T;
}

interface baseSearchParams {
  page: number;
  pageSize: number;
  orderKey: string;
  sortType: number;
}

interface selfRoute {
  id: string;
  label: string;
  path: string;
  component?: string;
  children?: selfRoute[];
  icon?: string;
  parentId?: string;
  Abbreviation?: string;
  describe?: string;
  requiresAuth?: boolean;
}

interface editInitValueFunc {
  (selfValue?: string | number | boolean, rowData?: any): any;
}

interface validatorFunc {
  (
    rule: any,
    value: any,
    callback: any,
    values: {
      [field: string]: any;
    },
  ): any;
}

interface renderFunc {
  (row: string | number | boolean | undefined):
    | string
    | number
    | boolean
    | undefined;
}

interface searchRenderFunc {
  (text?: string | number | boolean, record?: any, index?: number): JSX.Element;
}

interface editRenderFunc {
  (isDetail?: boolean, rowData: any): JSX.Element;
}

interface formatSearchParamsFunc {
  (rowData: any, isDetail?: boolean): JSX.Element;
}

interface formatFunc {
  (
    selftValue?: string | number | boolean,
    column: completeColumn,
    values: any,
    EditFormBaseData: any,
    rowData: any,
  ): any;
}

interface getDataFunc {
  (...items: any[]): any;
}

interface callbackFunc {
  (text: any, record: any): any;
}

interface isDisabledFn {
  (rowData: any): boolean;
}

interface dicDataObj {
  label: string;
  value: string | number;
}

interface completeColumn {
  title: string;
  dataIndex: string;
  ellipsis?: boolean;
  onHeaderCell?: (
    column: any,
  ) => { width: any; onResize: (e: any, { size }: { size: any }) => void };
  width?: number;
  hidden?: boolean;
  sorter?: boolean;
  search?: boolean;
  paramName?: string;
  searchOrder?: number;
  initValue?: any;
  edit?: boolean;
  editFormOrder?: number;
  editFormSpan?: number;
  needAutoRender?: boolean;
  required?: boolean;
  selfKey?: string;
  createInitValue?: any;
  editInitValue?: editInitValueFunc;
  message?: string;
  validator?: validatorFunc;
  placeholder?: string;
  type?: string;
  dicData?: Array<dicDataObj | string>;
  selfSelectDic?: string;
  selfSelectDic2?: string;
  render?: renderFunc;
  searchRender?: searchRenderFunc;
  editRender?: editRenderFunc;
  formatSearchParams?: formatSearchParamsFunc;
  format?: formatFunc;
  dataArrayName?: string;
  bindParamOption?: any;
  startProp?: string;
  endProp?: string;
  bindParamOption2?: any;
  formItemRender?: (data: any) => ReactNode;
  searchSelfSpan?: number;
  isTimeRangeSearch?: boolean;
  isNosfm?: boolean;
}
interface tableOption {
  modularName: string;
  mainKey: string;
  scrollY: string;
  searchFn: getDataFunc;
  getDetailFn: getDataFunc;
  addFn: getDataFunc;
  updateFn: getDataFunc;
  deleteFn: getDataFunc;
  tempColumns: Array<completeColumn>;
  actionColumnWidth: number;
  actionButtons: Array<{
    name: string | ((record: any) => string);
    callbackFn: callbackFunc;
    isDisabled: isDisabledFn;
  }>;
  beforeAction?: (
    editColumn: Array<completeColumn>,
    type: string,
    data?: any,
  ) => void;
  [props: string]: any;
}

interface Window {
  __INITIAL_STATE__: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

interface NodeModule {
  hot: any;
}

interface selfRes {
  data: any;
}
