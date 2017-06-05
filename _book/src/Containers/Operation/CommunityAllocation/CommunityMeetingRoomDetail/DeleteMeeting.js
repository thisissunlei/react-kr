import React from 'react';
import {Http} from 'kr/Utils';
import {
	Button,
	Section,
	Grid,
	Row,
	Col,
  ButtonGroup
} from 'kr-ui';

class DeleteMeeting  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

  onSubmit=()=> {
    const {
       onSubmit
    } = this.props;
    onSubmit && onSubmit();
  }

  onCancel=()=> {
     const {
      onCancel
    } = this.props;
    onCancel && onCancel();
  }

	render(){

		return(

		<div>

     <div style={{textAlign:'center',marginTop:38}}>确定要删除吗？</div>

      <Grid style={{position:'absolute',bottom:30,left:120}}>
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

export default DeleteMeeting
