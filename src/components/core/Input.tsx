import React, { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string
}

export const Input = ({icon,name,...others}:InputProps ) => {
  return (
    <div className='input-container'>
      {icon  && <img src={icon} alt={name} />}
      <input name={name} {...others} />
    </div>
  )
}
