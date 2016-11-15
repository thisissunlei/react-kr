import React, {PropTypes} from 'react';

const CodeBlockTitle = (props) => (
  <div>

  {props.title || 'Example'}

  </div>
);

CodeBlockTitle.propTypes = {
  title: PropTypes.string,
  tooltip: PropTypes.string,
};

export default CodeBlockTitle;
