import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {
	reduxForm,
	submitForm,
	change,
} from 'redux-form';
import {
	observer
} from 'mobx-react';
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
	Title,
	Tooltip,
	Message
} from 'kr-ui';
import './index.less';
import State from './State';
import ImportData from './ImportData';
import SearchData from './SearchData';
import LoadingProgress from './LoadingProgress';
import SureTipBtn from './SureTipBtn';
@observer
class CustomerHighSea extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			progress:0,
			style:true,
		}
	}

	openImportData=()=>{
		var storage=sessionStorage.getItem("selectCode");
	  if(storage==-1||storage==100){
	  	this.reloadTipSubmit();
	  }else{
			State.refreshState=0;
	  	State.openImportFun();
	  }
	}

  reloadTipSubmit=()=>{
      State.importContent('',true);
  }

	reloadSubmit=()=>{
		State.refreshState=0;
	  State.openImportFun();
		State.openSureTip();
	}
	cancelImportData=()=>{
		sessionStorage.setItem("selectCode",-100);
	  State.openImportFun();
	}
	cancelSureTip=()=>{
		sessionStorage.setItem("selectCode",-100);
	  State.openSureTip();
	}

	onLoadDemo=()=>{
		let url = `/api/krspace-finance-web/csr/market/import/actions/download-templete`;
		window.location.href = url;
	}

	importDataPost=(num)=>{
		if(State.statusCode==-1){
				this.cancelImportData();
				Message.error(err.message);
				sessionStorage.setItem("selectCode",-1);
				return ;
		}
		this.setState({
			progress:0
		})
	  State.openProgressLoading();
		this.cancelImportData();
		sessionStorage.setItem("selectCode",100);
	  var _this=this;
		State.statusCode='';
		var timer = window.setInterval(function() {
			 if (State.percentage==100) {
				_this.setState({
					style:false
					})
				}
				_this.setState({
					progress:State.percentage,
				})
			  if(State.statusCode==-2){
			  	  window.clearInterval(timer);
						  setTimeout(function(){
							    State.openProgressLoading();
	                  State.openSureTip();
										State.refreshState=-2;
										sessionStorage.setItem("selectCode",-100);
	                  State.searchParamsData();
						    },400);
								return ;
              }
              if(State.statusCode==-3){
              	  window.clearInterval(timer);
								  setTimeout(function(){
			  	        State.openProgressLoading();
                  State.openSureTip();
									State.refreshState=-3;
									sessionStorage.setItem("selectCode",-100);
								},400);
								return ;
              }
              if(State.statusCode==1){
              	 window.clearInterval(timer);
								 setTimeout(function(){
			  	       State.openProgressLoading();
              	 Message.success('导入成功');
								 State.refreshState=1;
								 sessionStorage.setItem("selectCode",-100);
								 State.searchParamsData();
							 },400);
							 return ;
              }
              if(State.statusCode==-1){
              	 window.clearInterval(timer);
              	 State.openProgressLoading();
              	 Message.error(State.statusMessage);
								 sessionStorage.setItem("selectCode",-1);
								 State.refreshState=-1;
								 return ;
              }
							State.importContent(num);
		},1000);
	 }



	render(){
		   let {progress,style,sureStatus}=this.state;
           return(
            <div className="m-highSea">
			 <Title value="客户公海列表"/>
			 <Section title="客户公海列表" description="" style={{marginBottom:-5,minHeight:910}}>
	         <Row>
			          <Col
					     align="left"
					     style={{float:'left',marginTop:3}}
					   >
							<Button
									label="导入"
									type='button'
									onTouchTap={this.openImportData}
							/>
					  </Col>

			          <Col style={{marginTop:-15,float:'right'}}>
				            <SearchData refreshState={State.refreshState}/>
			          </Col>
	         </Row>


            <Table
			    style={{marginTop:8}}
              ajax={true}
	            displayCheckbox={true}
	            ajaxParams={State.searchParams}
	            ajaxUrlName='highSeaSearch'
	            ajaxFieldListName="items"
					  >
		            <TableHeader>
		              <TableHeaderColumn>客户名称</TableHeaderColumn>
		              <TableHeaderColumn>联系人</TableHeaderColumn>
		              <TableHeaderColumn>联系方式</TableHeaderColumn>
		              <TableHeaderColumn>电子邮箱</TableHeaderColumn>
		              <TableHeaderColumn>城市</TableHeaderColumn>
		              <TableHeaderColumn>地址</TableHeaderColumn>
		              <TableHeaderColumn>客户来源</TableHeaderColumn>
		              <TableHeaderColumn>导入时间</TableHeaderColumn>
		          	</TableHeader>

			        <TableBody >
			              <TableRow>
			                <TableRowColumn name="company" component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="inline-block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:130,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap",paddingTop: '6px'}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
													 }} ></TableRowColumn>
			                <TableRowColumn name="contact" ></TableRowColumn>
			                <TableRowColumn name="tel"></TableRowColumn>
			                <TableRowColumn name="email" component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="inline-block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:130,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap",paddingTop: '6px'}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
													 }}></TableRowColumn>
			                <TableRowColumn name="cityName"></TableRowColumn>
			                <TableRowColumn name="address" component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="inline-block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:130,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap",paddingTop: '6px'}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
													 }} ></TableRowColumn>
			                <TableRowColumn name="sourceName" component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="inline-block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:130,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap",paddingTop: '6px'}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
													 }} ></TableRowColumn>
			                <TableRowColumn name="createDate" type='date'></TableRowColumn>
			               </TableRow>
			        </TableBody>
			        <TableFooter></TableFooter>
            </Table>
          </Section>

                  {/*导入*/}
                    <Dialog
						title="批量导入"
						modal={true}
						onClose={this.cancelImportData}
						open={State.openImport}
						contentStyle ={{ width: '446'}}
					>
						<ImportData
						  importDataPost={this.importDataPost}
						  onCancel={this.cancelImportData}
						  onLoadDemo={this.onLoadDemo}
						  />
                   </Dialog>


                    {/*进度条*/}
                    <Dialog
						open={State.openLoading}
						contentStyle ={{ width: '446px',height:'236px'}}
						dialogHeaderStyle={{background:'#fff'}}
					>
						<LoadingProgress progress={progress} style={style}/>
                    </Dialog>

                     {/*确定提示弹框*/}
                    <Dialog
                        title="提示"
						modal={true}
						onClose={this.cancelSureTip}
						open={State.openTip}
						contentStyle ={{ width: '446px',height:'236px'}}
					>
						<SureTipBtn
						  onCancel={this.cancelSureTip}
						  reloadSubmit={this.reloadSubmit}
						/>
                    </Dialog>

        </div>


		);
	}

}
export default CustomerHighSea;
