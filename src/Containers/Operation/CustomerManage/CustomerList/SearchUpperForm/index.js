import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
import {
	Actions,
	Store
} from 'kr/Redux';
import {
	reduxForm,
	formValueSelector,
	initialize,
	change,
	arrayPush,
	arrayInsert,
	FieldArray,
	reset
} from 'redux-form';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	ListGroup,
	ListGroupItem
} from 'kr-ui';

import './index.less';
@observer
class SearchUpperForm extends Component {

	static propTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

	}
	

	onSubmit(values) {
	  const {
		   onSubmit
		} = this.props;
		onSubmit && onSubmit(values);
	}

	onCancel() {
	   const {
			onCancel
		} = this.props;
		onCancel && onCancel();		
	}

	renderSigned=()=>{
		   let {flag,searchParams,searchSignParams}=this.props;
		    if(searchParams){
		    	var cityList=searchParams.intentionCities;
			    var communityList=searchParams.intentionCommunities;
			    var levelList=searchParams.levelIds;
			    var sourceList=searchParams.sourceIds;
		    }
		    if(searchSignParams){
		    	var belongCity=searchSignParams.cities;
			    var belongCommunity=searchSignParams.communities
		    }
			
		      var selectData='';
              if(flag=='签约'){
			     selectData=(<div> <KrField grid={1/2} right={34}  name="company" type="text" label="公司名称"/> 
				<KrField right={34} grid={1/2}  style={{marginLeft:-5}} name="cityId" type="select" label="所属城市" 
				 options={belongCity}
				/>
				<KrField  grid={1/2} right={34} name="communityId" type="select" style={{marginTop:4}} label="所属社区" 
				 options={belongCommunity}
				></KrField></div>) 
		       }else{
                 selectData=(<div><KrField grid={1/2} right={34}  name="company" type="text" label="公司名称"/>
                <KrField right={34} grid={1/2} style={{marginLeft:-5}} name="intentionCityId" type="select" label="意向城市" 
                 options={cityList}
                />
				<KrField  grid={1/2} right={34} name="intentionCommunityId" style={{marginTop:4}} type="select"  label="意向社区" 
				 options={communityList}
				></KrField>
				<KrField  grid={1/2} right={34} style={{marginLeft:-5,marginTop:4}}  name="levelId" type="select"  label="客户分类" 
				 options={levelList} 
				/>
				<KrField  grid={1/2} right={34} name="sourceId" type="select"  style={{marginTop:4}} label="客户来源" 
				  options={sourceList}
				></KrField></div>)
		       }		       
		
		return (             
			selectData   				
		);
	}


	

	render() {

	   let {handleSubmit}=this.props;


		return(
			<div style={{marginTop:35,marginLeft:26}} className='customer-searchUpper'>
			    <form onSubmit={handleSubmit(this.onSubmit)}>
				    {this.renderSigned()}
				<KrField grid={1/1}  component="group" label="创建时间" style={{marginTop:3}}>
				<div className='ui-listDate'><ListGroup>
					<ListGroupItem><div className='ui-date-start'><KrField  right={6} style={{marginLeft:-10,marginTop:2}} name="createStartDate" component="date" /></div></ListGroupItem>
						<div className='ui-line-down'><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
						<ListGroupItem><div className='ui-date-end'><KrField  right={6} name="createEndDate" style={{marginTop:2}} component="date" /></div></ListGroupItem>
					</ListGroup>
                </div>
				</KrField>

				<Grid style={{marginTop:7,marginBottom:5,marginLeft:-24}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div>
								<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
				</form>  
			</div>
		);
	}
}


export default reduxForm({form:'searchUpperForm',enableReinitialize:true,keepDirtyOnReinitialize:true})(SearchUpperForm);
