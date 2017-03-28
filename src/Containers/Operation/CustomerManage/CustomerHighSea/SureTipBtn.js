import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {
	Button,
	Grid,
	Row,
	Col,
    ButtonGroup
} from 'kr-ui';

export default class SureTipBtn  extends React.Component{

	constructor(props,context){
		super(props, context);
	}
    
    onCancel=()=>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	};
	onSubmit=()=>{
		const {onSubmit} = this.props;
		onSubmit && onSubmit();
	}
	


	render(){

		return(

			   <div>
					  <p className='sure-tip'>是否确定补挂延期收入？</p>
					

					   <Grid style={{position:'absolute',bottom:'30px',left:'50%',transform:'translateX(-97px)'}}>
						<Row>
							<Col md={12} align="center">
								<ButtonGroup>
									<div  className='ui-btn-center'><Button  label="确定" type="submit"  onTouchTap={this.onSubmit}/></div>
									<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} /> 
								</ButtonGroup>
							</Col>
						</Row>
					</Grid>


				</div>
		);
	}

}
