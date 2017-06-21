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
		
		

	}
	componentDidMount() {
		this.getCheck();

	}

	getCheck=()=>{
		const {NavModel,menusCode,operateCode}=this.props;
		var _this=this;
		if(menusCode){
				var IsMenus=NavModel.checkMenus(menusCode);
				_this.setState({
					IsMenus
				})
		}
		if(operateCode){
				var IsOperate=NavModel.checkOperate(operateCode);
				_this.setState({
					IsOperate
				})
		}
	}
	

	 
	render() {
		let {children,NavModel,operateCode}=this.props;
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

