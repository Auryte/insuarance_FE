import { useState, useEffect } from 'react';

const useGetMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
};

export default useGetMounted;
