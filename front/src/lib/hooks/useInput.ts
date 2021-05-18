import React, { useCallback, useState } from 'react';

const useInput = (initialState: any) => {
  const [state, setState] = useState(initialState);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.target;
      setState(() => value);
    },
    []
  );

  return [state, onChange, setState];
};

export default useInput;
