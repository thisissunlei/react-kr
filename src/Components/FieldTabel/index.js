import React from 'react';
import { Field } from 'redux-form';

import FTabel from './FTabel';
import FContent from './FContent';
import FRow from './FRow';

class FdTabel extends React.Component {



  static propTypes = {
        type: React.PropTypes.string,
        name: React.PropTypes.string,
        label: React.PropTypes.string,
        component: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        grid: React.PropTypes.number,
        inline: React.PropTypes.bool,
        search: React.PropTypes.bool,
        left: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        right: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        colorStyle: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    

    return (
			<Field {...this.props} component={FTabel} />     
    );
  }
}



module.exports = {
	FdTabel,
  FContent,
  FRow
}
