import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "filled" | "outline";
  size?: "large" | "medium";
  className?: string;
  onClick?: () => void;
};

export function Button({ children, variant = "filled", size = "large", className = "", onClick }: ButtonProps) {
  const base =
    "font-medium tracking-wide uppercase transition-all duration-200 text-center inline-block";
  const filled =
    "bg-[#d6d1c4] text-foreground border-none hover:bg-[#cfc9bb]";
  const outline =
    "bg-transparent text-foreground border border-foreground hover:bg-[#f5f3ee]";
  const large = "px-8 py-4 text-base";
  const medium = "px-6 py-2 text-sm";

  const styles = `${base} ${size === "large" ? large : medium} ${variant === "filled" ? filled : outline} ${className}`;

  return (
    <button className={styles} onClick={onClick}>
      {children}
    </button>
  );
}