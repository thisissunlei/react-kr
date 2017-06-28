import React from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
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
		var _this=this;
		setTimeout(function(){
			_this.getCheck();
		},1000)
		

	}

	getCheck=()=>{
		const {NavModel,menusCode,operateCode}=this.props;
		
		if(menusCode){
				var IsMenus=NavModel.checkMenus(menusCode);
				this.setState({
					IsMenus
				})
		}
		if(operateCode){
				var IsOperate=NavModel.checkOperate(operateCode);
				this.setState({
					IsOperate
				})
		}
	}
	

	 
	render() {
		let {children,NavModel,operateCode,style}=this.props;
		let {IsOperate,IsMenus}=this.state;
		if(IsOperate || IsMenus){
			return (
				<div  style={style} className='check-permission'>
					{children}
				</div>

			);
		}else {
			return null;
		}
		
	}
}

