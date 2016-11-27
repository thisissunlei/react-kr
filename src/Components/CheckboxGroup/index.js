import React,{Component} from 'react';

import Checkbox from '../Checkbox';

export default class CheckboxGroup extends Component{

	static displayName = 'CheckboxGroup';

	static defaultProps = {
		optipns:[]
	}

	static propTypes = {
		/**
		 * Checkbox 选中时值为true
		 */
		options:React.PropTypes.array,
	};

	constructor(props){
		super(props);

	}

  componentWillReceiveProps(nextProps) {

	}


	render(){

	   let {options} = this.props;

		return (
		    <div>
            {options && options.map((item,index)=><Checkbox label={item.label} key={index} {...item}/>)}
        </div>
		);

	}
}
