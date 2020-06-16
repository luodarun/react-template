import React, { Fragment } from 'react';
import { PageHeader } from 'antd';
import history from '@/utils/history';

interface BasePageHeaderCardProps {
  title: string;
  subTitle: string;
  extraInfo: any;
}
const BasePageHeaderCard: React.SFC<BasePageHeaderCardProps> = props => {
  const { children, title, subTitle, extraInfo } = props;
  const goBack = () => {
    history.go(-1);
  };

  return (
    <Fragment>
      <PageHeader
        onBack={() => goBack()}
        title={title}
        subTitle={subTitle}
        extra={[extraInfo]}
      >
        {children}
      </PageHeader>
    </Fragment>
  );
};
export default BasePageHeaderCard;
