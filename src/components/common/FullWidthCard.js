import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const FullWidthCard = (props) => {
  return (
   <div className="card mb-3">
     <div className="card-header">
       <i className={props.iconName}></i>
       {props.title}
   </div>
     <div className="card-body" style={{padding: '25px', margin: '0px'}}>
         {props.nestedComponent}
     </div>
     <div className="card-footer small text-muted">Last Updated @ {new Date().toLocaleString()}</div>
   </div>
  );
};

FullWidthCard.propTypes = {
  title: PropTypes.string,
  iconName: PropTypes.string,
  nestedComponent: PropTypes.object
};

export default FullWidthCard ;
