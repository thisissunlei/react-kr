import React from 'react';
import {
	reduxForm,
} from 'redux-form';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ListGroup,
	ListGroupItem,
	SearchForms,
	ButtonGroup
} from 'kr-ui';
import './index.less';
 class HightSearchForm extends React.Component{

	constructor(props,context){
		super(props, context);

		this.state = {
			
		}
	}


	componentDidMount() {

	}
	onCancel = () => {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}
	
	onSubmit=(form)=>{
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(form);

	}

	
	render() {
		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;
		return (
			 <div>
				<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:30}}>
				    <KrField 
				    		name="company"
				    		type="text"
				    		style={{width:252,marginLeft:40,marginTop:4}}
				    		label="被访公司" 
				    		component="input" 
				  			
					/>
					<KrField  
				    		
				    		name="name"
				    		type="text"
				    		style={{width:252,marginLeft:40,marginTop:4}}
				    		label="被访人" 
				    		component="input" 
				  			
					/>
					
					<KrField 
							grid={1/1}
							left={40} 
							component="group" 
							label="到访时间" 
							style={{marginTop:3}}
					>
						<div className='ui-listDate'>
							<ListGroup>
								<ListGroupItem><div className='ui-date-start' style={{width:252}} ><KrField isInput={false}  style={{width:252,marginLeft:-10,marginTop:2}} name="startTime" component="date" /></div></ListGroupItem>
									<div className='ui-line-down'  style={{marginTop:25}}><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
								<ListGroupItem><div className='ui-date-end'><KrField name="endTime" isInput={false} style={{width:252,marginTop:2}} component="date" /></div></ListGroupItem>
							</ListGroup>
		                </div>
					</KrField>
					
					<KrField  
							style={{width:252,marginLeft:40,marginTop:4}}
							name="communityId" 
							type="select" 
							component="input" 
							label="社区名称" 
					 />
					 <KrField  
							style={{width:252,marginLeft:40,marginTop:4}}
							name="visitName" 
							type="text" 
							component="input" 
							label="访客名称" 
					 />
				<Grid style={{marginTop:20,marginBottom:5,marginLeft:-24}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center'>
									<Button  label="确定" type="submit" />
								</div>
								<Button  
										label="取消" 
										type="button" 
										cancle={true} 
										onTouchTap={this.onCancel} 
								/>
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
				</form>				
								
			</div>
			
		);
	}
}

export default reduxForm({
	form: 'hightSearchForm'
})(HightSearchForm);

