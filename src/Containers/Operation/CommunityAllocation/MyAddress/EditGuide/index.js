import React, {PropTypes} from 'react';
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
	Store,
	connect
} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	DrawerTitle,
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
			initializeValues:{},
			titleLen:0
		}
	}
	
	componentDidMount(){

      	Store.dispatch(initialize('EditGuide', State.guideEditItem));
      	if(State.guideEditItem.guideTitle){
      		this.setState({

      			titleLen:State.guideEditItem.guideTitle.length
      		})
      	}else{
      		this.setState({

      			titleLen:0
      		})
      	}
      	

	}

	componentWillReceiveProps(nextProps) {
      
	}
	onSubmit=(values)=>{

		State.EditGuideItemFun(values);
	}
	onCancel=()=>{
		State.switchOpenEditGuideFun();
	}

	titleChang=(value)=>{

		this.setState({
			titleLen:value.length
		})
	}
    
	render(){
  
    	let {titleLen}=this.state;
		const { error, handleSubmit, pristine, reset,dataReady,open} = this.props;

		return (
        	<div className="add-community-guide-form">
        		<form onSubmit={handleSubmit(this.onSubmit)}>
        			<div style={{marginLeft:10,marginBottom:30}}>
						<DrawerTitle title ='编辑指南' onCancel = {this.onCancel}/>
			        </div>
					<div className="add-guide-container">
						<KrField grid={1/2} name="guideTitle" type="text" requireLabel={true} label="指南标题" maxLength={10} onChange={this.titleChang} style={{display:'inline-block',width:'252px'}}/>
						<span style={{display: "inline-block",width: 50,height: 40,margin: "33px 0 0 10px"}}>{titleLen}/10</span>
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
const validate = values =>{

	const errors = {};

    if(!values.guideTitle){
    	errors.guideTitle='指南标题为必填';
    }
	return errors
}

export default reduxForm({ 
	form: 'EditGuide',
	validate,
	enableReinitialize:true,
	keepDirtyOnReinitialize:true
})(EditGuide);

