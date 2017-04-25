import React, {
	Component,
	PropTypes
} from 'react';

import {
	Menu,
	MenuItem,
	BreadCrumbs,
	Loading,
	Notify,
	Section,
	Button,
	SplitLine,
	DotTitle,
	KrField,
	LabelText,
	PaperBack,
	KrDate,
	Title,
} from 'kr-ui';

import {Http} from 'kr/Utils'

import RaisedButton from 'material-ui/RaisedButton';
import dateFormat from 'dateformat';

import {
	Actions,
	Store
} from 'kr/Redux';

import {
	Grid,
	Row,
	Col
} from 'kr-ui/Grid';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter
} from 'kr-ui/Table';
// import './index.less';
export default class JoinDetail extends Component {

	static contextTypes = {
		params: React.PropTypes.object.isRequired
	}

	constructor(props, context) {
		super(props, context);


		this.state = {
			loading: true,
			basic: {
				payment: {},
			},
			oldBasicStationVos:[],
			openAdd:false,
			openMinus:false,
			newBasicStationVos:[]
		}

		this.BasicRender = this.BasicRender.bind(this);
		this.getOrderUrl = this.getOrderUrl.bind(this);

	}

	addClick=()=>{
      let {oldBasicStationVos,newBasicStationVos,openMinus,openAdd}=this.state;
	   this.setState({
	  	 newBasicStationVos:oldBasicStationVos,
	  	 openMinus:true,
	  	 openAdd:false
	    })
	}

	minusClick=()=>{
      let {oldBasicStationVos,newBasicStationVos,openAdd,openMinus}=this.state;
	   this.setState({
	  	 newBasicStationVos:oldBasicStationVos.slice(0,5),
	  	 openAdd:true,
	  	 openMinus:false
	    })
	}

	componentDidMount() {

		var _this = this;
		Http.request('show-checkin-agreement', {
				id: this.props.params.id
			})
			.then(function(response) {
				_this.setState({
					basic: response,
					loading: false,
					oldBasicStationVos:response.stationVos
				},function(){
					let {newBasicStationVos,oldBasicStationVos,openAdd}=_this.state;
			       if(oldBasicStationVos&&oldBasicStationVos.length>5){
			            _this.setState({
			            	newBasicStationVos:oldBasicStationVos.slice(0,5),
			            	openAdd:true
			            })
			        }
			        if(oldBasicStationVos&&oldBasicStationVos.length<=5){
			        	_this.setState({
			        		newBasicStationVos:oldBasicStationVos,
			        		openAdd:false
			        	})
			        }
				});
			}).catch(function(err) {
				Notify.show([{
					message: err.message,
					type: 'danger'
				}]);
			});

	}

	componentWillMount() {

	}

	componentWillReceiveProps(){
    	let {newBasicStationVos,oldBasicStationVos,openAdd}=this.state;
       if(oldBasicStationVos&&oldBasicStationVos.length>5){
            this.setState({
            	newBasicStationVos:oldBasicStationVos.slice(0,5),
            	openAdd:true
            })
        }
        if(oldBasicStationVos&&oldBasicStationVos.length<=5){
        	this.setState({
        		newBasicStationVos:oldBasicStationVos,
        		openAdd:false
        	})
        }
    }

     addRender=()=>{
    	    var _this=this;
            let add='';
             add=(<div onClick={_this.addClick} className='arrow-wrap'><span className='arrow-open'>展开</span><span className='arrow-pic'></span></div>)
            return add
        }

