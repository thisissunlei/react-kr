import React from 'react';
import { Field } from 'redux-form';

import FdTabel from './FdTabel';
import FdRow from './FdRow';
import TabelEdits from './TabelEdits';


class CheckTable extends React.Component {



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
    this.state = {}
  }

  render() {


    return (
			<Field {...this.props} component={FdTabel} />
    );
  }
}



module.exports = {
	CheckTable,
  FdRow,
  TabelEdits
}
