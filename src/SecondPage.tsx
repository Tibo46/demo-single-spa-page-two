import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React from 'react';
import useSWR from 'swr';

const makeFetchRequest = async (url: string, jwt: string) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      const e: any = new Error('An error occurred while fetching the data.');
      e.info = error.response.data;
      e.status = error.response.status;
      throw e;
    });

interface Organisation {
  id: string;
  domain: string;
  domains: string[];
  name: string;
  address?: any;
  industrialSector: string | null;
  lloydsBrokerReference: string | null;
  brokerLicenseNumber: string | null;
  licenseExpiryDate: Date | null;
  naic: string | null;
  einCode: string | null;
  usSurplusBrokerLicenses: any[];
}

const SecondPage = () => {
  const { getAccessTokenSilently, isLoading } = useAuth0();
  const [jwt, setJwt] = React.useState<string | null>(null);

  const url = 'https://api.dev.iwnonprod.com/organisations';
  const { data } = useSWR<Organisation[]>(
    jwt ? [url, jwt] : null,
    makeFetchRequest
  );

  React.useEffect(() => {
    const fetchToken = async () => {
      setJwt(await getAccessTokenSilently());
    };

    if (!isLoading) {
      fetchToken();
    }
  }, [isLoading]);

  return <div>{data && data.map((org) => <h3>{org.name}</h3>)}</div>;
};

export default SecondPage;
