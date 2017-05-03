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
	ListGroup,
	ListGroupItem
 
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
			cityId:'',
			openDown:true,
      openUp:false,
      communityName:'',
      codeName:''
		}
	}
  	componentDidMount(){
      
 	}

	onSubmit = (values) => {
  
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
  	}

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	closeNew=()=>{
		State.switchNewAddress();
	}
   

   




	componentWillReceiveProps(nextProps) {
	}


	onOpenAddGuide=()=>{
		State.switchOpenAddGuideFun();
	}

	// 编辑指南
	editGuide=(item,index)=>{

		State.guideEditItem =item;
		State.Editindex = index;
		State.switchOpenEditGuideFun();

	}
	// 删除指南
	deleteGuide=(item,index)=>{

		State.switchOpenDeleteItemGuideFun(item,index);

	}



	render(){
		return (
	      <div className="new-my-address">
	        <div className="close-new-div">
	          <img src={require('../images/closeIcon.svg')} className="close-new-img" onClick={this.closeNew}/>
	        </div>
	      
	        <div className="community-guide-list-box">
	        	<div style={{marginBottom:19}}>
	        	<Button  label="添加指南" type="button"  onTouchTap={this.onOpenAddGuide}/>
	        	</div>
	        	{
	        		State.addGuideList.length>0?<div className="community-duide-list">
	        		{
	        			State.addGuideList.map((item,index)=>{
	        				return(
	        					<div className="guide-list-item" key={index}>
	        						<span>{item.communityGuideTitle}</span>
	        						<div className="operation-btn">
	        							<span onClick={this.editGuide.bind(this,item,index)}>编辑</span>
	        							<span onClick={this.deleteGuide.bind(this,item,index)}>删除</span>
	        						</div>
	        						
	        					</div>
	        					);
	        			})
	        		}
	        	</div>:<div className="community-duide-list-no">
	          		<img src={require('../images/hasNo.png')} className="list-no-img" onClick={this.closeNew}/>
	        	</div>
	        	}
	        	<Grid style={{marginTop:18,marginBottom:'4px'}}>
					<Row>
						<ListGroup>
							<ListGroupItem style={{width:'310px',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定" type="submit"/></ListGroupItem>
							<ListGroupItem style={{width:'254px',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} /></ListGroupItem>
						</ListGroup>					
					</Row>
				</Grid>

	        	
	        </div>
        
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
