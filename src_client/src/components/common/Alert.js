import React, {PropTypes} from 'react';

const Alert = ({alertType, fontAwesomeIcon, alertDescription, name}) => {
  return (
    <div className={alertType} name={name}>
      <i className={fontAwesomeIcon}></i>
      {alertDescription}
    </div>
  );
};

Alert.propTypes = {
  alertType: PropTypes.string,
  fontAwesomeIcon: PropTypes.string,
  alertDescription: PropTypes.string,
  name: PropTypes.string
};

export default Alert;
