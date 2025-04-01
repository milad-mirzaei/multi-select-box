import React, { useCallback, useRef } from "react";

const useClickOutside = <T extends HTMLElement = any>(handler: () => void) => {
  const ref = useRef<T>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const container = ref.current;
      if (container && !container.contains(event.target as Node)) {
        handler();
      }
    },
    [ref, handler]
  );

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return ref;
};

export default useClickOutside;
