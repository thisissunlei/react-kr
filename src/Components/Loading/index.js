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
	onPullLoading = () =>{
		const {style} = this.props;
		return (
			<div className="ui-ladding-dowm" style = {style}>
				
					<div className="ui-ladding-dowm-line ui-ladding-dowm-1"></div>
					<div className="ui-ladding-dowm-line ui-ladding-dowm-2"></div>
					<div className="ui-ladding-dowm-line ui-ladding-dowm-3"></div>
					<div className="ui-ladding-dowm-line ui-ladding-dowm-4"></div>
					
				
			</div>

		)
		
	}
	render(){

			const {type} = this.props;

			switch(type){
					case 'dowm':{
							return this.onPullLoading();
					}
					default:{
							return this.renderDefault();
					}
			}

	}

}
