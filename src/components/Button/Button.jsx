import { memo } from "react";

const Button = (props) => {
  const { outline, children, className, onAddPizza } = props;
  return (
    <button
      onClick={onAddPizza}
      className={`button ${className} ${outline ? "button--outline" : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
