import React from "react";
import { ICardProps } from "../../interfaces/props/ICardProps";

const Card: React.FC<ICardProps> = ({ title, subtitle }) => {
  const isNegative = parseFloat(subtitle) < 0.0;

  return (
    <div className="column">
      <div className="card">
        <div className="card-content">
          <div className="columns is-vcentered">
            <div className="column">
              <p className="title">{title}</p>
              <p className={`subtitle ml-2 ${isNegative ? 'has-text-danger' : 'has-text-success'}`}>{subtitle}</p>
            </div>
            <div className="column is-narrow">
              <img
                className={`ml-2 ${isNegative ? 'has-text-danger' : 'has-text-success'}`}
                src={isNegative ? "gubitak.png" : "dobit.png"}
                width={64} 
                height={64}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
