/* eslint-disable @typescript-eslint/ban-types */

import React from "react";

function useEvent<T extends Function>(callback: T): T {
  const fnRef = React.useRef<any>(null);
  fnRef.current = callback;

  const memoFn = React.useCallback<T>(
    ((...args: any) => fnRef.current?.(...args)) as any,
    [],
  );

  return memoFn;
}

export default useEvent;
