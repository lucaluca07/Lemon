import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { useParams } from 'react-router-dom';

import Header from './sub/header';
import Content from './sub/content';
import Footer from './sub/footer';

const Detail: React.FC = () => {
  const [filter, setFilter] = useState(false);
  const { taskId } = useParams();
  useEffect(() => {
    setFilter(true);
    const timer = setTimeout(() => {
      setFilter(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [taskId]);
  return (
    <div
      className={classnames('detail', {
        'detail-hide': !taskId,
        'detail-filter': filter,
      })}
    >
      {taskId && (
        <>
          <Header />
          <Content />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Detail;
