import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "gold" | "outline-gold";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold rounded-full transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2 shadow-xs hover:shadow-md",
    lg: "text-base px-7 py-3.5 gap-2.5 shadow-sm hover:shadow-lg"
  };

  const variantStyles = {
    primary: "bg-[#A50026] text-white hover:bg-[#85001F] active:scale-98",
    secondary: "bg-white text-[#A50026] border-2 border-[#A50026] hover:bg-[#FCE5E9] active:scale-98",
    gold: "bg-[#FFC52E] text-[#242424] hover:bg-[#E5AD1F] active:scale-98 shadow-xs",
    "outline-gold": "bg-transparent text-[#FFC52E] border-2 border-[#FFC52E] hover:bg-[#FFC52E]/10 active:scale-98"
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
    >
      {children}
    </button>
  );
}
