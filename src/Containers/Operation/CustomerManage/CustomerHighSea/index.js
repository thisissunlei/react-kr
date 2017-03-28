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
			style:true
		}
	}

	openImportData=()=>{
	  State.importContent();
      State.openImportFun();
      //State.openSureTip();
	}

	cancelImportData=()=>{
	  State.openImportFun();	
	}
	cancelSureTip=()=>{
	  State.openSureTip();	
	}

	onLoadDemo=()=>{
		let url = `/mockjsdata/35/krspace-finance-web/cmt/market/import/actions/downloadTemplete`;
		window.location.href = url; 
	}

	importDataPost=(files)=>{
	  State.openProgressLoading();
	   var _this=this;
		var timer = window.setInterval(function() {
			if (State.percentage==20) {
				window.clearInterval(timer);
				_this.setState({
					style:false
				})
			}
			State.importContent(12);
			_this.setState({
			  progress:State.percentage	
			})
		},1000);		 
	 }



	render(){
		   let {progress,style}=this.state;
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
				            <SearchData />
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
						  onSubmit={this.importDataPost} 
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
                          onSubmit={this.importDataPost} 
						  onCancel={this.cancelSureTip} 
						/>
                    </Dialog>

        </div>

          
		);
	}

}
export default CustomerHighSea;
