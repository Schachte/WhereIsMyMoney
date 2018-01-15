import React, {PropTypes} from 'react';

const TextInput = ({className, placeholder, onChange, value, name}) => {
  return (
      <div>
        <input
          className={className}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          name={name}
        />
        <br/>
      </div>
  );
};

TextInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string
};

export default TextInput;
