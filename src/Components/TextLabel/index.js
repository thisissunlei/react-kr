import React from 'react';
import './index.less'
export default class textLabel extends React.Component {

  /*
    props的值：
    value,
    index,
    data,
    delValue,

  */

	constructor(props){
		super(props);
	}

  valueDel = () =>{
    const {index,valueDel} = this.props;
    valueDel && valueDel(index);
  }
	render() {
    const {value} = this.props;



		return (
              <div className = 'ui-text-label'>
                {value}
                <span className = 'ui-text-label-del' onClick = {this.valueDel}>
                  
                </span>
              </div>
            );

	}

}
