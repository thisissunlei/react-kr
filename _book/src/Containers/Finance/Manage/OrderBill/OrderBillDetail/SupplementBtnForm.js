import React from 'react';
import {
	Button,
	Grid,
	Row,
	Col,
	ButtonGroup,
} from 'kr-ui';

export default class SupplementBtnForm extends React.Component{

	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,

	}
	constructor(props,context){
		super(props,context);
		this.onCancel=this.onCancel.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
		this.state={
          supplement:false,

		}
	};
	onCancel(){
		const {onCancel} = this.props;
		onCancel && onCancel();
	};
	onSubmit(){
		const {onSubmit} = this.props;
		onSubmit && onSubmit();
	}

	render(mainbillid){



		return(

				<div>
					<p className='sureIncome'>是否确定补挂延期收入？</p>


					   <Grid style={{marginTop:20}}>
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
