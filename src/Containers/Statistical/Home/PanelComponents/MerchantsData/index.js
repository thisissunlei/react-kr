import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import {Actions,Store} from 'kr/Redux';
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
	Dialog,
	Tabs,
	Tab,
	Title,
	Message
} from 'kr-ui';
import './index.less'
import SearchDateForm from './SearchDateForm';

class MerchantsData  extends Component{

	constructor(props,context){
		super(props, context);
		this.state = {
			searchParams: {
				groupId:this.props.groupId,
				startDate:this.props.todayDate,
				endDate:this.props.todayDate
			},
			startValue:'',
			endValue:''
		}
	}

	onStartChange=(startD)=>{

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
			console.log(searchParams,this.state.endValue,"uuu")

			});


        })

    }
    onEndChange=(endD)=>{
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




	componentDidMount() {

	}

	render(){


			return(
				<div className='open-merchants-data' style={{background:'#fff',marginBottom:'20'}}>
					<div className='ui-open-info'>
						<Grid style={{height:'76'}}>
							<Row>
								<Col align="left" md={4} style={{marginTop:'25'}}>
									<span  className='ui-pic-open'>招商数据统计-</span>
									<span  className='static-openCompany'>已开业</span>
									<span  className='static-upload'>实时更新</span>
								</Col>
								<Col align="right" md={8}>
									<SearchDateForm onStartChange={this.onStartChange} onEndChange={this.onEndChange} />
								</Col>
							</Row>
						</Grid>
								<div className = 'ui-table-wrap'>

								<Table style={{marginTop:0}}
									displayCheckbox={false}
									ajax={true}

									ajaxFieldListName="list"
									ajaxParams={this.state.searchParams}
										>
									}
								<TableHeader>
								<TableHeaderColumn>开业状态</TableHeaderColumn>
								<TableHeaderColumn>城市</TableHeaderColumn>
								<TableHeaderColumn>社区</TableHeaderColumn>
								<TableHeaderColumn>新增客户</TableHeaderColumn>
								<TableHeaderColumn>参观客户</TableHeaderColumn>
								<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>意向</span><span style={{display:'inline-block',lineHeight:'16px'}}>工位数</span></TableHeaderColumn>
								<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>签约入驻</span><span style={{display:'inline-block',lineHeight:'16px'}}>客户数</span></TableHeaderColumn>
								<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>签约续租</span><span style={{display:'inline-block',lineHeight:'16px'}}>客户数</span></TableHeaderColumn>
								<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>签约增租</span><span style={{display:'inline-block',lineHeight:'16px'}}>客户数</span></TableHeaderColumn>
								<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>签约减租</span><span style={{display:'inline-block',lineHeight:'16px'}}>客户数</span></TableHeaderColumn>
								<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>签约退租</span><span style={{display:'inline-block',lineHeight:'16px'}}>客户数</span></TableHeaderColumn>
								<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>签约入驻</span><span style={{display:'inline-block',lineHeight:'16px'}}>工位/独立空间</span></TableHeaderColumn>
								<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>签约续租</span><span style={{display:'inline-block',lineHeight:'16px'}}>工位/独立空间</span></TableHeaderColumn>
								<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>签约增租</span><span style={{display:'inline-block',lineHeight:'16px'}}>工位/独立空间</span></TableHeaderColumn>
								<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>签约减租</span><span style={{display:'inline-block',lineHeight:'16px'}}>工位/独立空间</span></TableHeaderColumn>
								<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>签约退租</span><span style={{display:'inline-block',lineHeight:'16px'}}>工位/独立空间</span></TableHeaderColumn>
							</TableHeader>

							<TableBody>
									 <TableRow>
									<TableRowColumn name="cityName"></TableRowColumn>
									<TableRowColumn name="communityName"  component={(value,oldValue)=>{
										 var maxWidth=6;
										 if(value.length>maxWidth){
											value = value.substring(0,6)+"...";
										 }
																	 return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
									}} ></TableRowColumn>
									<TableRowColumn name="totalStation"></TableRowColumn>
									<TableRowColumn name="unUsedStation" ></TableRowColumn>
									<TableRowColumn name="usedStation"></TableRowColumn>
									<TableRowColumn name="leftStation"></TableRowColumn>
									<TableRowColumn name="rateAll"></TableRowColumn>
									<TableRowColumn name="lastRate"></TableRowColumn>
									<TableRowColumn name="rateChange"></TableRowColumn>
									<TableRowColumn name="rate"></TableRowColumn>
									<TableRowColumn name="chainRate"></TableRowColumn>
									<TableRowColumn name="newIntention"></TableRowColumn>
									<TableRowColumn name="totalIntention"></TableRowColumn>
									<TableRowColumn name="averagePrice"></TableRowColumn>
								 </TableRow>
							</TableBody>
							</Table>
							</div>
					</div>
		 		</div>
			);
		}
}
export default MerchantsData;
