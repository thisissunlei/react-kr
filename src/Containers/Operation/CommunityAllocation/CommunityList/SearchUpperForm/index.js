import React, {
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
	change,
} from 'redux-form';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	ListGroup,
	SearchForm,
	ListGroupItem
} from 'kr-ui';
import State from '../State';
import './index.less';
@observer
class SearchUpperForm extends React.Component {

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
			operType:props.operType,
			selectCity:false,
			searchKey:'',
			searchType:''
		}
	}
	

	onSubmit(values) {
	  
	  let {searchKey,searchType}=this.state;
	  values.searchKey=searchKey;
	  values.searchType=searchType;
	  values.pageSize=15;
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


	
	componentDidUpdate(prevProps, prevState){
		
			$('.m-merchants .dialog-body').scrollTop(558);

	}
	clickDiv=(event)=>{
		this.setState({
			dateBoxDevelop:!this.state.dateBoxDevelop,
		})

	}
	customerClick=()=>{
		this.setState({
			dateBoxDevelop:false,
		})
	}

	//查询
   onSearchSubmit=(params)=>{
   	  this.setState({
   	  	  searchKey:params.content,
   	  	  searchType:params.value,
   	  })
   }


	cityValue=(value,select,city)=>{
	  var arr=city.split('/');
      if(arr.length==2){
      	Store.dispatch(change('searchUpperForm','cityId',select));
      	this.setState({
      		selectCity:false
      	})
      }
      if(arr.length==3){
      	Store.dispatch(change('searchUpperForm','countyId',value));
      	this.setState({
      		selectCity:true
      	})
      }
    }

	

	render() {

	   let {handleSubmit}=this.props;
	   let {dateBoxStyle,dateBoxDevelop,selectCity}=this.state;
       
       let searchFilter=[
            {
            	label:'社区名称',
            	value:'NAME'
            },
            {
            	label:'社区编码',
            	value:'CODE'
            },

		]

        
       let cityCountId='';
       if(selectCity){
         cityCountId='countyId'
       }else{
       	 cityCountId='cityId'
       }
       
      


		return(
			<div style={dateBoxStyle} className='customer-searchUpper list-community-supper' onclick={this.customerClick}>
			    <form onSubmit={handleSubmit(this.onSubmit)}>
                <SearchForm placeholder='请输入关键字' searchFilter={searchFilter} style={{width:262,marginTop:57,marginLeft:-1,marginBottom:15}} onSubmit={this.onSearchSubmit} defaultFilter='NAME'/>
                <KrField  grid={1/2} style={{marginTop:1,width:262}} name={cityCountId} component="city" onSubmit={this.cityValue} label="所属地区" openCity  
                />
				<KrField  grid={1/2}  style={{marginLeft:28,width:262}}  name="opened" type="select"  label="社区状态" 
				 options={[{label:'已开业',value:'true'},{label:'未开业',value:'false'}]} 
				/>
				<KrField  grid={1/2}  name="businessAreaId" type="select"  style={{marginTop:4,width:262}} label="所属商圈" 
				  options={State.searchData}
				></KrField>
				<KrField  grid={1/2}  name="portalShow" type="select"  style={{marginTop:4,marginLeft:28,width:262}} label="官网显示状态" 
				  options={[{label:'显示',value:'true'},{label:'不显示',value:'false'}]}
				></KrField>
				<KrField grid={1/1}  component="group" label="开业时间" style={{marginTop:3}}>
				<div className='list-listDate'>
					<ListGroup>
						<ListGroupItem><div className='communityList-date-start' style={{width:260}} ><KrField  style={{width:260,marginLeft:-10,marginTop:2}} name="openDateBegin" component="date" /></div></ListGroupItem>
							<div className='communityList-line-down'><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
						<ListGroupItem><div className='communityList-date-end'><KrField name="openDateEnd" style={{width:260,marginTop:2}} component="date" /></div></ListGroupItem>
					</ListGroup>
                </div>
				</KrField>

				<Grid style={{marginTop:7,marginBottom:5,marginLeft:-24}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='list-btn-center'><Button  label="确定" type="submit"/></div>
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
