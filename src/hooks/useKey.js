import { useEffect } from "react";

export function useKey (key, callback) {
  useEffect(() => {
    const eventCallback = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        callback();
      }
    };

    document.addEventListener('keydown', eventCallback);

    return () => {
      document.removeEventListener('keydown', eventCallback);
    }
  }, [callback, key])
}