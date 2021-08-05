import React, { useCallback, useState } from 'react';

const useInput = (initialState: string) => {
  const [state, setState] = useState(initialState);

  const onChange = useCallback(
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ): void => {
      const { value } = event.target;
      setState(() => value);
    },
    []
  );

  return [state, onChange, setState] as [
    string,
    typeof onChange,
    typeof setState
  ];
};

export default useInput;
