import React, { PropTypes } from 'react';
import {Http} from 'kr/Utils';
import StationReservationFrom from './StationReservationFrom';
import StationReservationDel from './StationReservationDel';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Dialog,
	Section,
	Grid,
	Row,
	Col,
	Drawer,
	SearchForms,
	Button,
	KrField,
	KrDate,
	Title,
	ListGroup,
	ListGroupItem,
  	Tooltip,
	Message,
	CheckPermission
} from 'kr-ui';
import './index.less';
//招商线索

class StationReservation extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {

            searchParams:{
                communityId:"",
                date:"",
                endDate:"",
                page:1,
                pageSize:15,
				time:''
            },
   		    openDelStation:false,
   		    id:'',

		}

	}

	componentDidMount() {

	}


	deleteClick = (data) =>{
			this.setState({
   				 openDelStation:true,
   				 id:data.id
   			})
	}

    close = () => {
        this.setState({
   				openDelStation:false,
   			})
    }

    onDelSubmit = () =>{
    	const {id,searchParams} = this.state;
		let _this = this;
		Http.request("meeting-reservation-delete",{id:id}).then(function(response) {
			 _this.setState({
				 searchParams:{
					communityId:searchParams.communityId,
					date:searchParams.date,
					endDate:searchParams.endDate,
					page:1,
					pageSize:15,
					time:new Date()

				}
			 })
			 _this.close();

		}).catch(function(err) {
			Message.error(err.message);
		});

    }

    fromOnSubmit = (data) =>{
    	this.setState({
    		searchParams:{
    		communityId:data.communityId,
            date:data.createDateBegin,
            endDate:data.createDateEnd,
            page:1,
            pageSize:15,

            }
    	})
    }


	render() {
		const {openDelStation,searchParams} = this.state;
		return (

			<div className="m-station-reservation" style={{minHeight:910,background:'#fff'}}>
			<Title value="空间预订"/>
             <StationReservationFrom onSubmit = {this.fromOnSubmit}/>
			 <Table
				    style={{marginTop:8}}
	                ajax={true}
	                onProcessData={
							(state)=>{
								return state;
							}
						}
					onOperation={this.onOperation}
		            displayCheckbox={false}
		            ajaxParams={searchParams}
		            ajaxUrlName='station-reservation'
		            ajaxFieldListName="items"
				>
			            <TableHeader>
			              <TableHeaderColumn>社区</TableHeaderColumn>
			              <TableHeaderColumn>预约人</TableHeaderColumn>
			              <TableHeaderColumn>预约公司</TableHeaderColumn>
			              <TableHeaderColumn>预约时间</TableHeaderColumn>
			              <TableHeaderColumn>营业开始时间</TableHeaderColumn>
			              <TableHeaderColumn>营业结束时间</TableHeaderColumn>
			              <TableHeaderColumn>消耗积分</TableHeaderColumn>
			              <TableHeaderColumn>预约状态</TableHeaderColumn>
			              <TableHeaderColumn>操作</TableHeaderColumn>
			          	</TableHeader>

				        <TableBody >
				          <TableRow>
                                <TableRowColumn name="communityName" ></TableRowColumn>
                                <TableRowColumn name="memberName" ></TableRowColumn>
                                <TableRowColumn name="customerName"
									component={(value,oldValue) =>{
										var TooltipStyle=""
										if(value.length==""){
											TooltipStyle="none"

										}else{
											TooltipStyle="inline-block";
										}
											return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:130,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
											<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
									}}

								></TableRowColumn>
                                <TableRowColumn name="beginTime"
                                    component={(value,oldValue,itemData)=>{
                                        return (<KrDate value={value} format="yyyy-mm-dd"/>)
                                    }}
                                >
                                </TableRowColumn>
                                <TableRowColumn name="businessBeginTime"

                                >
                                </TableRowColumn>

								<TableRowColumn name="businessEndTime"

                                >
                                </TableRowColumn>
                                <TableRowColumn name="amount" ></TableRowColumn>
								<TableRowColumn name="disable"
									component={(value,oldValue) =>{
										if(value == "false"){
											return <span>已预约</span>;
										}else{
											return <span style = {{color:"red"}}>已取消</span>;
										}

									}}

								></TableRowColumn>

                                <TableRowColumn name = "deletable"
									component={(value,oldValue,itemData)=>{
										return (
											<CheckPermission  operateCode="oper_appointment_del" >
												<span style = {{color:"#499df1",cursor:'pointer'}} onClick = {this.deleteClick.bind(this,itemData)}>删除</span>
											</CheckPermission>
											)
										
                                    }}
								>

                                </TableRowColumn>
                        </TableRow>
                    </TableBody>
				    <TableFooter></TableFooter>
	           </Table>
               <Dialog
						title="提示"
						modal={true}
						open={openDelStation}
						onClose={this.close}
						bodyStyle={{paddingTop:34}}
						contentStyle={{width:446,height:236}}
					>
						<StationReservationDel  onClose={this.close} onSubmit = {this.onDelSubmit} />

			  </Dialog>

		</div>
		);
	}
}
export default StationReservation;
