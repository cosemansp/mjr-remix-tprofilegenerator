import React from "react";
import type { FC, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
}

const Card: FC<CardProps> = ({ children, title }) => (
  <div className="card shadow my-4 bg-white">
    <div className="cardBody p-7">
      <h2 className="text-xl">{title}</h2>
      {children}
    </div>
  </div>
);

export default Card;
