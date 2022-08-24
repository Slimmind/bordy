import React from 'react';
import './input.styles.scss';

export const Input = ({
  type,
  name,
  placeholder,
  label,
  labelClass,
  changeHandler,
  value,
  autoFocus,
  checked,
}) => {
  return (
    <div className="form-group">
      {type === 'radio' || type === 'checkbox' ? (
        <>
          <input
            id={value}
            type={type}
            name={name}
            onChange={changeHandler}
            value={value}
            checked={checked}
          />
          <label className={labelClass} htmlFor={value}>
            {label}
          </label>
        </>
      ) : (
        <>
          {label && (
            <label className={labelClass} htmlFor={name}>
              {label}
            </label>
          )}
          {type === 'textarea' ? (
            <textarea
              className="form-field"
              id={name}
              type={type}
              name={name}
              placeholder={placeholder}
              onChange={changeHandler}
              value={value}
              row={6}
            ></textarea>
          ) : (
            <input
              className="form-field"
              id={name}
              type={type}
              name={name}
              placeholder={placeholder}
              onChange={changeHandler}
              value={value}
              autoFocus={autoFocus}
            />
          )}
        </>
      )}
    </div>
  );
};
