import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // chuyen trang khi = 0
    count === 0 && history.push("/");
    return () => clearInterval(interval);
  }, [count]);
  return (
    <div className="text-center pt-4">
      <p>Bạn sẽ được chuyển hướng sau {count} giây nữa</p>
    </div>
  );
};

export default LoadingToRedirect;
