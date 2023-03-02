import React from 'react';
import axios from 'axios';
import { z } from 'zod';

const ApiResponse = z.object({
  message: z.string(),
});

export type ApiResponse = z.infer<typeof ApiResponse>;

const useData = () => {
  const [data, setData] = React.useState<ApiResponse>();
  const [error, setError] = React.useState<Error>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get('/api')
      .then((res) => {
        // parse response
        const data = ApiResponse.parse(res.data);

        setData(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, error, loading };
};

export function DataFetchingTS() {
  // fetch from api
  const { data, error, loading } = useData();

  const [show, setShow] = React.useState(false);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <h1>Data Fetching TypeScript + Zod</h1>
      <p>Fetch from API: {data?.message}</p>

      <button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button>
      {show ? <pre>{JSON.stringify(data)}</pre> : null}
    </>
  );
}
