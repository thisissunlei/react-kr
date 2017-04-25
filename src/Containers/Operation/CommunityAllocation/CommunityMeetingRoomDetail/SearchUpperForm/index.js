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
class MeetingsearchUpperForm extends React.Component {

	static propTypes = {

	}

	constructor(props) {
		super(props);
		this.state={
			dateBoxStyle:{marginTop:35,marginLeft:26 ,height:"auto"},
			capacityBegin:'',
			capacityEnd:'',
			searchKey:'',
			searchType:'',
		}
	}


	onSubmit=(values)=> {
	  const {
		   onSubmit
		} = this.props;
	  const {
	  	capacityBegin,
	  	capacityEnd,
	  	searchType,
	  	searchKey
	  } = this.state;

	  values.capacityBegin = capacityBegin;
	  values.capacityEnd = capacityEnd;
	  values.searchType = searchType;
	  values.searchKey = searchKey;
	  values.deviceIds = (values.deviceIds && values.deviceIds.split(",")) || "";
	  onSubmit && onSubmit(values);
	}

	onCancel=()=> {
	   const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}
	capacityBegin = (value) => {
		this.setState({
			capacityBegin:value.target.value
		})
	}
	capacityEnd = (value) =>{
		this.setState({
			capacityEnd:value.target.value
		})
	}
	onSearchChange = (data) =>{

		this.setState({
			searchType:data.value,
			searchKey:data.content,

		})
	}
	render() {


	   let {handleSubmit}=this.props;
	   let {dateBoxStyle}=this.state;
		 let deviceSpace=[];
	 		this.props.CommunityMeetingModel.spaceDevices.map((item)=>{
	            let list={};
	            list.label=item.label;
	            list.value=item.value;
	            deviceSpace.push(list);
	 		})

	  	return(
			<div  style={dateBoxStyle} className='customer-searchUpper'>
			    <form onSubmit={handleSubmit(this.onSubmit)}>

					<SearchForm placeholder='请输入关键字'
			            searchFilter={[{label:"名称查询",value:"NAME"},{label:"编码查询",value:"CODE"}]}
			            style={{width:262,marginTop:29,marginLeft:28,display:"inline-block",marginBottom:15,marginRight:25}}
			            defaultFilter='NAME'
			            onChange = {this.onSearchChange}
    				/>

    			<div className="accommodate-number"><span className="label">容纳人数</span><input type="text" onChange={this.capacityBegin}/><span className="horizontal-line">-</span><input type="text" onChange={this.capacityEnd}/></div>
    			<div className='meeting-device'>
					<KrField
						label="设备情况"
						name='deviceIds'
						style={{width:"auto",marginLeft:28,marginRight:42}}
						component="groupCheckbox"
						defaultValue={deviceSpace}

					/>
				</div>
					 <KrField grid={1/2} style={{width:262,marginLeft:28}}  name="spaceType" component="select" label="空间类型"
					  options={this.props.CommunityMeetingModel.sapceTypes}
					  />
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


export default reduxForm({form:'MeetingsearchUpperForm',enableReinitialize:true,keepDirtyOnReinitialize:true})(MeetingsearchUpperForm);
