import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
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
  ListGroupItem,
  SearchForms

} from 'kr-ui';

export default class Merchants extends Component{

	constructor(props,context){
		super(props, context);
    this.state={
      searchParams:{

      }
    }

	}



	render(){

		return(

      <div className="switchhover">
      <Title value="会员配置"/>

          <Section title="会员卡激活" description="" style={{minHeight:"900px"}}>
              <Grid style={{marginBottom:22,marginTop:2}}>
                <Row >
                <Col  align="left" style={{marginLeft:0,float:'left'}}> <Button label="新建激活" type='button' joinEditForm onTouchTap={this.openNewActivationDialog}  /> </Col>
                <Col  align="left" style={{marginLeft:20,float:'left'}}> <Button label="批量激活" type='button' joinEditForm onTouchTap={this.openHeavilyActivationDialog}  /> </Col>
                <Col  align="right" style={{marginTop:0,float:"right",marginRight:-10}}>
                  <ListGroup>
                    <ListGroupItem> <SearchForms placeholder='请输入会员卡号码' onSubmit={this.onSearchSubmit} onCancel={this.onSearchCancel}/></ListGroupItem>
                  </ListGroup>
                </Col>
                </Row>
              </Grid>

                    <Table  style={{marginTop:8}}
                        ajax={true}
                        onOperation={this.onOperation}
                        onProcessData={(state)=>{
                          return state;
                        }
                      }
                      displayCheckbox={false}
                      onExport={this.onExport}
                      ajaxParams={this.state.searchParams}

                      ajaxFieldListName="items"
                      ajaxUrlName='CardActivationList'>
                      <TableHeader>
                        <TableHeaderColumn style={{width:"20%"}}>卡号</TableHeaderColumn>
                        <TableHeaderColumn style={{width:"20%"}}>内码</TableHeaderColumn>
                        <TableHeaderColumn style={{width:"20%"}}>状态</TableHeaderColumn>
                        <TableHeaderColumn style={{width:"20%"}}>激活时间</TableHeaderColumn>
                        <TableHeaderColumn style={{width:"20%"}}>操作</TableHeaderColumn>

                    </TableHeader>

                    <TableBody >
                        <TableRow >
                          <TableRowColumn name="foreignCode" ></TableRowColumn>
                          <TableRowColumn name="interCode" ></TableRowColumn>
                          <TableRowColumn name="enable" options={[{label:'已激活',value:'true'},{label:'未激活',value:'false'}]}></TableRowColumn>
                          <TableRowColumn name="activeTime" type='date' format="yyyy-mm-dd HH:MM:ss" ></TableRowColumn>
                          <TableRowColumn type="operation">
                              <Button label="编辑"  type="operation"  operation="edit" />
                           </TableRowColumn>
                         </TableRow>
                    </TableBody>

                    <TableFooter ></TableFooter>

                    </Table>
          </Section>

      </div>
		);
	}

}
