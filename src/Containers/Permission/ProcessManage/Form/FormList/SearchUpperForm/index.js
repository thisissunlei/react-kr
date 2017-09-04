import React, {
	PropTypes
} from 'react';
import {
	Actions,
	Store
} from 'kr/Redux';
import $ from 'jquery';
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
	ListGroup,
	SearchForm,
	ListGroupItem
} from 'kr-ui';
import './index.less';
class SearchUpperForm extends React.Component {

	static propTypes = {

	}

	constructor(props) {
		super(props)
        this.state={
					dateBoxDevelop:false,
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
	   let {handleSubmit,purposeType}=this.props;
	   let {dateBoxStyle,dateBoxDevelop}=this.state;

	   var purposetype=[];
	   purposeType.map((item,index)=>{
		   var list={};
		   list.label=item.desc;
		   list.value=item.value;
		   purposetype.push(list);
	   })


		return(
			<div style={dateBoxStyle} className='customer-searchUpper list-community-supper'>
			    <form onSubmit={handleSubmit(this.onSubmit)}>

					<KrField  grid={1/2}  style={{marginRight:29,width:262}}  name="nameKey" type="input"  label="表单名称"
					/>

					<KrField  grid={1/2}  style={{width:262}}  name="tableName" type="input"  label="表单表明"
					/>

					<KrField  grid={1/2}  style={{marginRight:29,width:262}}  name="typeId" type="select"  label="表单分类"
					options={purposetype}
					/>

					<KrField  grid={1/2}  style={{width:262}}  name="enabled" type="select"  label="是否启用"
					options={[{label:'123',value:'1'},{label:'456',value:'0'}]}
					/>

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
