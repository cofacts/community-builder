import React from 'react';
// import { useLocation } from 'react-router-dom';

import ReplyTable from './ReplyTable';

const EditorWorks: React.FC = () => {
  return <ReplyTable startDate="now-7d" />;
};

export default EditorWorks;
