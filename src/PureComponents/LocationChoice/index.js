import React, { Component, PropTypes } from 'react';
import {
	Field,
	reduxForm,
     initialize,
} from 'redux-form';

import {Http} from "kr/Utils";
import {Actions,Store} from 'kr/Redux';
import {
    Dialog,
    Button,
    KrField,
    Message
} from 'kr-ui';
import DoubleColumn from'./DoubleColumn';
var type = [
    {value:"STATION",label:'工位'},
    {value:"SPACE",label:'独立空间'}
]

class LocationChoice extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            subCompany:[],
            floors: [],
        }
        this.submitData = {
            communityId:props.communityId
        };
    }
    onSubmit = (values) =>{
        let {url,communityId,data} = this.props;
        var object = Object.assign({communityId:communityId,numberMin:values.all.startValue,numberMax:values.all.endValue},values)
        
        
        this.box.getData(url,object);
        
       
    }
    floorChange = (values) =>{
        
        this.submitData.floor = values.value;
    }
    typeChange = (values) =>{
       
        this.submitData.detailType = values.value;
    }
    onClick = (values) =>{
        
        let {onSubmit} = this.props;
        if(!this.submitData.floor){
            Message.error('楼层不能为空！');
            return ;
        }
        if(!this.submitData.detailType){
            Message.error('类型不能为空！');
            return ;
        }
       
        values = Object.assign(this.submitData,values);
       
        onSubmit && onSubmit(values)

    }
    
    getFloor = () =>{
        let {communityId} = this.props;
        console.log('communityId',communityId);
        let that = this;
        Http.request("getFloorByComunity",{communityId:communityId}).then(function(response) {
			that.setState({
                floors:that.changeFloor([].concat(response.floors))
            })

		}).catch(function(err) {

		});
    }
    changeFloor = (arr) =>{
        let floors = arr.map((item,index)=>{
            return {value:item,label:item};
        })
        return floors;

    }
    componentDidMount() {
        let {url,data,type} = this.props;
        this.getFloor();
        console.log("box",this.box)
        if(type == "edit"){
            
            this.box.getData(url,data);
            Store.dispatch(initialize('LocationChoice',data));
            
        }
        
    }
    componentWillUnmount(){
         Store.dispatch(initialize('LocationChoice',{floor:'',detailType:'',all:''}));
    }
    render(){
        let {title,onClose,open,communityId,url,handleSubmit,data} = this.props;
        let {subCompany,floors} = this.state;
        return(
            <div className = "m-location-choice">
                <form onSubmit={handleSubmit(this.onSubmit)}>
                   
                        <div className='m-type-post'>
                            <KrField grid={1/2}
                                style={{width:262,marginLeft:34,marginBottom:5}}
                                name="floor"
                                component="select"
                                label="楼层"
                                requireLabel={true}
                                onChange = {this.floorChange}
                                options={floors}
                            />
                            <KrField grid={1/2}
                                style={{width:262,marginLeft:34,marginBottom:5}}
                                name="detailType"
                                component="select"
                                label="类型"
                                onChange = {this.typeChange}
                                requireLabel={true}
                                options={type}
                            />
                            <KrField grid={1/2}
                                style={{width:360,marginLeft:34,marginBottom:5}}
                                inputStyle = {{width:160}}
                                name="all"
                                component="range"
                                label="编号范围"
                                requireLabel={false}
                            />
                            <div style = {{display:"inline-block",top:36,left:45,position:"relative"}}>
                                <Button  label="查询" type="submit"/>
                            </div>
                        </div>
                        <DoubleColumn 
                            ref ={
                                (ref)=>{
                                    this.box = ref;
                                }
                            }
                            
                            onSubmit = {this.onClick}
                            onClose = {onClose}
                            data = {data||{}}
                        />
                    
                    
                </form>
            </div>
        )
        
        
       
    }


}
const validate = values =>{
	const errors = {};
    if(!values.floor && values.floor !== 0){
        errors.floor = "楼层为必选项";
    }
    if(!values.detailType){
        errors.detailType = "类型为必选项";
    }

	return errors
}

export default reduxForm({ form: 'LocationChoice',validate})(LocationChoice);