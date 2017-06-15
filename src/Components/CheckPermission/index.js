import React from 'react';
import { observer, inject } from 'mobx-react';

@inject("NavModel")
@observer
export default class CheckPermission extends React.Component {
	static displayName = 'CheckPermission';

	static defaultProps = {
		menusCode: '',
		operateCode: '',
		
	}

	constructor(props, context) {
		super(props, context);
		this.state={
			IsMenus:false,
			IsOperate:false,
		}
		
		const {NavModel}=this.props;

	}
	componentDidMount() {
		const {NavModel,menusCode,operateCode}=this.props;
		var _this=this;
		if(menusCode){
			
			 setTimeout(function(){
				var IsMenus=NavModel.checkMenus(menusCode);
				_this.setState({
					IsMenus
				})
			},1000)
			
		}
		if(operateCode){
			setTimeout(function(){
				var IsOperate=NavModel.checkOperate(operateCode);
				_this.setState({
					IsOperate
				})
			},1000)
		}
		

	}


	 
	render() {
		let {children,NavModel}=this.props;
		let {IsOperate,IsMenus}=this.state;
		if(IsOperate || IsMenus){
			return (
				<div  style={{display:'inline-block'}}>
					{children}
				</div>

			);
		}else {
			return null;
		}
		
	}
}

