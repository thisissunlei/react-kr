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
@observer
class CustomerHighSea extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			progress:0
		}
	}

	openImportData=()=>{
      State.openImportFun();
      State.openProgressLoading();	
	}

	cancelImportData=()=>{
	  State.openImportFun();	
	}

	onLoadDemo=()=>{
		let url = `/mockjsdata/35/krspace-finance-web/cmt/market/import/actions/downloadTemplete`;
		window.location.href = url; 
	}

	importDataPost=(files)=>{
	  State.openProgressLoading();
	  let {progress}=this.state;
	  var _this=this;
	  for(var i=0;i<99;i++){
		  setTimeout(function(i){
           _this.setState({
           	 progress:i 
           })  
		  },i*1)       
	  }

	}



	render(){
           let {progress}=this.state;
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
						<LoadingProgress progress={progress}/>
                    </Dialog>

        </div>

          
		);
	}

}
export default CustomerHighSea;
