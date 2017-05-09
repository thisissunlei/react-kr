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
	Message
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

            },
   		    openDelStation:false,
            
		}
	
	}

	componentDidMount() {
		
	}
  

	onOperation = (type, itemDetail) =>{

		if(type === "delete"){
			this.setState({
   				 openDelStation:true,
   				id:itemDetail.id
   			})
		}
	}
    close = () => {
        this.setState({
   				openDelStation:false,
   			})
    }

    onDelSubmit = () =>{

    }
	
	
	render() {
		const {openDelStation,searchParams} = this.state;
		return (

			<div className="m-station-reservation" style={{minHeight:910,background:'#fff'}}>
			<Title value="工位预约列表"/>
             <StationReservationFrom />
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
			              <TableHeaderColumn>预定会员</TableHeaderColumn>
			              <TableHeaderColumn>预订客户</TableHeaderColumn>
			              <TableHeaderColumn>预定时间</TableHeaderColumn>
			              <TableHeaderColumn>消耗积分</TableHeaderColumn>
			              <TableHeaderColumn>操作</TableHeaderColumn>
			          	</TableHeader>

				        <TableBody >
				          <TableRow>
                                <TableRowColumn name="id" ></TableRowColumn>
                                <TableRowColumn name="name" component={(value,oldValue) =>{

                                                            var TooltipStyle=""
                                                            if(value.length==""){
                                                                TooltipStyle="none"

                                                            }else{
                                                                TooltipStyle="inline-block";
                                                            }
                                                            return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:130,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
                                                                <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                                                        }}></TableRowColumn>
                                <TableRowColumn name="createName" ></TableRowColumn>
                                <TableRowColumn name="createDate"
                                    component={(value,oldValue)=>{
                                        return (<KrDate value={value} format="yyyy-mm-dd"/>)
                                    }}
                                                >
                                </TableRowColumn>
                                <TableRowColumn name="updateDate"
                                    component={(value,oldValue)=>{
                                                                    return (<KrDate value={value} format="yyyy-mm-dd"/>)
                                    }}
                                >
                                </TableRowColumn>

                                <TableRowColumn type="operation">
                                    <Button label="删除"  type="operation"  operation="delete" />
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
