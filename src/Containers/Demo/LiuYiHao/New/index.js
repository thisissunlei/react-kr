import React from 'react';
import {
	KrField,
    TabCs,
    TabC,
	
} from 'kr-ui';
import {
	numberToSign
} from 'kr/Utils';
import {
	LocationChoice
} from 'kr/PureComponents';
import {reduxForm} from 'redux-form';
import EditTable from './EditTable';
import EditFiled from './EditFiled'
import RadioBug from './RadioBug';
class New extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			isOpen:false
		}
	}

	componentDidMount() {

	}
	onOpen = () =>{
		let {isOpen} = this.state;
		this.setState({
			isOpen:!isOpen,
		})
	}
	onClick = () =>{
		this.onOpen();
		
	}
	onSubmit = () =>{

	}
	render() {
		let {isOpen} = this.state;
		return (
			
			 <div>
				 {/*
					<div style = {{height:2000,background:"#fff"}}>
						<TabCs
								isDetail='iconTab'
								label = "全部数据"
							>
							<TabC label='基本信息'>
								
									<EditFiled />
							</TabC> 

							<TabC label='个人信息'>
								<EditTable />
								
							</TabC>

							<TabC label='工作信息'>
								<RadioBug/>
							</TabC>
						</TabCs>
					</div>

				*/}
				<botton onClick = {this.onClick}>点击</botton>
			 	<LocationChoice open = {isOpen} onClose = {this.onOpen} onSubmit = {this.onSubmit} />
			 </div>
			 
		);
	}
}
export default reduxForm({ form: 'New'})(New);