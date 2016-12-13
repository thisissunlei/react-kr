import React, {
	Component
} from 'react';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
  Notify,
} from 'kr-ui';
import dateFormat from 'dateformat';
import SearchUpdateLog from './SearchUpdateLog';
export default class UpdateLog extends Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	static propTypes = {
	 memberId:React.PropTypes.number
	}
  constructor(props, context) {
		super(props, context);
		this.onLoaded = this.onLoaded.bind(this);
		this.state = {
      searchParams:{
				memberId:this.context.router.params.memberId,
				page:1,
				pageSize:15
			},
			item: {},
			list: {},
			organizationChart: {
				page: 1,
				pageSize: 15
			}
		}
	}
  onLoaded(response) {
		let list = response;
    // console.log(list,"更新日志list");

		this.setState({
			list,
		})
	}
  onStartChange=(startTime)=>{
    let {searchParams}=this.state;
    let start=Date.parse(dateFormat(startTime,"yyyy-mm-dd hh:MM:ss"));
    let end=Date.parse(dateFormat(searchParams.endTime,"yyyy-mm-dd hh:MM:ss"))
    if(searchParams.endTime && start>end ){
      Notify.show([{
        message: "结束时间要小于开始时间",
        type: 'danger',
      }]);
      return ;
    }
    searchParams = Object.assign({}, searchParams, {startTime});
    this.setState({
    	searchParams
  	});
  }
  onEndChange=(endTime)=>{
    let {searchParams}=this.state;
    let start=Date.parse(dateFormat(searchParams.startTime,"yyyy-mm-dd hh:MM:ss"));
    let end=Date.parse(dateFormat(endTime,"yyyy-mm-dd hh:MM:ss"));
    if(searchParams.startTime && start>end){
      Notify.show([{
  			message: "结束时间要小于开始时间",
  			type: 'danger',
  		}]);
			return ;
    }
    searchParams = Object.assign({}, searchParams, {endTime});
    this.setState({
    	searchParams
  	});
  }
  render(){
    let {
			list,
      searchParams,
		} = this.state;

		if (!list.totalCount) {
			list.totalCount = 0;
		}
    return (
      <div style={{height:'860'}}>
        <div>
          <span style={{float:'left',color:'#499df1',marginTop:'30'}}>Krspace轨迹</span>
          <SearchUpdateLog  onStartChange={this.onStartChange} onEndChange={this.onEndChange}/>
        </div>
      <Table
          style={{}}
          displayCheckbox={false}
          onLoaded={this.onLoaded}
          ajax={true}
          ajaxFieldListName='items'
          ajaxUrlName='getUpdateLog'
          ajaxParams={this.state.searchParams}
        >
        <TableHeader>
          <TableHeaderColumn>会员ID</TableHeaderColumn>
          <TableHeaderColumn>操作类型</TableHeaderColumn>
          <TableHeaderColumn>操作结果</TableHeaderColumn>
          <TableHeaderColumn>操作记录</TableHeaderColumn>
          <TableHeaderColumn>操作人</TableHeaderColumn>
          <TableHeaderColumn>操作时间</TableHeaderColumn>
          <TableHeaderColumn>操作人IP</TableHeaderColumn>
      </TableHeader>

      <TableBody style={{position:'inherit'}}>
          <TableRow displayCheckbox={true}>
              <TableRowColumn name="memberId" ></TableRowColumn>
              <TableRowColumn name="businessObjId" ></TableRowColumn>
              <TableRowColumn name="businessObj" ></TableRowColumn>
              <TableRowColumn name="operateRecord" ></TableRowColumn>
              <TableRowColumn name="operater" ></TableRowColumn>
              <TableRowColumn name="operater" ></TableRowColumn>
              <TableRowColumn name="operateIp" ></TableRowColumn>
         </TableRow>
      </TableBody>

      <TableFooter></TableFooter>

      </Table>

      </div>
    )
  }
}
