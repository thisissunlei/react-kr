import React from 'react';
import {
	observer,
	inject
} from 'mobx-react';
import {
	reduxForm,
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
@inject("CommunityMeetingModel")
@observer
class SearchUpperForm extends React.Component {

	static propTypes = {

	}

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
			<div  style={dateBoxStyle} className='customer-searchUpper'>
			    <form onSubmit={handleSubmit(this.onSubmit)}>
						<KrField grid={1/2} style={{marginTop:1,width:262}} name="code" component="input"  label="工位编号"
						 />
					 <KrField grid={1/2} style={{width:262,marginLeft:28}}  name="stationType" component="select" label="工位性质"
					  options={[{value:'OPEN',label:'开放'},{value:'HALF_OPEN',label:'半开放'},{value:'CLOSED',label:'封闭'}]}/>
					 <KrField grid={1/2} style={{width:262}}  name="enable" component="select" label="工位状态"
					  options={[{value:'true',label:'启用'},{value:'false',label:'未启用'}]}/>
					 <KrField grid={1/2} style={{width:262,marginLeft:28}}  name="belongSpace" component="select" label="是否属于会议室"
					  options={[{value:'true',label:'属于'},{value:'false',label:'不属于'}]}/>
					<KrField grid={1/2} style={{width:262}}  name="spaceId" component="select" label="会议室名称"
					 options={this.props.CommunityMeetingModel.spacesName}
					 />


						<Grid style={{marginTop:17,marginBottom:5,marginLeft:-24}}>
							<Row>
								<Col md={12} align="center">
									<ButtonGroup>
										<div  style = {{display:"inline-block",marginRight:30}}><Button  label="确定" type="submit"/></div>
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


export default reduxForm({form:'searchUpperForm',enableReinitialize:true,keepDirtyOnReinitialize:true})(SearchUpperForm);
