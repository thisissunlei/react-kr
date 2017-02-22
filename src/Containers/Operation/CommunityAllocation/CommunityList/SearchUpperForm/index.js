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
import State from '../State';
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

	

	render() {

	   let {handleSubmit}=this.props;
	   let {dateBoxStyle,dateBoxDevelop}=this.state;
       
       if(State.searchData.businessAreas){
       	  let businessData=State.searchData.businessAreas;
       	  var dataBusi=[];
          businessData.map((item,index)=>{
             var list = {}
				list.value = item.id;
				list.label = item.name;
				dataBusi.push(list); 
           }) 

       }


		return(
			<div style={dateBoxStyle} className='customer-searchUpper' onclick={this.customerClick}>
			    <form onSubmit={handleSubmit(this.onSubmit)}>
				<KrField grid={1/2} right={34}  name="searchType" type="text" label="社区名称" value={'NAME'}/>
                <KrField right={34} grid={1/2} style={{marginLeft:-5}} name="cityId" type="select" label="所属城市" 
                />
				<KrField  grid={1/2} right={34} name="countyId" style={{marginTop:4}} component='searchIntend'  label="所属区县" inline={false} onChange={this.onChangeIntend} placeholder='请输入社区名称'/>
				<KrField  grid={1/2} right={34} style={{marginLeft:-5,marginTop:4}}  name="opened" type="select"  label="社区状态" 
				 options={[{label:'已开业',value:'true'},{label:'未开业',value:'false'}]} 
				/>
				<KrField  grid={1/2} right={34} name="businessAreaId" type="select"  style={{marginTop:4}} label="所属商圈" 
				  options={dataBusi}
				></KrField>
				<KrField  grid={1/2} right={34} name="portalShow" type="select"  style={{marginTop:4,marginLeft:-4}} label="官网显示状态" 
				  options={[{label:'显示',value:'true'},{label:'不显示',value:'false'}]}
				></KrField>
				<KrField grid={1/1}  component="group" label="开业时间" style={{marginTop:3}}>
				<div className='ui-listDate'>
					<ListGroup>
						<ListGroupItem><div className='ui-date-start' style={{width:260}} ><KrField  style={{width:260,marginLeft:-10,marginTop:2}} name="openDateBegin" component="date" /></div></ListGroupItem>
							<div className='ui-line-down'><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
						<ListGroupItem><div className='ui-date-end'><KrField name="openDateEnd" style={{width:260,marginTop:2}} component="date" /></div></ListGroupItem>
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
