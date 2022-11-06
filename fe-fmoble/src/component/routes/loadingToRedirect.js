import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const history = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // chuyen trang khi = 0
    count === 0 && history("/");
    return () => clearInterval(interval);
  }, [count, history]);
  return (
    <div className="text-center pt-4">
      <p>Bạn sẽ được chuyển hướng sau {count} giây nữa</p>
    </div>
  );
};

export default LoadingToRedirect;
