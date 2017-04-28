import React from 'react';
import {
	reduxForm,
} from 'redux-form';
import {
	Http
} from "kr/Utils";
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

class HighSearchForm extends React.Component {

	static propTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state = {
			systemList:[]
		}

	}
	componentDidMount(){
		this.getMain();
	}
	onSubmit = (form) => {
		form = Object.assign({},form);
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(form);
	}
	openSearch = () => {
		const {
			openSearch
		} = this.props;
		openSearch && openSearch();
	}

	onCancel = () => {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}
	getMain = () => {
		var	systemList;
		var _this = this;
		Http.request('getOpSer').then(function(response) {
			systemList = response.systemList.map((item) => {
				item.label = item.systemDesc;
				item.value = item.systemType;
				return item;
			})
			_this.setState({
				systemList: systemList,
			})

		});
	}

	render() {

		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;
		let {
			systemList,
		} = this.state;
		return (
			<div>
			    <form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:30}}>

					<KrField
			    		grid={1/2}
							left={42}
	  					right={18}
			    		name="systemType"
			    		type="select"
			    		style={{marginTop:4}}
			    		label="系统名称"
			  			options={systemList}
					/>
					<KrField
 					 grid={1/2}
					 right={56}
					 left={4}
 					 name="sourceId"
 					 style={{marginTop:4}}
 					 label="业务名称"
 					 component="searchSourceList"
 			 		/>
					<KrField
              grid={1/2}
							left={42}
	  					right={18}
              name="operaterName"
              type="text"
              component="input"
              label="操作人"
           />
					 <KrField
							 grid={1/2}
							 right={56}
							 left={4}
							 name="batchNum"
							 type="text"
							 component="input"
							 label="批次号"
						/>
						<KrField
								grid={1/1}
								left={42}
		  					right={18}
								component="group"
								label="操作时间"
								style={{marginTop:3}}
						>
							<div className='ui-listDate' style={{marginTop:-8}}>
								<ListGroup>
									<ListGroupItem><div className='ui-date-start' style={{width:248}} ><KrField  style={{width:248,marginLeft:-10,marginTop:2}} name="startDate" component="date" /></div></ListGroupItem>
										<div className='ui-line-down'  style={{marginTop:25,display:'inline-block'}}><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
									<ListGroupItem><div className='ui-date-end'><KrField name="endDate" style={{width:248,marginTop:2}} component="date" /></div></ListGroupItem>
								</ListGroup>
			                </div>
						</KrField>
				<Grid style={{marginTop:15,marginBottom:5}}>
					<Row>
						<Col md={12} align="center">

							<ButtonGroup>
									<Button  label="确定" type="submit" />
									<span style={{display:'inline-block',width:40,height:20}}></span>
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
	form: 'highSearchForm'
})(HighSearchForm);
