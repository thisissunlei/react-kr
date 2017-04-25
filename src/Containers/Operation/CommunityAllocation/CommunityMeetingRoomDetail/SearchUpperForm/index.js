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
	onSearchChange = () =>{

	}

	render() {


	   let {handleSubmit}=this.props;
	   let {dateBoxStyle}=this.state;

	  	return(
			<div  style={dateBoxStyle} className='customer-searchUpper'>
			    <form onSubmit={handleSubmit(this.onSubmit)}>
					
					<SearchForm placeholder='请输入关键字' 
			            searchFilter={[{label:"访客姓名",value:"NAME"},{label:"访客电话",value:"TEL"}]} 
			            style={{width:262,marginTop:29,marginLeft:-1,display:"inline-block",marginBottom:15,marginRight:25}} 
			            defaultFilter='NAME'
			            onChange = {this.onSearchChange}
          			/>
          			<div><span>容纳人数</span><input type="text" /><span>——</span><input type="text" /></div>
					 <KrField grid={1/2} style={{width:262,marginLeft:28}}  name="stationType" component="select" label="空间类型"
					  options={this.props.CommunityMeetingModel.sapceTypes}/>
					 <KrField grid={1/2} style={{width:262}}  name="enable" component="select" label="工位状态"
					  options={[{value:'true',label:'启用'},{value:'false',label:'未启用'}]}
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
