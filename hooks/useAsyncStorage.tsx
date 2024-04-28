import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UseAsyncStorageResult<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

const useAsyncStorage = <T,>(key: string): UseAsyncStorageResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          // Parse the JSON stored in AsyncStorage
          setData(JSON.parse(value) as T);
        } else {
          // No data available under this key
          setData(null);
        }
      } catch (e) {
        // Error reading value
        setError(
          e instanceof Error
            ? e
            : new Error(`An unexpected error occurred: ${e}`),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [key]);

  return {data, loading, error};
};

export default useAsyncStorage;
