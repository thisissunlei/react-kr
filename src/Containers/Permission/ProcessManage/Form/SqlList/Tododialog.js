import React from 'react';
import {
	  KrField,
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button
} from 'kr-ui';
import './index.less';

export default class Tododialog  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

    onSubmit=(values)=>{
        const {onSubmit}=this.props;
        onSubmit && onSubmit(values);
    }

    onCancel=()=>{
        const {onCancel}=this.props;
        onCancel && onCancel();
    }

	render(){

    let {handleSubmit}=this.props;

		return(

			<div className='sql-content'>
                <div className="content">
                    CREATE TABLE `fina_contract_detail` (
                      `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
                      `mainbillid` int(11) NOT NULL COMMENT '合同订单id',
                      `communityid` int(11) NOT NULL COMMENT '社区id',
                      `customerid` int(11) NOT NULL COMMENT '客户id',
                      `contractcode` varchar(60) NOT NULL COMMENT '合同编号',
                      `contract_totalamount` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT '合同总额',
                      `contract_backamount` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT 
                      CREATE TABLE `fina_contract_detail` (
                      `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
                      `mainbillid` int(11) NOT NULL COMMENT '合同订单id',
                      `communityid` int(11) NOT NULL COMMENT '社区id',
                      `customerid` int(11) NOT NULL COMMENT '客户id',
                      `contractcode` varchar(60) NOT NULL COMMENT '合同编号',
                      `contract_totalamount` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT '合同总额',
                      `contract_backamount` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT 
                </div>



                <Grid style={{marginBottom:5,marginLeft:-25,marginTop:-12}}>
                    <Row>
                        <Col md={12} align="center">
                        <ButtonGroup>
                            <div  style = {{display:"inline-block",marginRight:30}}><Button  label="确定" type="submit"/></div>
                            <Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
                        </ButtonGroup>
                        </Col>
                    </Row>
                </Grid>
			</div>
		);
	}
}

