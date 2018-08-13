
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
class EditChannelForm extends React.Component{
	constructor(props,context){
		super(props,context);
		this.detail = this.props.detail;
		this.state={
            cityType:'',
            picUrls:[],
            parsingType:[],
		}
    }
    componentWillMount(){
       
    }

	componentDidMount(){
        var that = this;
        Http.request('parsingType-list').then(function(response) {
            console.log(response);
            that.setState({
                parsingType:response
            },function(){
                Store.dispatch(initialize('EditChannelForm', that.detail));
            })
        }).catch(function(err) {
            
            Message.error(err.message);
        });	
		
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
        State.editHouseConfig(values);
    }
    
	render(){
		
        const { error, handleSubmit, reset} = this.props;
        const {parsingType} = this.state;
		return(
			<div>
				<form style={{'margin':'20px 0 0 10px'}} onSubmit={handleSubmit(this.onSubmit)}>
                <KrField 
                        label="渠道名称" 
                        name="sourceKey" 
                        style={{width:'330px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={true} 
                        inline={false}  
                    />
                    <KrField 
                        label="渠道来源" 
                        name="csrSourceId" 
                        component="searchChannel"
						requireLabel={true} 
						style={{width:'330px',margin:'0 35px 5px 0'}}
						inline={false}
					/>
                    <KrField 
                        label="传参姓名" 
                        name="matchName" 
                        style={{width:'330px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={false} 
                        inline={false}  
                    />
                    <KrField 
                        label="传参电话" 
                        name="matchPhone" 
                        style={{width:'330px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={true} 
                        inline={false}  
                    />
                    <KrField 
                        label="传参社区" 
                        name="matchCommunityName" 
                        style={{width:'330px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={false} 
                        inline={false}
                    />
                    <KrField 
                        label="社区ID" 
                        name="matchCommunityId" 
                        style={{width:'330px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={false} 
                        inline={false}
                    />
                    <KrField 
                        label="传参规则(社区)" 
                        name="matchCommunitySplit" 
                        style={{width:'330px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={false} 
                        inline={false}
                    />
                    <KrField 
                        label="解析name" 
                        name="matchArrayName" 
                        style={{width:'330px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={false} 
                        inline={false}
                    />
                    <KrField 
                        label="解析value" 
                        name="matchArrayValue" 
                        style={{width:'330px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={false} 
                        inline={false}
                    />
                    <KrField 
                        label="传参次数" 
                        name="parsingNum" 
                        style={{width:'330px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={false} 
                        inline={false}
                    />
                    <KrField 
                        label="解析类型" 
                        name="parsingType" 
                        component="select"
                        requireLabel={false} 
                        options={parsingType}
						style={{width:'330px',margin:'0 35px 5px 0'}}
						inline={false}
					/>
                    <KrField 
                        label="传参城市" 
                        name="matchCityName" 
                        style={{width:'330px',margin:'0 35px 5px 0'}} 
                        component="input" 
                        requireLabel={false} 
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
    if(!values.sourceKey){
		errors.sourceKey = '渠道名称为必填项';
	}
	if(!values.csrSourceName){
		errors.csrSourceName = '渠道来源为必填项';
	}
	
    if(!values.matchPhone){
		errors.matchPhone = '传参电话为必填项';
	}
	return errors;
}
export default EditChannelForm = reduxForm({
	form: 'EditChannelForm',
	validate,
})(EditChannelForm);
