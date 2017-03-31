import React from 'react';
import {
	observer
} from 'mobx-react';
import {
	Button,
	Grid,
	Row,
	Col,
  ButtonGroup
} from 'kr-ui';
import State from './State';
@observer
export default class SureTipBtn  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

    onCancel=()=>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	};
    reloadSubmit=()=>{
    	const {reloadSubmit} = this.props;
		reloadSubmit && reloadSubmit();
    }

	render(){


		return(

			   <div>
					  <p className='sure-tip'>{State.statusMessage}</p>


					   <Grid style={{position:'absolute',bottom:'30px',left:'50%',transform:'translateX(-97px)'}}>
						<Row>
							<Col md={12} align="center">
								<ButtonGroup>
									<div  className='ui-btn-center'>
									  {State.statusCode==-3?<Button  label="重新导入" type="button"  onTouchTap={this.reloadSubmit}/>:<Button  label="确定" type="button"  onTouchTap={this.reloadSubmit}/>}
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
