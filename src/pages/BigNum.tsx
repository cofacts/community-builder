import React from 'react';
import { useLocation } from 'react-router-dom';

type Setup = {
  /**
   * UTC date-time string
   */
  start: string;

  /**
   * What panel(s) to display
   */
  panels: Array<'article' | 'feedback'>;
};

const BigNum: React.FC = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const start = searchParams.get('start') as Setup['start'];
  const panels = searchParams.getAll('panels') as Setup['panels'];

  return (
    <>
      Big - {start}, {panels.join(',')}
    </>
  );
};

export default BigNum;
