import { useEffect } from "react";

const useDisableBodyScroll = (condition) => {
  useEffect(() => {
    if (condition) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [condition]);
};

export default useDisableBodyScroll;
