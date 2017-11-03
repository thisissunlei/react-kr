import React, { Component, PropTypes } from 'react';
import {
	Field,
	reduxForm,
     initialize,
} from 'redux-form';

import {Http} from "kr/Utils";
import {Actions,Store} from 'kr/Redux';
import Message from "../Message";
import DoubleColumn from'./DoubleColumn';
import AgreementTitle from './AgreementTitle';


var type = [
    {value:"STATION",label:'工位'},
    {value:"SPACE",label:'独立空间'}
]

export default class MoveSelect extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            subCompany:[],
            floors: [],
            selected:props.selected||{},
        }
        this.submitData = {
            communityId:props.communityId,
            floor:props.data && props.data.floor || '',
            // detailType:props.data && props.data.detailType || '',
        };
    }
    onSubmit = (values) =>{
        let {url,communityId,data,selectTitle} = this.props;
        var object={};
      
            object =values;            
        this.box.getData(url,object);  
    }
    
    floorChange = (values) =>{
        
        this.submitData.floor = values.value;
    }
    typeChange = (values) =>{
       
        this.submitData.detailType = values.value;
    }
    onClick = (values) =>{
        
        let {onSubmit,selectTitle} = this.props;

        if(selectTitle=='stage'){

            if(!this.submitData.floor){
                Message.error('楼层不能为空！');
                return ;
            }
            if(!this.submitData.detailType){
                Message.error('类型不能为空！');
                return ;
            }
            if(!values.codeList.length){
                Message.error('已选列表不能为空！');
                return ;
            }   
            values = Object.assign(this.submitData,values);
        }
        
        onSubmit && onSubmit(values)

    }
    
    getFloor = () =>{
        let {communityId} = this.props;
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
       
    }
   
    render(){
        let { title, onClose, open, communityId, url, data, selectTitle, checked} = this.props;
        let {subCompany,floors} = this.state;
        return(
            <div className = "m-location-choice">
                <AgreementTitle 
                    communityChange={this.communityChange}
                    codeChange={this.codeChange}
                    onSubmit={this.onSubmit}
                />
                <DoubleColumn 
                    ref ={
                        (ref)=>{
                            this.box = ref;
                        }
                    }
                    
                    onSubmit = {this.onClick}
                    onClose = {onClose}
                    data = {data||{}}
                    checked = {checked}
                />   
            </div>
        )
    }
}

 