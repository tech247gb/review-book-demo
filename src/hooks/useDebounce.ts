import React, { useState, useEffect } from "react";

const useDebounce = (value:string, delay:any) => {

  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);


  return debouncedValue;
};

export default useDebounce;
