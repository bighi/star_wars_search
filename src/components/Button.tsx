import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button" | "link";
  href?: string;
  loading?: boolean;
  loadingText?: string;
}

const Button: React.FC<ButtonProps> = ({
  as = "button",
  href,
  loading,
  children,
  className = "",
  loadingText = "Searching...",
  ...props
}) => {
  const baseClasses = "w-full font-bold text-center rounded-[20px] p-[8px] text-white transition-all duration-300 transform border border-gray-soft";

  const stateClasses = props.disabled
    ? "bg-gray-pinkish cursor-not-allowed"
    : "bg-green-teal cursor-pointer hover:scale-105";

  if (as === "link" && href) {
    return (
      <Link href={href} className={`${baseClasses} ${stateClasses} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type || "button"}
      disabled={props.disabled || loading}
      className={`${baseClasses} ${stateClasses} ${className}`}
      {...props}
    >
      {loading ? loadingText : children}
    </button>
  );
};

export default Button;