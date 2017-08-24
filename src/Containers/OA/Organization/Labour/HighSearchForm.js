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
	SearchForms,
	ButtonGroup,
	ListGroup,
	ListGroupItem,
} from 'kr-ui';
import './index.less';

class HighSearchForm extends React.Component {

	static propTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state={
			dateBoxDevelop:false,
			dateBoxStyle:{marginTop:35,marginLeft:26 ,height:"auto"},
   }
	}

	onSubmit = (form) => {
		var form = Object.assign({},form);
		const {
			detail,
			onSubmit
		} = this.props;
		form.orgId=detail.orgId;
		form.dimId=detail.dimId;
		form.orgType=detail.orgType;
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

	render() {

		const {
			handleSubmit,
		} = this.props;

   let {dateBoxStyle,dateBoxDevelop}=this.state;


		return (
			<div>
			    <form style={dateBoxStyle} onSubmit={handleSubmit(this.onSubmit)} className='customer-searchUpper list-community-supper'>
					<KrField  grid={1/2}  style={{marginRight:29,width:262}}  name="nameKey" type="input"  label="姓名/编号"
					/>

					<KrField  grid={1/2}  style={{width:262}}  name="mobilePhone" type="input"  label="手机号"
					/>

					<KrField  grid={1/2}  style={{marginRight:29,width:262}}  name="email" type="input"  label="邮箱"
					/>

					<KrField
							grid={1/2}
							style={{width:262}}
							name="orgId"
							component="treeDepartment"
							label="部门"
							ajaxUrlName = "get-department-tree"
					/>



					<KrField
							grid={1/2}
							style={{width:262,marginRight:29}}
							name="leader"
							component="treePersonnel"
							label="直接上级"
							ajaxUrlName = "get-personnel-tree"
					/>


					<KrField grid={1/2}
							style={{width:262}}
							name="searchType"
							component="selecTemployees"
							label="员工类别"
							otherType="resourceType"
		 />


					<KrField grid={1/2}
							style={{width:262,marginRight:29}}
							name="searchStatus"
							component="selecTemployees"
							label="员工状态"
							otherType="resourceStatus"
/>



				<KrField  grid={1/2}  style={{width:262}}  name="hasAccount" type="select"  label="是否开通账户"
				 options={[{label:'已开通',value:'true'},{label:'未开通',value:'false'}]}
				/>

				<KrField grid={1/2}
						style={{width:262,marginRight:29}}
						name="searchProperty"
						component="selecTemployees"
						label="员工属性"
						otherType="resourceProperty"
				 />

				<KrField grid={1/1}  component="group" label="入职时间" style={{marginTop:3}}>
					 <div className='list-listDate'>
							<ListGroup>
								<ListGroupItem><div className='communityList-date-start' style={{width:260}} ><KrField  style={{width:260,marginLeft:-10,marginTop:2}} name="entryDateStart" component="date" /></div></ListGroupItem>
									<div className='communityList-line-down'><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
								<ListGroupItem><div className='communityList-date-end'><KrField name="entryDateEnd" style={{width:260,marginTop:2}} component="date" /></div></ListGroupItem>
							</ListGroup>
					 </div>
				</KrField>

				<Grid style={{marginTop:15,marginBottom:5,marginLeft:-40}}>
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
