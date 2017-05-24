import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

import {
	Actions,
	Store
} from 'kr/Redux';
import {
	Http,
	DateFormat
} from "kr/Utils";

import {
	reduxForm,
	formValueSelector,
	change
} from 'redux-form';
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
	Tooltip,
	Section,
	Grid,
	Row,
	Col,
	Dialog,
	SearchForms,
	KrDate,
	Message
} from 'kr-ui';
import './index.less';
import SearchForm from './SearchForm';
import HighSearchForm from './HighSearchForm';
export default class HoldList extends React.Component {

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
	searchParams = (value) => {
		 let {searchParams} = this.state;
        if (value.filter == 'community') {
            this.setState({
                searchParams: {
                    page: 1,
                    pageSize: 15,
                    communityName: value.content
                }
            })
        }
        if (value.filter == 'type') {
            this.setState({
                searchParams: {
                    page: 1,
                    pageSize: 15,
                    typeName: value.content
                }
            })
        }
	}

	render() {


		return (
			<div className="g-hold-list">
				<Section title="支持列表" >
					<Grid style={{marginBottom:22,marginTop:2}}>
						<Row>
						<Col md={4} align="left" > </Col>
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
          ajaxUrlName='get-question-list'
          ajaxParams={this.state.searchParams}
          onOperation={this.onOperation}
            >
        <TableHeader>
        <TableHeaderColumn>社区名称</TableHeaderColumn>
				<TableHeaderColumn>客户名称</TableHeaderColumn>
        <TableHeaderColumn>问题类型</TableHeaderColumn>
				<TableHeaderColumn>内容</TableHeaderColumn>
				<TableHeaderColumn>联系人</TableHeaderColumn>
				<TableHeaderColumn>联系电话</TableHeaderColumn>
				<TableHeaderColumn>创建时间</TableHeaderColumn>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableRowColumn name="communityName" ></TableRowColumn>
 					<TableRowColumn name="company" component={(value)=>{
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
                 }}>></TableRowColumn>
          <TableRowColumn name="typeName"></TableRowColumn>
					<TableRowColumn name="content" component={(value)=>{
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
				<TableRowColumn name="mbrName"></TableRowColumn>
				<TableRowColumn name="phone"></TableRowColumn>
				<TableRowColumn type="date" name="time" component={(value)=>{
					return (
						<KrDate value={value} format="yyyy-mm-dd hh:MM:ss"/>
					)
				}}> </TableRowColumn>
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
