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

	   let {handleSubmit}=this.props;
	   let {dateBoxStyle,dateBoxDevelop}=this.state;


		return(
			<div style={dateBoxStyle} className='customer-searchUpper list-community-supper'>
			    <form onSubmit={handleSubmit(this.onSubmit)}>

					<KrField  grid={1/2}  style={{marginRight:29,width:262}}  name="opened" type="input"  label="姓名/编号"
					/>

					<KrField  grid={1/2}  style={{width:262}}  name="opened" type="input"  label="手机号"
					/>

					<KrField  grid={1/2}  style={{marginRight:29,width:262}}  name="opened" type="input"  label="邮箱"
					/>

					<KrField
							grid={1/2}
							style={{width:262}}
							name="depId"
							component="treeDepartment"
							label="部门"
							ajaxUrlName = "get-department-tree"
					/>

					<KrField
							grid={1/2}
							style={{marginRight:29,width:262}}
							name="jobId"
							//leftData={positionList}
							component="switchSlide"
							label="职务"
							control='single'
					/>


					<KrField
							grid={1/2}
							style={{width:262}}
							name="leader"
							component="treePersonnel"
							label="直接上级"
							ajaxUrlName = "get-personnel-tree"
					/>


					<KrField grid={1/2}
							style={{marginRight:29,width:262}}
							name="type"
							component="selecTemployees"
							label="员工类别"
							otherType="resourceType"
     />


					<KrField grid={1/2}
							style={{width:262}}
							name="status"
							component="selecTemployees"
							label="员工状态"
							otherType="resourceStatus"
/>



				<KrField  grid={1/2}  style={{marginRight:29,width:262}}  name="opened" type="select"  label="是否开通账户"
				 options={[{label:'已开通',value:'true'},{label:'未开通',value:'false'}]}
				/>

				<KrField grid={1/2}
						style={{width:262}}
						name="property"
						component="selecTemployees"
						label="员工属性"
						requireLabel={true}
						otherType="resourceProperty"
         />

				<KrField grid={1/1}  component="group" label="入职时间" style={{marginTop:3}}>
				   <div className='list-listDate'>
							<ListGroup>
								<ListGroupItem><div className='communityList-date-start' style={{width:260}} ><KrField  style={{width:260,marginLeft:-10,marginTop:2}} name="openDateBegin" component="date" /></div></ListGroupItem>
									<div className='communityList-line-down'><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
								<ListGroupItem><div className='communityList-date-end'><KrField name="openDateEnd" style={{width:260,marginTop:2}} component="date" /></div></ListGroupItem>
							</ListGroup>
           </div>
				</KrField>

				<Grid style={{marginTop:7,marginBottom:5,marginLeft:-24}}>
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
