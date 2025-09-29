import React from "react";

interface H2Props {
  children: React.ReactNode;
  className?: string;
}

const H2: React.FC<H2Props> = ({ children, className = "" }) => (
  <h2 className={`text-[18px] font-bold w-full pb-[10px] border-b-[0.5px] mb-[6px] ${className}`}>{children}</h2>
);

export default H2;
