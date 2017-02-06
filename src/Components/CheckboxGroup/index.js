import React,{Component} from 'react';

import Checkbox from '../Checkbox';

export default class CheckboxGroup extends Component{

	static displayName = 'CheckboxGroup';

	static defaultProps = {
		name:'kr-checkboxGroup',
		optipns:[]
	}

	static propTypes = {
		/**
		 * name
		 */
		name:React.PropTypes.string,
		/**
		 * Checkbox 选中时值为true
		 */
		checked:React.PropTypes.bool,
		options:React.PropTypes.array,
		style:React.PropTypes.object,
	};

	constructor(props){
		super(props);

	}

  componentWillReceiveProps(nextProps) {

	}


	render(){

	   let {options,name,checked,style} = this.props;

		return (
		    <div>
            {options && options.map((item,index)=><Checkbox label={item.label} style={style} name={name} checked={checked} key={index} {...item}/>)}
        </div>
		);

	}
}
