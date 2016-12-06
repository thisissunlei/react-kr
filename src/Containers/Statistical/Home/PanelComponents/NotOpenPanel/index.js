import React,{Component} from 'react';
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
	Form
} from 'kr-ui';
import './index.less';
import SearchNotDateForm from './SearchNotDateForm';


export default class Initialize  extends Component{
     
    static propTypes = {
		groupId:React.PropTypes.number,
		startDate:React.PropTypes.string
	}

	constructor(props,context){
		super(props, context);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	    this.state = {
			searchParams: {
				groupId:this.props.groupId,
				startDate:'',
				endDate:''
			}

		}

	}
    
    

    onStartNotChange=(searchParams)=>{
    	searchParams = Object.assign({}, this.state.searchParams, searchParams);
    	this.setState({
			searchParams
		});
    }
    onEndNotChange=(searchParams)=>{
    	searchParams = Object.assign({}, this.state.searchParams, searchParams);
    	this.setState({
			searchParams
		});
    }

    render(){
    	let {searchParams}=this.state;
        let start=Date.parse(dateFormat(searchParams.startDate,"yyyy-mm-dd hh:MM:ss"));
        let end=Date.parse(dateFormat(searchParams.endDate,"yyyy-mm-dd hh:MM:ss"));
        if(start>end){
          Message.error('开始时间不能大于结束时间');
        }
	   
	
        
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
							  <SearchNotDateForm onStartNotChange={this.onStartNotChange} onEndNotChange={this.onEndNotChange} date_2={this.props.startDate}/>
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
					<TableHeaderColumn>开业第一个月出租率</TableHeaderColumn>
					<TableHeaderColumn>开业第二个月出租率</TableHeaderColumn>
					<TableHeaderColumn>开业第三个月出租率</TableHeaderColumn>
					<TableHeaderColumn>新增意向工位</TableHeaderColumn>					
					<TableHeaderColumn>累计意向工位</TableHeaderColumn>
					<TableHeaderColumn>平均单价</TableHeaderColumn>							
				</TableHeader>

				<TableBody>
						 <TableRow>
						<TableRowColumn name="cityName" ></TableRowColumn>
						<TableRowColumn name="communityName"></TableRowColumn>
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
              </div>
            </div>
		  </div>
		);
	}

}
