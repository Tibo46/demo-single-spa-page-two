import React from 'react';
import useSWR from 'swr';
import { makeFetchRequest } from './httpConnector';

const SecondPage = () => {
  const url = 'https://api.dev.iwnonprod.com/referencedata/vessels/flags';
  const { data } = useSWR<string[]>(url, makeFetchRequest);

  return <div>{data && data.map((flag) => <h3>{flag}</h3>)}</div>;
};

export default SecondPage;
