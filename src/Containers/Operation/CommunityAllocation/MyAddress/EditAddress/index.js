import React from 'react';
import {
	toJS
} from 'mobx';
import {DateFormat} from 'kr/Utils';
import {reduxForm,initialize,change,FieldArray} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	observer,
	mobx
} from 'mobx-react';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	Message,
} from 'kr-ui';
import './index.less';
import State from '../State';
@observer
 class NewCommunityList extends React.Component{

	static PropTypes = {

	}

	constructor(props){
		super(props);
		this.state={
			
		}
	}
  	componentDidMount(){

  		console.log("guideItem发的时间阿凡达技术开发大赛里卡多方式离开");
  		console.log("guideItem",State.guideItem);
  	}

	onSubmit = (values) => {
  
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
  	}

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	closeEdit=()=>{
		State.switchEditAddress();
	}
   
	componentWillReceiveProps(nextProps) {
	}






	render(){

		return (
	      <div className="new-my-address">
	        <div className="close-new-div">
	          <img src={require('../images/closeIcon.svg')} className="close-new-img" onClick={this.closeEdit}/>
	        </div>
	        <Tabs className="new-my-address-tabs" inkBarStyle={{background:"#499df1",top:0}} initialSelectedIndex={-1} tabTemplateStyle={{color:"#333"}} style={{width:100}}>
	          <Tab label="基本信息">

	          </Tab>
	          <Tab label="社区指南">
	            <div className="community-guide-box">
	              <Button  label="添加指南" type="button"  onTouchTap={this.onCancel}/>

	            </div>
	          </Tab>
	        </Tabs>
	      </div>
		);
	}
}
const validate = values =>{

		const errors = {};


      // if(!values.area){
      //   errors.area='请输入社区面积';
      // }

		return errors
	}
export default reduxForm({ form: 'NewCommunityList',validate,enableReinitialize:true,keepDirtyOnReinitialize:true})(NewCommunityList);
