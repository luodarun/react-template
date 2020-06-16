import React from 'react';
import { entryName } from '@/config/env';
import './NotFound.less';

const NotFound = () => (
  <div className="page404">
    <section>
      <h1>404</h1>
      <p>
        未找到该页面 返回 <a href={entryName}> 返回首页</a>
      </p>
    </section>
  </div>
);

export default NotFound;
