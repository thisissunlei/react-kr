
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
class NewCreateDefinitionForm extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state={
            cityType:'',
            titleUrl:''
		}
	}
	
	onCancel=()=>{
		const {onCancel}=this.props;
		onCancel && onCancel();
    }
    
    onChangeSearchCity=(value)=>{
        this.setState({
            cityType:value.code
        })
    }

    onChangeSearchCommunity=(value)=>{

    }

    deletePhoto=()=>{
        this.setState({
            titleUrl:''
        })
    }

	// 新建数据
	onSubmit=(values)=>{
        let _this = this;
        values.payMonth = values.depositMonth.charAt(3)
        values.depositMonth = values.depositMonth.charAt(1)
        console.log(values)
	 	//State.newCreateHouseConfig(values);
    }
    
	render(){
        const { error, handleSubmit, reset} = this.props;
        let host = "http://"+window.location.host;
		return(
			<div>
				<form style={{'margin':'20px 0 0 10px'}} onSubmit={handleSubmit(this.onSubmit)}>
                    <KrField 
                        name="brandType" 
						component="searchHouseCity" 
						onChange = {this.onChangeSearchCity}
						label="城市"  
						requireLabel={true} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
						inline={false}
					/>
                    <KrField 
                        name="cmtId" 
						component="searchHouseCommunity" 
						onChange = {this.onChangeSearchCommunity}
                        label="社区" 
                        cityType={this.state.cityType} 
						requireLabel={true} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
						inline={false}
					/>
                    <KrField 
                        requireLabel={true} 
                        label="工位类型" 
                        name="houseType" 
                        component="select" 
                        style={{width:'252px',margin:'0 35px 5px 0'}}
                        options={[{label:"独立办公室",value:"INDEPENDENT_OFFICE"},{label:"移动工位",value:"OPEN_STATION"}]}
                        requireLabel={true}
                    />
                    <KrField 
                        label="工位单价(月/元)" 
                        name="monthPrice" 
                        style={{width:'252px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={true} 
                        inline={false}
                    />
                    <KrField
                        name="picUrls"
                        component="newuploadImage"
                        innerstyle={{width:222,height:179,padding:10,marginLeft:-80}}
                        photoSize={'202*150'}
                        pictureFormat={'JPG,PNG,GIF'}
                        pictureMemory={'200'}
                        requestURI = {host + '/api/krspace-finance-web/activity/upload-pic'}
                        deviation = {"50*50"}
                        defaultValue={this.state.titleUrl}
                        onDeleteImg ={this.deletePhoto}
                        label="上传工位图片"
                        inline={false}
                        requireLabel={true}
                    />
                    <KrField 
                        label="容纳人数" 
                        name="allowNum" 
                        style={{width:'252px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={true} 
                        inline={false}
                    />
                    <KrField 
                        label="最短租期" 
                        name="rentDate" 
                        style={{width:'252px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={true} 
                        inline={false}
                    />
                    <KrField 
                        label="付款方式" 
                        name="depositMonth" 
                        style={{width:'252px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={true} 
                        inline={false}
                    />
                    <KrField 
                        label="佣金比例" 
                        name="moneyRate" 
                        style={{width:'252px',margin:'0 35px 5px 0'}} 
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
	if(!values.communityId){
		errors.communityId = '社区名称为必填项';
	}
	if(!values.priceId){
		errors.priceId = '价格策略为必填项';
	}
	if(!values.nodeIp){
		errors.nodeIp = '节点域名为必填项';
	}
	if(values.nodeIp && values.nodeIp.length>250){
		errors.nodeIp = '节点域名最长250个字符';
	}
	
	return errors;
}
export default NewCreateDefinitionForm = reduxForm({
	form: 'NewCreateDefinitionForm',
	validate,
})(NewCreateDefinitionForm);
