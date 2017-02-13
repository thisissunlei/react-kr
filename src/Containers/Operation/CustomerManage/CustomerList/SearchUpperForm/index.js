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
import $ from 'jquery';
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
		this.state={
			dateBoxDevelop:false,
			dateBoxStyle:{marginTop:35,marginLeft:26 ,height:"auto"},
			operType:props.operType
		}

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

	onChangeIntend=(person)=>{
		Store.dispatch(change('SearchUpperForm','intentionCommunityId',person.value));
    }
    onChangeSign=(person)=>{
		Store.dispatch(change('SearchUpperForm','communityId',person.value));
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
			     selectData=(<div><KrField grid={1/2} right={34}  name="company" type="text" label="公司名称"/> 
				<KrField right={34} grid={1/2}  style={{marginLeft:-5}} name="cityId" type="select" label="签约城市" 
				 options={belongCity}
				/>
				<KrField  grid={1/2} right={34} name="communityId"  style={{marginTop:4}} component='searchSign' label="签约社区" inline={false} onChange={this.onChangeSign} placeholder='请输入社区名称'/>
				<KrField grid={1/1}  component="group" label="签约时间" style={{marginTop:3}}>
				<div className='ui-listDate' onClick={this.clickDiv}>
					<ListGroup>
						<ListGroupItem><div className='ui-date-start' style={{width:260}} ><KrField  style={{width:260,marginLeft:-10,marginTop:2}} name="signStartDate" component="date" /></div></ListGroupItem>
							<div className='ui-line-down'><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
						<ListGroupItem><div className='ui-date-end'><KrField name="signEndDate" style={{width:260,marginTop:2}} component="date" /></div></ListGroupItem>
					</ListGroup>
                </div>
				</KrField></div>) 
		       }else{
                 selectData=(<div><KrField grid={1/2} right={34}  name="company" type="text" label="公司名称"/>
                <KrField right={34} grid={1/2} style={{marginLeft:-5}} name="intentionCityId" type="select" label="意向城市" 
                 options={cityList}
                />
				<KrField  grid={1/2} right={34} name="intentionCommunityId" style={{marginTop:4}} component='searchIntend'  label="意向社区" inline={false} onChange={this.onChangeIntend} placeholder='请输入社区名称'/>
				<KrField  grid={1/2} right={34} style={{marginLeft:-5,marginTop:4}}  name="levelId" type="select"  label="客户分类" 
				 options={levelList} 
				/>
				<KrField  grid={1/2} right={34} name="sourceId" type="select"  style={{marginTop:4}} label="客户来源" 
				  options={sourceList}
				></KrField>
				<KrField grid={1/1}  component="group" label="创建时间" style={{marginTop:3}}>
				<div className='ui-listDate' onClick={this.clickDiv}>
					<ListGroup>
						<ListGroupItem><div className='ui-date-start' style={{width:260}} ><KrField  style={{width:260,marginLeft:-10,marginTop:2}} name="createStartDate" component="date" /></div></ListGroupItem>
							<div className='ui-line-down'><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
						<ListGroupItem><div className='ui-date-end'><KrField name="createEndDate" style={{width:260,marginTop:2}} component="date" /></div></ListGroupItem>
					</ListGroup>
                </div>
				</KrField></div>)
		       }		       
		
		return (             
			selectData   				
		);
	}
	componentDidUpdate(prevProps, prevState){
		
			$('.m-merchants .dialog-body').scrollTop(558);

		
			$('.m-personal .dialog-body').scrollTop(558);

		
			$('.m-signed .dialog-body').scrollTop(558);
		
	}
	clickDiv=(event)=>{
		this.setState({
			dateBoxDevelop:!this.state.dateBoxDevelop,
		})

		// var tt=$('.m-merchants .dialog-body').;
	}
	customerClick=()=>{

		this.setState({
			dateBoxDevelop:false,
		})
	}

	

	render() {

	   let {handleSubmit}=this.props;
	   let {dateBoxStyle,dateBoxDevelop}=this.state;
	   // if(dateBoxDevelop){
	   // 	dateBoxStyle.width="558px";
	   // }else{
	   // 	dateBoxStyle.width="auto";
	   // }
	   // console.log(dateBoxDevelop,">>>>>>")


		return(
			<div style={dateBoxStyle} className='customer-searchUpper' onclick={this.customerClick}>
			    <form onSubmit={handleSubmit(this.onSubmit)}>
				    {this.renderSigned()}

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
