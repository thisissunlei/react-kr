import React  from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import dateFormat from 'dateformat';
import {
	KrField,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	Grid,
	Row,
	Col,
	Notify,
	Dialog,
	ListGroup,
	ListGroupItem,
	Message,
	Tooltip,
	Form
} from 'kr-ui';
import './index.less';
import {Http} from "kr/Utils";

import SearchNotDateForm from './SearchNotDateForm';


export default class NotOpenPanel  extends React.Component{
		static displayName = 'NotOpenPanel';
		static defaultProps = {
				todayDate:'2017-1-1'
		}
    static propTypes = {
		groupId:React.PropTypes.number,
		todayDate:React.PropTypes.string
	}

	constructor(props,context){
		super(props, context);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	    this.state = {
			searchParams: {
				groupId:this.props.groupId,
				startDate:this.props.yesterday,
				endDate:this.props.yesterday
			},
			startValue:this.props.yesterday,
			endValue:this.props.yesterday

		}

	}


	openExprot = () =>{
		let {groupId} = this.props;
    let {endValue,startValue}=this.state;
		if(startValue>endValue){
			Message.error('开始时间不能大于结束时间');
			 return ;
		}
		var url = `/api/krspace-finance-web/stat/merchant/notopen/export?groupId=${groupId}&endDate=${endValue}&startDate=${startValue}`;
		window.location.href = url;
	}
    onStartNotChange=(startD)=>{
    	let {searchParams}=this.state;
        let start=Date.parse(dateFormat(startD,"yyyy-mm-dd hh:MM:ss"));
        let end=Date.parse(dateFormat(searchParams.endDate,"yyyy-mm-dd hh:MM:ss"))
        this.setState({
        	startValue:startD

        },function () {

        	if(start>end){
	         Message.error('开始时间不能大于结束时间');
	          return ;
	        }
	        let startDate=this.state.startValue;
	    	searchParams = Object.assign({}, searchParams, {startDate:this.state.startValue,endDate:this.state.endValue||searchParams.endDate});
	    	this.setState({
				searchParams
			},function(){
			});


        })

    }
    onEndNotChange=(endD)=>{
    	let {searchParams}=this.state;
        let start=Date.parse(dateFormat(searchParams.startDate,"yyyy-mm-dd hh:MM:ss"));
        let end=Date.parse(dateFormat(endD,"yyyy-mm-dd hh:MM:ss"));
        this.setState({
        	endValue:endD
        },function () {

        	if(start>end){
	         Message.error('开始时间不能大于结束时间');
	          return ;
	        }
	        let endDate=this.state.endValue;
	    	searchParams = Object.assign({}, searchParams, {startDate:this.state.startValue||searchParams.startDate,endDate:this.state.endValue,});
	    	this.setState({
				searchParams
			},function(){
			});

        })
    }

     componentWillReceiveProps(nextProps){
		 this.setState({
		 	searchParams:{
               groupId:nextProps.groupId,
               startDate:this.props.yesterday,
			   endDate:this.props.yesterday
		    }
		})
	 }

    render(){

    	let {searchParams}=this.state;
			let {yesterday, today} = this.props;
		return(
          <div className='notOpenBack' style={{background:'#fff',marginBottom:'20'}}>
			<div className='ui-open-in'>
				   <Grid style={{height:'76'}}>
						<Row>
							<Col align="left" md={4} style={{marginTop:'25'}}>
							 <span  className='ui-pic-Notopen'>招商数据统计-</span>
							 <span  className='static-openCompany'>未开业</span>
							 <span  className='static-upload'>实时更新</span>
							</Col>
							<Col align="right" md={8}>
							  <SearchNotDateForm onStartNotChange={this.onStartNotChange} onEndNotChange={this.onEndNotChange} yesterday={yesterday} today = {today} todayEndDate={searchParams.endDate}/>
							</Col>
						</Row>
					</Grid>

				   <div className='ui-table-wrap'>
					<Table style={{marginTop:0}}
						displayCheckbox={false}
						ajax={true}
						ajaxUrlName='notOpenCompanyData'
						ajaxFieldListName="list"
						ajaxParams={this.state.searchParams}
						  >
					<TableHeader>
					<TableHeaderColumn>城市</TableHeaderColumn>
					<TableHeaderColumn>社区</TableHeaderColumn>
					<TableHeaderColumn>总工位</TableHeaderColumn>
					<TableHeaderColumn>可出租工位</TableHeaderColumn>
					<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>开业</span><span style={{display:'inline-block',lineHeight:'16px'}}>第一个月出租率</span></TableHeaderColumn>
					<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>开业</span><span style={{display:'inline-block',lineHeight:'16px'}}>第二个月出租率</span></TableHeaderColumn>
					<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>开业</span><span style={{display:'inline-block',lineHeight:'16px'}}>第三个月出租率</span></TableHeaderColumn>
					<TableHeaderColumn>新增意向工位</TableHeaderColumn>
					<TableHeaderColumn>累计意向工位</TableHeaderColumn>
					<TableHeaderColumn>平均单价</TableHeaderColumn>
				</TableHeader>

				<TableBody>
						 <TableRow>
						<TableRowColumn name="cityName" ></TableRowColumn>
						<TableRowColumn name="communityName"  component={(value,oldValue)=>{
							 var maxWidth=6;
							 if(value.length>maxWidth){
							 	value = value.substring(0,6)+"...";
							 }
                             return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
						}} ></TableRowColumn>
						<TableRowColumn name="totalStation"></TableRowColumn>
						<TableRowColumn name="unUsedStation"></TableRowColumn>
						<TableRowColumn name="firstMonth"></TableRowColumn>
						<TableRowColumn name="secondMonth"></TableRowColumn>
						<TableRowColumn name="thirdMonth"></TableRowColumn>
						<TableRowColumn name="newIntention" ></TableRowColumn>
						<TableRowColumn name="totalIntention"></TableRowColumn>
						<TableRowColumn name="averagePrice"></TableRowColumn>

					 </TableRow>
				</TableBody>
				</Table>
				<div style={{position:'relative',marginTop:20,left:0,textAlign:"left"}}  >
					<Button  label="导出" type="button" onTouchTap = {this.openExprot}/>
				</div>
              </div>
            </div>
		  </div>
		);
	}

}
