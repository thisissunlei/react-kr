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

<<<<<<< HEAD
	// var elems = '<table class="main-table"><tbody><tr class="firstRow"><td width="537" valign="top" style="word-break: break-all;">姓名</td><td width="537" valign="top" style="word-break: break-all;">年龄</td><td width="537" valign="top" style="word-break: break-all;">性别</td></tr><tr><td width="537" valign="top" style="word-break: break-all;">{{name}}</td><td width="537" valign="top" style="word-break: break-all;">{{age}}</td><td width="537" valign="top" style="word-break: break-all;">{{sex}}</td></tr><tr><td width="537" valign="top"><br/></td><td width="537" valign="top"><br/></td><td width="537" valign="top"><br/></td></tr></tbody></table><p><br/><br/><br/></p><p><br/></p><table class="money-detail"><tbody><tr class="firstRow"><td width="537" valign="top" style="word-break: break-all;">明细名</td><td width="537" valign="top" style="word-break: break-all;">明细年龄</td><td width="537" valign="top" style="word-break: break-all;">明细性别</td></tr><tr><td width="537" valign="top" style="word-break: break-all;">{{name}}</td><td width="537" valign="top" style="word-break: break-all;">{{age}}</td><td width="537" valign="top" style="word-break: break-all;">{{sex}}</td></tr></tbody></table><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p>`img`<br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p>';


	componentDidMount() {}

=======
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
	onSubmit = (values) =>{
		this.onOpen();
	}
>>>>>>> feature/合同模板配件
	render() {
		let {isOpen} = this.state;
		return (
<<<<<<< HEAD
			<div style = {{height:2000,background:"#fff"}}>
			<TabCs
					  isDetail='iconTab'
					  label = "全部数据"
			      >
				  <TabC label='基本信息'>
				  		<RadioBug/>
					   
				  </TabC> 
=======
			
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
>>>>>>> feature/合同模板配件

							<TabC label='个人信息'>
								<EditTable />
								
							</TabC>

<<<<<<< HEAD
				  <TabC label='工作信息'>
				  	<EditFiled />
				  </TabC>
			  </TabCs>
			</div>
=======
							<TabC label='工作信息'>
								<RadioBug/>
							</TabC>
						</TabCs>
					</div>
>>>>>>> feature/合同模板配件

				*/}
				<botton onClick = {this.onClick}>点击</botton>
			 	<LocationChoice title = "选择工位" communityId = {4} url='stage-detail-search' open = {isOpen} onClose = {this.onOpen} onSubmit = {this.onSubmit} />
			 </div>
			 
		);
	}
}
export default reduxForm({ form: 'New'})(New);