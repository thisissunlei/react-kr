import React, {PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {
	toJS
} from 'mobx';
import {DateFormat} from 'kr/Utils';
import {reduxForm,initialize} from 'redux-form';
import {
	observer,
	mobx
} from 'mobx-react';
import {
	Store
} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button
} from 'kr-ui';
import './index.less';
import State from '../State';
@observer
 class EditGuide extends  React.Component{

	static PropTypes = {
		
	}

	constructor(props){
		super(props);
		this.state={
			initializeValues:{}
		}
	}
	
	componentDidMount(){

      	Store.dispatch(initialize('EditGuide', State.guideEditItem));

	}

	componentWillReceiveProps(nextProps) {
      
	}
	onSubmit=(values)=>{
		console.log("values",values);
		State.EditGuideItemFun(values);
	}
	onCancel=()=>{
		State.switchOpenEditGuideFun();
	}
    
	render(){
     
    let {openDown,openUp}=this.state;

		const { error, handleSubmit, pristine, reset,dataReady,open} = this.props;

		return (
        	<div className="add-community-guide-form">
        		<form onSubmit={handleSubmit(this.onSubmit)}>
        			<div className="close-new-div">
			          <img src={require('../images/closeIcon.svg')} className="close-new-img" onClick={this.onCancel}/>
			        </div>
					<div className="add-guide-title">编辑指南</div>
					<div className="add-guide-container">
						<KrField grid={1/2} name="guideTitle" type="text"  label="指南标题"  style={{display:'block',width:'252px'}}/>
						<KrField component="editor" name="guideContent" label="指南内容" defaultValue={State.guideEditItem.guideContent} style={{marginTop:"5px"}}/>
						<Grid style={{marginTop:18,marginBottom:'4px'}}>
							<Row>
								<ListGroup>
									<ListGroupItem style={{width:'310px',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定" type="submit"/></ListGroupItem>
									<ListGroupItem style={{width:'254px',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} /></ListGroupItem>
								</ListGroup>					
							</Row>
						</Grid>
					</div>
				</form>
			</div>
		);
	}
}

export default reduxForm({ form: 'EditGuide',enableReinitialize:true,keepDirtyOnReinitialize:true})(EditGuide);
