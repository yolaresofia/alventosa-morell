import React from "react";
import Link from "next/link";

type ButtonProps = {
  buttonUrl?: string;
  buttonText: string;
  variant?: "buttonDark" | "buttonLight";
  className?: string;
  onClick?: () => void;
};

const buttonVariants = {
  buttonDark: "bg-[#712538] text-[#ECE8E2]",
  buttonLight: "bg-[#ECE8E2] text-[#712538]",
};

const Button: React.FC<ButtonProps> = ({
  buttonUrl,
  buttonText,
  variant = "buttonDark",
  className = "",
  onClick,
}) => {
  const ButtonContent = (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold ${buttonVariants[variant]} ${className}`}
    >
      {buttonText}
    </button>
  );

  return buttonUrl ? <Link href={buttonUrl}>{ButtonContent}</Link> : ButtonContent;
};

export default Button;
