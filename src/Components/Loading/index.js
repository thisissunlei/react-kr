import React,{Component} from 'react';
import './index.less';

export default class Loading extends Component{

	static displayName = 'Loading';

	static defaultProps = {
		type:'default'
	}

	static propTypes = {
		type:React.PropTypes.string
	}


	renderDefault = ()=>{
		return (
			<div className="spinner">
				<div className="double-bounce1"></div>
				<div className="double-bounce2"></div>
			</div>
		);

	}

	render(){

			const {type} = this.props;

			switch(type){
					case 'default':{
							return this.renderDefault();
					}
					default:{
							return this.renderDefault();
					}
			}

	}

}
