import { useState, useEffect } from "react";

function Button(props) {
  const { outline, children, className } = props;
  return (
    <button className={`button ${className} ${outline ? "button--outline" : ""}`}>
      {children}
    </button>
  );
}

export default Button;
