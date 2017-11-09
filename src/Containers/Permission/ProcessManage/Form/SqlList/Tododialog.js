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

    onSubmit=()=>{
        const {onSubmit}=this.props;
        onSubmit && onSubmit();
    }

    onCancel=()=>{
        const {onCancel}=this.props;
        onCancel && onCancel();
    }

	render(){

    let {handleSubmit,itemData}=this.props;

		return(

			<div className='sql-content'>
                <div className="content">
                    {itemData.sqlContent}
                </div>



                <Grid style={{marginBottom:5,marginLeft:-25,marginTop:-12}}>
                    <Row>
                        <Col md={12} align="center">
                        <ButtonGroup>
                            <div  style = {{display:"inline-block",marginRight:30}}><Button  label="确定" type="button" onTouchTap={this.onSubmit}/></div>
                            <Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
                        </ButtonGroup>
                        </Col>
                    </Row>
                </Grid>
			</div>
		);
	}
}

