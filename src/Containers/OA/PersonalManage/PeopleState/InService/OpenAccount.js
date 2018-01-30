import React from 'react';
import {
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button
} from 'kr-ui';
import {
    observer,
    inject
} from 'mobx-react';
import State from './State';
@observer

export default class OpenAccount extends React.Component{

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
        var disabledStyle = {
            color:"#bbbec4",
            backgroundColor: "#f7f7f7",
            borderColor: "#dddee1",
            position: "relative",
          
            fontSize: "14px",
            letterSpacing: 0,
            textTransform:"uppercase",
            fontWeight: 500,
            margin: 0,
            userSelect: "none",
            paddingLeft: "16px",
            paddingRight: "16px",
            padding: 0,
            lineHeight:"30px",
            borderRadius:"4px",
            width:"80px",
            boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
            cursor: "no-drop"
        }
		return(

			<div>
               <p style={{textAlign:'center',color:'#666',fontSize:'14px',marginTop:'25px'}}>确定开通登录帐号吗？</p>
			   <Grid style={{marginTop:25}}>
                            <Row>
                                <Col md={12} align="center">
                                <ButtonGroup>
                                <div style={{ display: "inline-block", marginRight: 30 }}>
                                    {State.disabled && <div style={disabledStyle}>确定</div>}
                                    {!State.disabled &&<Button disabled label="确定" onTouchTap={this.onSubmit}/>}
                                </div>
                                    <Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
                                </ButtonGroup>
                                </Col>
                            </Row>
                </Grid>
			</div>
		);
	}

}

