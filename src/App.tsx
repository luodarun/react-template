import React, { ReactNode } from 'react';
interface IProps {
  children: ReactNode;
}
const App: React.FC<IProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default App;
