
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
class EditHouseForm extends React.Component{
	constructor(props,context){
		super(props,context);
		this.detail = this.props.detail;
		this.state={
            cityType:'',
            picUrls:[]
		}
    }
    componentWillMount(){
        let arr = []
        this.props.detail.picUrls.forEach(v => {
            arr.push({
                src:v
            })
        });
        this.setState({
            picUrls:arr,
            cityType:this.props.detail.brandType
        })
    }

	componentDidMount(){
		Store.dispatch(initialize('EditHouseForm', this.detail));
    }
    
    onChangeSearchCity=(value)=>{
        this.setState({
            cityType:value.code
        })
    }
	
	onCancel=()=>{
		const {closeEditEquipment}=this.props;
		closeEditEquipment && closeEditEquipment();
	}
	
	onSubmit=(values)=>{
        let arr = []
        values.picUrls.forEach(v=>{
            arr.push(v.src)
        })
        values.picUrls = arr.join(',');
        State.editHouseConfig(values);
    }
    
	render(){
		
		const { error, handleSubmit, reset} = this.props;
		return(
			<div>
				<form style={{'margin':'20px 0 0 10px'}} onSubmit={handleSubmit(this.onSubmit)}>
					<KrField 
                        name="brandType" 
						component="searchHouseCity" 
						onChange = {this.onChangeSearchCity}
						label="城市"  
						requireLabel={true} 
						style={{width:'330px',margin:'0 35px 5px 0'}}
						inline={false}
					/>
                    <KrField 
                        name="cmtId" 
						component="searchHouseCommunity" 
						onChange = {this.onChangeSearchCommunity}
                        label="社区" 
                        cityType={this.state.cityType} 
						requireLabel={true} 
						style={{width:'330px',margin:'0 35px 5px 0'}}
						inline={false}
					/>
                    <KrField 
                        requireLabel={true} 
                        label="工位类型" 
                        name="houseType" 
                        component="select" 
                        style={{width:'330px',margin:'0 35px 5px 0'}}
                        options={[{label:"独立办公室",value:"INDEPENDENT_OFFICE"},{label:"移动工位",value:"OPEN_STATION"}]}
                        requireLabel={true}
                    />
                    <KrField 
                        label="工位单价(月/元)" 
                        name="monthPrice" 
                        style={{width:'330px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={true} 
                        inline={false}
                    />
                    <KrField 
                        name="picUrls"
                        component="uploadImageList"
                        boxStyle={{marginLeft:-7,textAlign:'left'}}
                        defaultValue={this.state.picUrls}
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
                        style={{width:'330px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={true} 
                        inline={false}
                    />
                    <KrField 
                        label="最短租期(1-36个月之间,填正整数)" 
                        name="rentDate" 
                        style={{width:'330px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={true} 
                        inline={false}
                    />
                    <KrField 
                        label="付款方式(付)" 
                        name="payMonth" 
                        style={{width:'330px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={true} 
                        inline={false}
                    />
                    <KrField 
                        label="付款方式(押)" 
                        name="depositMonth" 
                        style={{width:'330px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={true} 
                        inline={false}
                    />
                    <KrField 
                        label="佣金比例" 
                        name="moneyRate" 
                        style={{width:'330px',margin:'0 35px 5px 0'}} 
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
    if(!values.brandType){
		errors.brandType = '城市为必填项';
	}
	if(!values.cmtId){
		errors.cmtId = '社区为必填项';
	}
	if(!values.houseType){
		errors.houseType = '工位类型为必填项';
	}
    if(!values.monthPrice){
		errors.monthPrice = '工位单价为必填项';
	}
	if(!values.allowNum){
		errors.allowNum = '容纳人数为必填项';
	}
	if(!values.rentDate){
		errors.rentDate = '最短租期为必填项';
    }
    
	if(!values.payMonth){
		errors.payMonth = '付款方式(付)为必填项';
	}
	if(!values.depositMonth){
		errors.depositMonth = '付款方式(押)为必填项';
	}
	if(!values.moneyRate){
		errors.moneyRate = '佣金比例为必填项';
	}
	return errors;
}
export default EditHouseForm = reduxForm({
	form: 'EditHouseForm',
	validate,
})(EditHouseForm);
