
import React, {PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import State from './State';



import {
	KrField,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button,
	Message,
	err
} from 'kr-ui';
class EditForm extends React.Component{
	constructor(props,context){
		super(props,context);
		this.detail = this.props.detail;
		this.state={
			
		}
	}

	componentDidMount(){
		Store.dispatch(initialize('EditForm', this.detail));
	}

	
	onCancel=()=>{
		const {closeEditEquipment}=this.props;
		closeEditEquipment && closeEditEquipment();
	}
	
	onSubmit=(values)=>{
        State.editHouseConfig(values);
	}
	render(){
		
		const { error, handleSubmit, reset} = this.props;
		return(
			<div>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<KrField 
                        name="brandType" 
						component="searchHouseCity" 
						onChange = {this.onChangeSearchCity}
						label="城市"  
						requireLabel={true} 
						style={{width:'280px',margin:'0 35px 5px 0'}}
						inline={false}
					/>
                    <KrField 
                        name="cmtId" 
						component="searchHouseCommunity" 
						onChange = {this.onChangeSearchCommunity}
                        label="社区" 
                        cityType={this.state.cityType} 
						requireLabel={true} 
						style={{width:'280px',margin:'0 35px 5px 0'}}
						inline={false}
					/>
                    <KrField 
                        requireLabel={true} 
                        label="工位类型" 
                        name="houseType" 
                        component="select" 
                        style={{width:'280px',margin:'0 35px 5px 0'}}
                        options={[{label:"独立办公室",value:"INDEPENDENT_OFFICE"},{label:"移动工位",value:"OPEN_STATION"}]}
                        requireLabel={true}
                    />
                    <KrField 
                        label="工位单价(月/元)" 
                        name="monthPrice" 
                        style={{width:'280px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={true} 
                        inline={false}
                    />
                    <KrField 
                        name="picUrls"
                        component="uploadImageList"
                        boxStyle={{marginLeft:-35,textAlign:'left'}}
                        defaultValue={this.state.titleUrl}
                        imgFlag={false}
                        innerBoxStyle={{width:254,height:70}}
                        innerStyle={{left:110,top:12}}
                        inline={false}
                        label='上传工位图片'
                        sort={true}
                    />
                    <KrField 
                        label="容纳人数" 
                        name="allowNum" 
                        style={{width:'280px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={true} 
                        inline={false}
                    />
                    <KrField 
                        label="最短租期" 
                        name="rentDate" 
                        style={{width:'280px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={true} 
                        inline={false}
                    />
                    <KrField 
                        label="付款方式" 
                        name="depositMonthAll" 
                        style={{width:'280px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={true} 
                        inline={false}
                    />
                    <KrField 
                        label="佣金比例" 
                        name="moneyRate" 
                        style={{width:'280px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={true} 
                        inline={false}
                    />
					
					<Grid>
						<Row style={{textAlign:'center',marginLeft:'-40px',marginTop:20}}>
							<ListGroup >
								<ListGroupItem style={{padding:0,display:'inline-block',marginRight:30}}>
									<Button  label="确定" type="submit"/>
								</ListGroupItem>
								<ListGroupItem style={{padding:0,display:'inline-block',marginRight:3}}>
									<Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} />
								</ListGroupItem>
							</ListGroup>					
						</Row>
					</Grid>
				</form>
			</div>
		);
	}
}
const validate = values=>{
	const errors={};
	
	
	
	return errors;
}
export default EditForm = reduxForm({
	form: 'EditForm',
	validate,
})(EditForm);
