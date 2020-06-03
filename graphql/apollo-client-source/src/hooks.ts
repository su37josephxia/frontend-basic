import { useState, useContext, useEffect, Dispatch } from "react";
import { graphqlContext } from "./GraphProvider";
export const useQuery = <T = any>(query: string, variables?: any) => {
  const { client } = useContext(graphqlContext);
  const [data, setData]: [T, Dispatch<T>] = useState(null as any);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null as any);
  useEffect(() => {
    setLoading(true);
    setError(null);
    client
      .query({ query, variables })
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [query, variables, client]);
  return { data, loading, error };
};
