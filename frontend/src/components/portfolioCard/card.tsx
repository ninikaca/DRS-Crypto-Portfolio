import React from "react";
import { ICardProps } from "../../interfaces/props/ICardProps";

const Card: React.FC<ICardProps> = ({ title, subtitle }) => {
  return (
    <div className="column">
      <div className="card">
        <div className="card-content">
          <p className="title">{title}</p>
          <p className="subtitle">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