     minusRender=()=>{
    	 var _this=this;
            let minus='';
             minus=(<div onClick={_this.minusClick} className='arrow-wrap'><span className='arrow-open'>收起</span><span className='arrow-pic-do'></span></div>)
            return minus
    }


	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	 }

	getOrderUrl() {
		const params = this.props.params;
		return `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/detail`;
	}
	BasicRender(basic,newBasicStationVos,openAdd,openMinus) {
		var _this=this;
		const content = {
			position: 'relative',
			width: '100%',
			margin: '0 auto',
			fontSize: 14
		}
		const info = {
			paddingBottom: 10
		}

		return (
			<div className="content" style={content}>

					<Title value="入驻协议书详情页_财务管理"/>
				  	<div className="customer-close" onMouseUp={this.onCancel}></div>
				    <span className="content-title">入驻协议书详情页</span>

                    <DotTitle title='租赁明细'>
						<Table displayCheckbox={false}>
							<TableHeader>
									<TableHeaderColumn>类别</TableHeaderColumn>
									<TableHeaderColumn>编号／名称</TableHeaderColumn>
									<TableHeaderColumn>单价（元／月）</TableHeaderColumn>
									<TableHeaderColumn>起始日期</TableHeaderColumn>
									<TableHeaderColumn>结束日期</TableHeaderColumn>
							</TableHeader>
							<TableBody>

							{
								newBasicStationVos && newBasicStationVos.map((item,index)=>{

								return (
									<TableRow key={index}>
										<TableRowColumn>{(item.stationType == 1) ?'工位':'会议室'}</TableRowColumn>
										<TableRowColumn>
										{item.stationName}
										</TableRowColumn>
										<TableRowColumn>
											{item.unitprice}
										</TableRowColumn>
										<TableRowColumn><KrDate value={item.leaseBeginDate}/></TableRowColumn>
										<TableRowColumn><KrDate value={item.leaseEndDate}/></TableRowColumn>
									</TableRow>
								);
								})
							}

							</TableBody>
						</Table>

						 {openAdd&&_this.addRender()}
			             {openMinus&&_this.minusRender()}


					</DotTitle>

				 <div className="content-info" style={info} >
                   <div className='detail-first'>
					<KrField component="labelText" grid={1/2} label="出租方：" value={basic.lessorName} defaultValue="无" requireBlue={true} toolTrue='true'/>
					<KrField component="labelText" grid={1/2} left={60} label="地址：" value={basic.lessorAddress} defaultValue="无" requireBlue={true} toolTrue='true'/>

					<KrField component="labelText" grid={1/2} label="联系人：" value={basic.lessorContactName} defaultValue="无" requireBlue={true} toolTrue='true'/>
					<KrField component="labelText" grid={1/2} left={60} label="电话：" value={basic.lessorContacttel} defaultValue="无" requireBlue={true} toolTrue='true'/>

					<KrField component="labelText" grid={1/2} label="承租方：" value={basic.customerName} defaultValue="无" requireBlue={true} toolTrue='true'/>
					<KrField component="labelText" grid={1/2} left={60} label="地址：" value={basic.leaseAddress} defaultValue="无" requireBlue={true} toolTrue='true'/>

					<KrField component="labelText" grid={1/2} label="联系人：" value={basic.leaseContact} defaultValue="无" requireBlue={true} toolTrue='true'/>
					<KrField component="labelText" grid={1/2} left={60} label="电话：" value={basic.leaseContacttel} defaultValue="无" requireBlue={true} toolTrue='true'/>
				</div>
					<SplitLine style={{display:'none'}}/>
				<div className='detail-first'>
					<KrField component="labelText" grid={1/2} label="所属社区：" value={basic.communityName} defaultValue="无" requireBlue={true} toolTrue='true'/>
					<KrField component="labelText" grid={1/2} left={60} label="所属楼层：" value={basic.wherefloor} defaultValue="无" requireBlue={true} toolTrue='true'/>

					<KrField component="labelText" grid={1/2} label="地址：" value={basic.communityAddress} defaultValue="无" requireBlue={true} toolTrue='true'/>
					<KrField component="labelText" grid={1/2} left={60} label="合同编号：" value={basic.contractcode} defaultValue="无" requireBlue={true} toolTrue='true'/>

					<KrField component="labelText" grid={1/2} label="支付方式：" value={basic.payType && basic.payType.dicName} defaultValue="无" requireBlue={true} toolTrue='true'/>
					<KrField component="labelText" grid={1/2} left={60} label="租赁期限：" value={`${dateFormat(basic.leaseBegindate,"yyyy-mm-dd")}——${dateFormat(basic.leaseEnddate,"yyyy-mm-dd")}`} defaultValue="无" requireBlue={true}/>
					<KrField component="labelText" grid={1/2} label="首付款时间：" value={ dateFormat(basic.firstpaydate,"yyyy-mm-dd")} defaultValue="0" requireBlue={true}/>
					<KrField component="labelText" grid={1/2} left={60} label="付款方式：" value={basic.payment && basic.payment.dicName} defaultValue="无" requireBlue={true} toolTrue='true'/>

					<KrField component="labelText" grid={1/2} label="签署日期：" value={dateFormat(basic.signdate,"yyyy-mm-dd")} defaultValue="0" requireBlue={true}/>

					<KrField component="labelText" left={60} label="租赁工位：" grid={1/2}  value={basic.stationnum} requireBlue={true} defaultValue="0" toolTrue='true'/>
					<KrField component="labelText" label="租赁办公室：" grid={1/2} value={basic.boardroomnum} requireBlue={true} defaultValue="0" toolTrue='true'/>

					<KrField component="labelText" grid={1/2}  left={60} label="租金总额：" value={basic.totalrent} defaultValue="0" requireBlue={true} toolTrue='true'/>
					<KrField component="labelText" grid={1/2} label="押金总额：" value={basic.totaldeposit} defaultValue="0" requireBlue={true} toolTrue='true'/>


					<KrField component="labelText"  label="备注：" value={basic.contractmark} defaultValue="无" requireBlue={true} inline={false}/>
					<KrField   name="agreement" component="labelText" label="双方其他约定内容" value={basic.agreement} defaultValue="无" requireBlue={true} inline={false}/>


					<KrField component="group" label="上传附件：" requireBlue={true}>
							{basic.contractFileList && basic.contractFileList.map((item,index)=>{
								return <Button label={item.fileName} type="link" href={item.fileUrl} key={index}/>
							})}
			  		</KrField>

                       </div>

					</div>
			</div>
		);

	};

	print = () => {
		const params = this.props.params;
		let url = `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/agreement/join/${params.id}/print`
		var newWindow = window.open(url);

	}
	render() {

		if (this.state.loading) {
			return (<Loading/>);
		}
		const params = this.props.params;
		const orderBaseInfo = {};
		const contractList = [];


		const {
			basic,
			newBasicStationVos,
			openAdd,
			openMinus
		} = this.state;


		function getOrderUrl() {
			return `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/detail`;
		}

		return (

			<div>

			<BreadCrumbs children={['社区运营',,'合同详情','入驻合同查看']}/>


			{this.BasicRender(basic,newBasicStationVos,openAdd,openMinus)}
			 <Grid style={{marginTop:5,marginBottom:50}}>
				  <Row>
					  <Col md={5} align="center"></Col>
					  <Col md={2} align="center"> <Button  label="打印"   backgroundColor="#499df1" width={100} height={40} fontSize={16} onClick={this.print}/></Col>
					  <Col md={5} align="center"></Col>
				  </Row>
			  </Grid>

      </div>

		);
	}
}
