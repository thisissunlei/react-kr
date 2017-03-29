import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {
	reduxForm,
	submitForm,
	change,
	reset
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
			sureStatus:{
			 sureCode:'',
			 sureMessage:''	
			},
			refreshState:false	
		}
	}

	openImportData=()=>{
	  if(State.selectCode==-1){
	  	this.reloadTipSubmit(); 
	  }else{
	  	State.openImportFun();  
	  }	         
	}

    reloadTipSubmit=()=>{
           State.importContent();
      	   if(State.statusCode==-2){
  	         State.openSureTip();
             this.setState({
              	 sureStatus:{
              	 	sureCode:-2,
              	 	sureMessage:State.statusMessage
              	 }
             }) 
		  }
		  if(State.statusCode==-3){
              State.openSureTip();
               _this.setState({
              	 sureStatus:{
              	 	sureCode:-3,
              	 	sureMessage:State.statusMessage
              	 }
              })
	      }	
    }

	reloadSubmit=()=>{
	  State.openImportFun();
	}
	cancelImportData=()=>{
	  State.openImportFun();	
	}
	cancelSureTip=()=>{	
	  State.selectCode='';  
	  State.openSureTip();	
	}

	onLoadDemo=()=>{
		let url = `/mockjsdata/35/krspace-finance-web/cmt/market/import/actions/downloadTemplete`;
		window.location.href = url; 
	}

	importDataPost=(num)=>{
		this.cancelImportData();
	    State.openProgressLoading();
	    var _this=this;
		var timer = window.setInterval(function() {
			if (State.percentage==100) {
				_this.setState({
					style:false
				})
			 }
			  State.importContent(num);
			  if(State.statusCode==-2){
			  	  window.clearInterval(timer);
			  	  State.openProgressLoading();
                  State.openSureTip();
                  _this.setState({
                  	 sureStatus:{
                  	 	sureCode:-2,
                  	 	sureMessage:State.statusMessage
                  	 },
                  	 refreshState:true                	 
                  })
                  State.selectCode=-2;
                  State.searchParamsData();
              }
              if(State.statusCode==-3){
              	  window.clearInterval(timer);
			  	  State.openProgressLoading();
                  State.openSureTip();
                   _this.setState({
                  	 sureStatus:{
                  	 	sureCode:-3,
                  	 	sureMessage:State.statusMessage
                  	 },
                  	 refreshState:false  
                  })
                  State.selectCode=-3;
              }
              if(State.statusCode==1){
              	 window.clearInterval(timer);
			  	 State.openProgressLoading();
              	 State.openLoading=false;
              	 Message.success('导入成功'); 
              	 State.searchParamsData();
              	 _this.setState({
              	 	refreshState:true  
              	 })        
              }
              if(State.statusCode==-1){
              	 window.clearInterval(timer);
              	 State.openProgressLoading();
              	 Message.error(State.statusMessage); 
              	 State.selectCode=-1;
              	  _this.setState({
              	 	refreshState:false  
              	 })           	  
              }
			_this.setState({
			  progress:State.percentage	
			})
		},1000);		 
	 }



	render(){
		   let {progress,style,sureStatus,refreshState}=this.state;
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
				            <SearchData refreshState={refreshState}/>
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
			                <TableRowColumn name="company"></TableRowColumn>
			                <TableRowColumn name="contact" ></TableRowColumn>
			                <TableRowColumn name="tel"></TableRowColumn>
			                <TableRowColumn name="email"></TableRowColumn>
			                <TableRowColumn name="cityName"></TableRowColumn>
			                <TableRowColumn name="address"></TableRowColumn>
			                <TableRowColumn name="sourceName"></TableRowColumn>
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
						  sureStatus={sureStatus}
						  reloadSubmit={this.reloadSubmit}
						/>
                    </Dialog>

        </div>

          
		);
	}

}
export default CustomerHighSea;
