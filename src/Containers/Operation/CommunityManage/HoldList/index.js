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
	Message,
	Drawer,
	Title
} from 'kr-ui';
import './index.less';
import SearchForm from './SearchForm';
import HighSearchForm from './HighSearchForm';
import Handle from './Handle';
import ViewOpinion from './ViewOpinion';
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
			openHandle:false,
			openView:false,

		}
	}

//操作相关
	onOperation = (type, itemDetail) => {
		this.setState({
			itemDetail
		});
		if (type == 'handle') {
			this.openHandle();
		}else if (type == 'view') {
			this.openView()
		}
	}
	openHandle=()=>{
		this.setState({
			openHandle:!this.state.openHandle
		})
	}
	openView=()=>{
		this.setState({
			openView:!this.state.openView
		})
	}

	handleSubmit=()=>{
		this.setState({
			searchParams:{
				time:new Date(),
			}
		});
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

		let {itemDetail}=this.state;
		return (
			<div className="g-hold-list">
				<Title value="意见反馈"/>
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
        	<TableHeaderColumn>内容</TableHeaderColumn>
			<TableHeaderColumn>姓名</TableHeaderColumn>
			<TableHeaderColumn>联系电话</TableHeaderColumn>
			<TableHeaderColumn>创建时间</TableHeaderColumn>
			<TableHeaderColumn>状态</TableHeaderColumn>
			<TableHeaderColumn>操作</TableHeaderColumn>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableRowColumn name="cmtName" ></TableRowColumn>
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
                   return (<div style={styles} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:260,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
                    <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                 }}>
          </TableRowColumn>
          <TableRowColumn name="mbrName"></TableRowColumn>
          <TableRowColumn name="phone"></TableRowColumn>
		  <TableRowColumn type="date" name="ctime" component={(value)=>{
			return (
				<KrDate value={value} format="yyyy-mm-dd hh:MM:ss"/>
			)
		  }}> </TableRowColumn>
		  <TableRowColumn 
            	name="handled" 
            	component={(value) => {
            		if(value==1){
            			return <span className="u-font-green">已处理</span>
            		}else{
            			return  <span className="u-font-red">未处理</span>
            		}
                    
                }}
            ></TableRowColumn>
            <TableRowColumn>
            	<Button label="查看" type="operation" operation="view" />
            	<Button label="处理" type="operation" operation="handle" />
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
				<Dialog
		              title="处理"
		              modal={true}
		              contentStyle ={{ width: '662',overflow:'visible'}}
		              open={this.state.openHandle}
		              onClose={this.openHandle}
		            >
		              <Handle 
						  onCancel={this.openHandle}
						  onSubmit={this.handleSubmit}
		              />
		            </Dialog>
		            <Drawer
		             modal={true}
		             width={750}
		             open={this.state.openView}
		             onClose={this.openView}
		             openSecondary={true}
		             containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
		           >
	             	<ViewOpinion
	             			onCancel={this.openView} 
	             			detail={itemDetail}
	             	 />
	           </Drawer>

			</div>
		);
	}

}
