import { memo } from "react";

const Button = memo(function Button({
  outline,
  children,
  className,
  onAction,
}) {
  return (
    <button
      onClick={onAction}
      className={`button ${className} ${outline ? "button--outline" : ""}`}
    >
      {children}
    </button>
  );
});

export default Button;
