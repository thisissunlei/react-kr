import React from 'react';

import { connect } from 'react-redux';


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
    Dialog,
    KrDate,
    Message
} from 'kr-ui';


import CreateForm from './CreateForm';


class UpdateLog extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			itemDetail: '',
			openCreateDialog: false,
		}
	}
	//操作相关
	onOperation = (type, itemDetail) => {
		this.setState({
			itemDetail
		});

		if (type == 'view') {
			this.openViewDialog();
		}else if (type == 'edit') {
			this.openEditDialog();
		}
	}


	openCreateDialog = () => {
		this.setState({
			openCreateDialog: !this.state.openCreateDialog
		})
	}

    onCancel = ()=>{
        this.openCreateDialog();
    }

    onSubmit = ()=>{
        this.openCreateDialog();
    }

	render() {
		let {itemDetail} = this.state;

		return (
			<div className="g-applogin-list">
				<Section title="Pc版本管理" >
					<Grid style={{marginBottom:22,marginTop:2}}>
						<Row>
						<Col md={4} align="left" >
								<Button label="新建" type="button" operateCode="sso_appVersion_new" onClick={this.openCreateDialog} width={70} height={26} fontSize={14}/>
						</Col>
					  </Row>
					</Grid>
          <Table
          style={{marginTop:10}}
          displayCheckbox={false}
          ajax={true}
          ajaxUrlName='get-version-list'
          onOperation={this.onOperation}
          >
        <TableHeader>
        <TableHeaderColumn>编号</TableHeaderColumn>
        <TableHeaderColumn>版本号</TableHeaderColumn>
		<TableHeaderColumn>更新内容</TableHeaderColumn>
        <TableHeaderColumn>发布状态</TableHeaderColumn>
        <TableHeaderColumn>发布时间</TableHeaderColumn>
		<TableHeaderColumn>创建时间</TableHeaderColumn>
		<TableHeaderColumn>创建人</TableHeaderColumn>
		<TableHeaderColumn>操作</TableHeaderColumn>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableRowColumn name="version" ></TableRowColumn>

          <TableRowColumn name="osTypeName"></TableRowColumn>
          <TableRowColumn name="osTypeName"></TableRowColumn>
          <TableRowColumn name="osTypeName"></TableRowColumn>

          <TableRowColumn name="appTypeName"></TableRowColumn>

		<TableRowColumn name="updateInfo" component={(value)=>{
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
		<TableRowColumn type="date" name="publishTime" component={(value)=>{
            return (
              <KrDate value={value} format="yyyy-mm-dd HH:MM:ss"/>
            )
          }}> </TableRowColumn>
				<TableRowColumn>
						<Button label="查看"  type="operation" operation="view"/>
						<Button label="编辑"  type="operation" operation="edit"/>
				</TableRowColumn>
         </TableRow>
      </TableBody>
      <TableFooter></TableFooter>
      </Table>
				</Section>

              <Dialog
					title="创建"
					modal={true}
					open={this.state.openCreateDialog}
					onClose={this.openCreateDialog}
					contentStyle={{width:666}}
				>

                <CreateForm onCancel={this.onCancel} onSubmint={this.onSubmint}/>
			
				</Dialog>
				
				
			</div>
		);
	}

}


export default connect((state) => ({}))(UpdateLog);
