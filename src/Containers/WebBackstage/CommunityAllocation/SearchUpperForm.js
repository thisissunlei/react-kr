import React, {
	PropTypes
} from 'react';
import {
	Actions,
	Store
} from 'kr/Redux';
import {
	reduxForm,
	change,
} from 'redux-form';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
} from 'kr-ui';

class SearchUpperForm extends React.Component {

	constructor(props) {
		super(props);
        this.state={
			dateBoxStyle:{marginTop:35,marginLeft:26 ,height:"auto"},
		}
	}
	

	onSubmit=(values)=> {
	    const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(values);	
	}

	onCancel=()=> {
	   const {
			onCancel
		} = this.props;
		onCancel && onCancel();		
	}


	

	render() {

	   let {handleSubmit}=this.props;
	   let {dateBoxStyle}=this.state;
      


		return(
			<div style={dateBoxStyle} className='customer-searchUpper'>
			    <form onSubmit={handleSubmit(this.onSubmit)}>

                <KrField  grid={1/2}  name="cmtName" component="input"  style={{marginTop:4,width:262,marginRight:30}} label="社区名称" 
				></KrField>
               
                <KrField  grid={1/2}  name="show" component="select"  style={{marginTop:4,width:262}} label="是否官网显示" 
				  options={[{label:'是',value:'true'},{label:'否',value:'false'}]}
				></KrField>

                <KrField  grid={1/2}  name="customed" component="select" style={{marginTop:4,width:262,marginRight:30}} label="是否企业定制" 
				   options={[{label:'是',value:'true'},{label:'否',value:'false'}]}
				></KrField>

                <KrField  grid={1/2}  name="appoint" component="select" style={{marginTop:4,width:262}} label="是否允许预约" 
				    options={[{label:'是',value:'true'},{label:'否',value:'false'}]}
				></KrField>
   

				<Grid style={{marginTop:18,marginBottom:5,marginLeft:-24}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='list-btn-center'><Button  label="确定" type="submit"/></div>
								<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
				</form>  
			</div>
		);
	}
}


export default reduxForm({form:'searchUpperForm'})(SearchUpperForm);
