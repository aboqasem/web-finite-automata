import { useState } from 'react';

export function useToggle(initialValue: boolean) {
  const [value, setValue] = useState(initialValue);

  const toggle = (to?: boolean) => {
    if (typeof to === 'boolean') {
      return setValue(to);
    }
    return setValue((v) => !v);
  };

  return [value, toggle] as const;
}
