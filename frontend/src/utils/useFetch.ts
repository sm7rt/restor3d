import { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

const REQUEST_URL = "http://localhost:5000/breaches";

const useFetch = <T>( params: {email: string}) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axios.get(REQUEST_URL, { params });
        setData(response.data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };
    if(params.email.length > 0) fetchData();
  }, [params.email]);

  return { data, loading, error };
};

export default useFetch;