import React, { Component, PropTypes } from 'react';
import {
	Field,
	reduxForm,
    initialize,
    change
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

class MoveSelect extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            other:'',
        }
        this.titleData = {};
    }
    onSubmit = (values) =>{
        let {onSubmit,selectTitle} = this.props;
        if (!values.codeList.length){

           Message.error('请选择内容');
           return ;  
        }
        var params = Object.assign(this.titleData, values)
        onSubmit && onSubmit(params)

    }
   
    componentDidMount() {
    }
 
    getAddressNum = (params) =>{
        var data = Object.assign({},params);
        this.box.getData(data);
        this.titleData = Object.assign(this.titleData,params);
        this.setState({
            other:new Date()
        })
    }
    render(){
        let { title, onCancel, open, communityId, data,url, selectTitle, checked} = this.props;
        return(
           
            <div className = "m-location-choice">
                <AgreementTitle 
                    getFormworkNum={this.getAddressNum}
                />
                <div></div>
                <DoubleColumn 
                    ref ={
                        (ref)=>{
                            this.box = ref;
                        }
                    }
                    onSubmit={this.onSubmit}
                    onClose={onCancel}
                    data = {data||{}}
                    checked = {checked}
                />   
            </div>
        )
    }
}

export default reduxForm({
    form: 'MoveSelect',
})(MoveSelect);