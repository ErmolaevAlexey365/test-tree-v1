import { useState } from 'react';

export default function useModal<T = boolean>() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);

  function open(modalData?: T) {
    setVisible(true);
    setData(modalData);
  }

  function close() {
    setVisible(false);
    setData(undefined);
  }

  return [{ visible, data }, open, close] as const;
}
