import React, { Component, PropTypes } from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import {Http} from "kr/Utils";
import {Actions,Store} from 'kr/Redux';
import {
    Dialog,
    Button

} from 'kr-ui';
import LocationChoiceSearch from './LocationChoiceSearch';
import DoubleColumn from'./DoubleColumn';


export default class LocationChoice extends Component {
    constructor(props, context) {
        super(props, context);
    }
    select = (values) =>{
        let {url} = this.props;
        var object = Object.assign({numberMax:values.all.startValue,numberMin:values.all.endValue},values)
        this.box.getData(url,object);
        console.log(url,"select")
        // this.box.getData(url,object);
    }
    onSubmit = (values) =>{
        let {onSubmit} = this.props;
       
        onSubmit && onSubmit(values)

    }
    render(){
        let {title,onClose,open,communityId,url} = this.props;
        return(
            <div className = "m-location-choice">
                <Dialog
                    title={title}
                    onClose={onClose}
                    open={open}
                    contentStyle ={{ width: '666px',height:'auto'}}
                >
                    <LocationChoiceSearch communityId = {communityId} onSubmit = {this.select}/>
                    <DoubleColumn 
                        ref ={
                            (ref)=>{
                                this.box = ref;
                            }
                        }
                        url = {url}
                        onSubmit = {this.onSubmit}
                        onClose = {onClose}
                    />
                   
                </Dialog>
            </div>
        )
        
        
       
    }


}
