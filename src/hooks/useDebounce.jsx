import { useState } from 'react';

function useDebounce(callback, delay) {
  const [timeoutId, setTimeoutId] = useState(null);

  const debouncedFunction = (...args) => {
    clearTimeout(timeoutId);

    const id = setTimeout(() => {
      callback(...args);
    }, delay);

    setTimeoutId(id);
  };

  return debouncedFunction;
}
export default useDebounce