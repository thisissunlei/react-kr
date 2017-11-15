import React from 'react';
import {
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button
} from 'kr-ui';

export default class AddTable extends React.Component{

	constructor(props,context){
		super(props, context);
	}

     onSubmit=()=>{
        const {onSubmit}=this.props;
        onSubmit && onSubmit();
    }

    onCancel=()=>{
        const {onCancel}=this.props;
        onCancel && onCancel();
    }


	render(){

        let {tableData}=this.props;
        var tables='';
        tableData&&tableData.map((item,index)=>{
            tables=tables+item.tableSql;
        })
          
		return(
            
			<div>
                <p style={{textAlign:'center',color:'#666',fontSize:'14px',marginTop:'25px',marginBottom:0}}>注:是否确定创建表？创建后修改表单及字段会有很多限制</p>
                <textarea readOnly="readonly" style={{width:'100%',height:250,border:'solid 1px #ccc',color:'#666',fontSize:'14px',lineHeight:'24px',boxSizing:'border-box',padding:'10px',marginTop:'20px'}}>
                  {tables}
                </textarea>
                <Grid style={{marginTop:25,marginBottom:5}}>
                                <Row>
                                    <Col md={12} align="center">
                                    <ButtonGroup>
                                        <div  style = {{display:"inline-block",marginRight:30}}><Button  label="确定" onTouchTap={this.onSubmit}/></div>
                                        <Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
                                    </ButtonGroup>
                                    </Col>
                                </Row>
                </Grid>
            </div>
		);
	}
}
