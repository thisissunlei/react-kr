import React from 'react';
import {
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button
} from 'kr-ui';

export default class DeleteWork extends React.Component{

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

		return(

			<div>
               <p style={{textAlign:'center',color:'#000',fontSize:'16px',marginTop:'25px'}}>确定删除吗？</p>
			   <Grid style={{marginTop:25}}>
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

