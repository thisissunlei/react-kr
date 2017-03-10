import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
import {
	DateFormat,
} from 'kr/Utils';
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
	Drawer,
	Tabs,
	Tab,
	Tooltip,
	ButtonGroup,
	KrDate,
    SplitLine,
} from 'kr-ui';
import './index.less'
@observer
class WatchCommunityList extends Component{

	constructor(props,context){
		super(props, context);
		

	}
	onSubmit = (values) => {
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	}

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
	
	

	
	render(){
        

		let evenStyle={width:'280px',marginLeft:-10}
		let oddStyle={width:'290px',marginLeft:-10}

		let detail={

		}

		let hasOffice={

		}

		let unifyStyle={

		}
		let uniStyle={

		}

		let basic={

		}
		

		let tooltipTextStyle={maxWidth:"224px",whiteSpace:"normal",wordWrap:"break-word",height:"auto",lineHeight:"22px",overflow:"hidden"};
		
		return(
	      <div className="m-lookCustomerList m-newMerchants" style={{paddingLeft:8}}>
		      	<div className="title" >
					<div><span className="look-new-icon"></span><label className="title-text">123</label></div>
					<div className="look-close" onClick={this.onCancel}></div>
				</div>    
		  

	      <div className="m-LookDetailed" style={{marginTop:8}}>
		      <div className='detail-first'>
                    <KrField component="labelText" grid={1/2} label="出租方：" value={basic.lessorName} requireBlue={true} toolTrue='true'/>
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


					<KrField label="定金总额："   grid={1/2} component="labelText" value={basic.totaldownpayment} defaultValue="0" requireBlue={true} toolTrue='true'/>
					<KrField label="签署日期："   grid={1/2} left={60} component="labelText" type="date" value={basic.signdate} defaultValue="0" requireBlue={true}/>

			<KrField label="合同编号："   grid={1/2} component="labelText" value={basic.contractcode} defaultValue="无" requireBlue={true} toolTrue='true'/>
			<KrField label="付款方式："   left={60} grid={1/2} component="labelText"  defaultValue="无" requireBlue={true} toolTrue='true'/>

				<KrField label="租赁工位："   grid={1/2} component="labelText" value={basic.stationnum} defaultValue="0" requireBlue={true} toolTrue='true'/>
					<KrField label="租赁会议室："  left={60} grid={1/2} component="labelText" value={basic.boardroomnum} defaultValue="0" requireBlue={true} toolTrue='true'/>
					<KrField label="租赁期限："   grid={1/2}  component="labelText"  defaultValue="0" requireBlue={true}/>

<KrField label="保留天数："   grid={1/2} component="labelText" left={60} value={basic.templockday} defaultValue="0" requireBlue={true} toolTrue='true'/>

<KrField label="备注："   grid={1/1} component="labelText" value={basic.contractmark} defaultValue="无" requireBlue={true} inline={false}/>

					<KrField component="group" label="上传附件：" requireBlue={true}>
							{basic.contractFileList && basic.contractFileList.map((item,index)=>{
								return <Button label={item.fileName} type="link" href={item.fileUrl} key={index}/>
							})}
			  		</KrField>

                      </div>
			</div>	
			
	      </div>

		);
	}

}
export default WatchCommunityList