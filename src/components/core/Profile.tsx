import React, { ButtonHTMLAttributes, HTMLAttributes } from 'react';

interface ProfileProps extends HTMLAttributes<HTMLDivElement> {
  image?: string;
  name?: string;
}

export const SimpleProfile = ({
  name,
  children,
  image,
  className,
  ...others
}: ProfileProps) => {
  return (
    <section className={`profile ${className ?? ''}`} {...others}>
      {image ? (
        <img src={image} className="image" alt={name} />
      ) : name ? (
        <div className="placeholder">{name[0].toUpperCase()}</div>
      ) : (
        children
      )}
    </section>
  );
};

interface ProfileButtonProps extends HTMLAttributes<HTMLButtonElement> {
  image?: string;
  name?: string;
  onClick: () => void;
}

export const ButtonProfile = ({ children, className, name, image, onClick , ...others }: ProfileButtonProps) => {
  return (
    <button className={`profile ${className ?? ''}`} onClick={onClick} {...others} >
      {image ? (
        <img src={image} className="image" alt={name} />
      ) : name ? (
        <div className="placeholder">{name[0].toUpperCase()}</div>
      ) : (
        children
      )}
    </button>
  );
};
