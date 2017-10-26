import React from 'react';
import {	
	KrField,
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button,
    AllCheck,
    Dialog
} from 'kr-ui';
import {
	observer
} from 'mobx-react';
import {reduxForm,change}  from 'redux-form';
import {Store} from 'kr/Redux';
import './index.less';
import AddCode from './AddCode';
import DeleteCode from './DeleteCode';



class EditReg  extends React.Component{

	constructor(props,context){
        super(props, context);
        this.state={
            openCode:false,
            openDelete:false,
            other:''
        }
        this.checkData=[];
        this.configList=[];
        this.id='';
    }
    
    componentDidMount(){
        
    }
    
   
    componentWillReceiveProps(nextProps){  
        if(nextProps.codeList){
            this.configList=nextProps.codeList;
        }
    }

    
    
    componentWillUnmount(){
        
    }
    
    onSubmit=(value)=>{
        var values=Object.assign({},value);
        var codeArray=this.configList||'';
        var code=[];
        if(codeArray&&codeArray.length!=0){
            codeArray.map((item,index)=>{
                code.push(item.label);
            })
            values.codes=code.join(',');
        }else{
            values.codes=''; 
        }
        const {onSubmit}=this.props;
        onSubmit && onSubmit(values);
    }
    
    onCancel=()=>{
        const {onCancel}=this.props;
        onCancel && onCancel();
    }

    cancelCode=()=>{
        this.setState({
            openCode:!this.state.openCode 
        })
    }
    
    codeSubmit=(values)=>{
        if(values.code){
            var codeList=[];
            var num=[];
            var code=values.code.replace(/\s+/g,"");
            var codeEnd=code.replace('，',',');
            (codeEnd.split(',')).map((item,index)=>{
                var list={};
                list.label=item;
                list.checked=false;
                codeList.push(list);
            })
            for(var i=0;i<codeList.length;i++){
                for(var j=0;j<this.configList.length;j++){
                    if(codeList[i].label==this.configList[j].label){
                        num.push(i); 
                    }
                }
            }
            if(num.length!=0){
                num.map((item,index)=>{
                    codeList.splice(item,1); 
                })
            }
            this.configList=this.configList.concat(codeList);
        }
        this.setState({
            other:+new Date()
        })
        this.cancelCode();
    }
    


    //以下是复选框事件
    onChange=(params)=>{
      this.checkData=params;
	}

	allCheck=(params)=>{
     this.checkData=params;
	}
    
	noSameCheck=(params)=>{
     this.checkData=params;
    }
    
    deleteFn=()=>{
        if(this.checkData.length!=0){
           this.cancelDelete();        
        }
    }

    cancelDelete=()=>{
        this.setState({
            openDelete:!this.state.openDelete
        })
    }
    
    deleteSubmit=()=>{
        for(var i=0;i<this.checkData.length;i++){
            for(var j=0;j<this.configList.length;j++){
                if(this.checkData[i].label==this.configList[j].label){
                    this.configList.splice(j,1);
                }
            }
        }
        this.checkData=[];
        this.cancelDelete();
        this.setState({
            other:+new Date()
        })
    }

    
    addFn=()=>{
      this.cancelCode();
    }
    

	render(){

        let {handleSubmit,communityId}=this.props;

      
        
		return(

			<div className='m-reg-add'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>
                      <div className="title" style={{marginBottom:"30px"}}>
                            <div style={{marginLeft:-40}}><span className="new-icon-add"></span><label className="title-text">编辑注册地址</label></div>
                            <div className="person-close" onClick={this.onCancel}></div>
                      </div>

                      <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="communityId"
                            component="searchRegCommunity"
                            label="社区名称"
                            requireLabel={true}
                            inline={false}
                            id={communityId}
						/>

                        <KrField grid={1/2}
                            style={{width:262,marginLeft:29,marginBottom:5}}
                            name="count"
                            component="input"
                            label="数量"
                            requireLabel={true}
						/>

                        <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="status"
                            component="select"
                            label="状态"
                            requireLabel={true}    
                            options={[{label:'正常出租',value:'RENTAL'},{label:'备案中',value:'PUT_ON_RECORD'},{label:'暂停售卖',value:'SUSPEND_SALE'}]}
						/>

                        <KrField grid={1/2}
                            style={{width:262,marginLeft:29,marginBottom:5}}
                            name="codeType"
                            component="select"
                            label="编号方式"
                            requireLabel={true}
                            options={[{label:'无编号',value:'NONE'},{label:'无限数量自编号',value:'LIMITLESS'},{label:'按工位编号',value:'STATION'},{label:'按房间编号',value:'SPACE'}
                        ,{label:'固定数量固定编号',value:'RULE'},{label:'固定数量自编号',value:'RULELESS'},{label:'业主编号',value:'OWNER'}]}
						/>

                        <KrField grid={1} label="地址模版（需要替换为实际编号的地方填写${0}）" name="addressTemp" heightStyle={{height:"78px",width:'544px'}} style={{width:552,marginTop:5}} component="textarea"  maxSize={100} placeholder='请输入地址模版'  lengthClass='reg-len-textarea' requireLabel={true}/>

                        
                        <AllCheck  
                            config={this.configList} 
                            onChange={this.onChange}
                            allCheck={this.allCheck}
                            noSameCheck={this.noSameCheck}
                            deleteFn={this.deleteFn}
                            addFn={this.addFn}
                        />

                       <Grid style={{marginBottom:5,marginLeft:-42}}>
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

                 {/*添加*/}
				<Dialog
					title="添加编号"
					onClose={this.cancelCode}
					open={this.state.openCode}
					contentStyle ={{ width: '600px',height:'auto'}}
				>
				<AddCode
					onCancel={this.cancelCode}
					onSubmit={this.codeSubmit}
				/>
				</Dialog>

                 {/*删除*/}
                 <Dialog
                    title="提示"
                    onClose={this.cancelDelete}
                    open={this.state.openDelete}
                    contentStyle ={{ width: '446px',height:'236px'}}
                    >
                    <DeleteCode
                        onCancel={this.cancelDelete}
                        onSubmit={this.deleteSubmit}
                    />
                </Dialog>

			</div>
		);
	}
}

const validate = values =>{
	const errors = {};

     let regNum=/^[1-9]\d*|0$/;
    
    
        if(!values.communityId){
            errors.communityId='请输入社区名称';
        }
    
        if(!values.count){
            errors.count='请输入数量';
        }else if((!regNum.test(values.count))&&values.count!=-1){
            errors.count='数量为大于-1的整数';
        }
        
    
        if(!values.status){
            errors.status='请输入状态';
        }
        
        if(!values.codeType){
            errors.codeType='请输入编号方式';
        }
    
        if(!values.addressTemp){
            errors.addressTemp='请输入地址模版';
        }
    
	return errors
}

export default reduxForm({ form: 'EditReg',validate})(EditReg);