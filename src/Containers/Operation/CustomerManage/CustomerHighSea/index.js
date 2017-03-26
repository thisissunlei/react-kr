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
	ListGroup,
	ListGroupItem
} from 'kr-ui';
import './index.less';
import State from './State';
import ImportData from './ImportData';
@observer
class CustomerHighSea extends React.Component{

	constructor(props,context){
		super(props, context);

	}

	openImportData=()=>{
      State.openImportFun();	
	}

	cancelImportData=()=>{
	  State.openImportFun();	
	}

	render(){

           return(
            <div className="m-highSea">
			 <Title value="客户公海列表"/>
			 <Section title="客户公海列表" description="" style={{marginBottom:-5,minHeight:910}}>
	         <Row style={{marginBottom:21}}>
			          <Col
					     align="left"
					     style={{float:'left'}}
					   >
							<Button
									label="导入"
									type='button'
									onTouchTap={this.openImportData}
							/>
					  </Col>

			          <Col  align="right" style={{marginTop:0,float:"right",marginRight:-10}}>
				          <ListGroup>
				            <ListGroupItem></ListGroupItem>
				            <ListGroupItem></ListGroupItem>
				          </ListGroup>
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
						contentStyle ={{ width: '446',height:'322'}}
					>
						<ImportData 
						  onSubmit={this.importSubmit} 
						  onCancel={this.cancelImportData}
						  />
           </Dialog>

        </div>

          
		);
	}

}
export default CustomerHighSea;
