import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import {
	Actions,
	Store
} from 'kr/Redux';
import {
	Http,
	DateFormat,
} from "kr/Utils";

import {
	reduxForm,
	formValueSelector,
	change
} from 'redux-form';
import {
	KrField,
	Table,
	Drawer,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Tooltip,
	Section,
	Grid,
	Row,
	Col,
	ListGroupItem,
	ListGroup,
	Dialog,
	SearchForms,
	KrDate,
	Message
} from 'kr-ui';
import './index.less';
import SearchForm from './SearchForm';
import HighSearchForm from './HighSearchForm';
export default class VersionManage extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			searchParams: {
				page: 1,
				pageSize: 15,
			},
			itemDetail: '',
			openHighSearch: false,
		}
	}

//高级查询
openHighSearch = () => {
    this.setState({
      openHighSearch: !this.state.openHighSearch
    })
  }

	onSearchSubmit = (form) => {
		this.setState({
			searchParams:form
		})
		this.openHighSearch();
	}
//普通查询
	searchParams = (form) => {
		var _this = this;
		this.setState({
			searchParams: {
				page: 1,
				pageSize: 15,
				phone: form.content
			}
		})
	}

	render() {
		let {itemDetail} = this.state;

		return (
			<div className="g-version-list">
				<Section title="APP登录日志" >
					<Grid style={{marginBottom:22,marginTop:2}}>
						<Row>
						<Col md={4} align="left" >
						</Col>
						<Col md={8} align="right">
							<div className="u-search">
									<SearchForm onSubmit={this.searchParams} openSearch={this.openHighSearch} />
							</div>
						</Col>
					  </Row>
					</Grid>
          <Table
          style={{marginTop:10}}
          displayCheckbox={false}
          onLoaded={this.onLoaded}
          ajax={true}
          ajaxUrlName='mobile-login-log'
          ajaxParams={this.state.searchParams}
          onOperation={this.onOperation}
            >
        <TableHeader>
        <TableHeaderColumn>手机号</TableHeaderColumn>
        <TableHeaderColumn>登录结果</TableHeaderColumn>
        <TableHeaderColumn>设备类型</TableHeaderColumn>
        <TableHeaderColumn>app版本</TableHeaderColumn>
				<TableHeaderColumn>设备信息</TableHeaderColumn>
				<TableHeaderColumn>备注</TableHeaderColumn>
        <TableHeaderColumn>登录时间</TableHeaderColumn>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableRowColumn name="phone" ></TableRowColumn>
          <TableRowColumn name="successfulName"></TableRowColumn>
					<TableRowColumn name="osTypeName" ></TableRowColumn>
	        <TableRowColumn name="appVersion"></TableRowColumn>
							<TableRowColumn name="sysInfo" component={(value)=>{
			                  var styles = {
			                    display:'block',
			                    paddingTop:5
			                  };
			                  if(value.length==""){
			                    styles.display="none"

			                  }else{
			                    styles.display="block";
			                  }
			                   return (<div style={styles} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
			                    <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
			                 }}>
			        </TableRowColumn>
							<TableRowColumn name="remark" component={(value)=>{
			                  var styles = {
			                    display:'block',
			                    paddingTop:5
			                  };
			                  if(value.length==""){
			                    styles.display="none"

			                  }else{
			                    styles.display="block";
			                  }
			                   return (<div style={styles} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
			                    <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
			                 }}>
			        </TableRowColumn>
							<TableRowColumn type="date" name="ctime" component={(value)=>{
			            return (
			              <KrDate value={value} format="yyyy-mm-dd hh:MM:ss"/>
			            )
			          }}> 
							</TableRowColumn>
         </TableRow>
      </TableBody>
      <TableFooter></TableFooter>
      </Table>
				</Section>

				<Dialog
					title="高级查询"
					modal={true}
					open={this.state.openHighSearch}
					onClose={this.openHighSearch}
					contentStyle={{width:666}}
				>
					<HighSearchForm
								onSubmit={this.onSearchSubmit}
								onCancel={this.openHighSearch}
					/>
				</Dialog>


			</div>
		);
	}

}
