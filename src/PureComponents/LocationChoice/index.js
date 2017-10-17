import React, { Component, PropTypes } from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import {Http} from "kr/Utils";
import {Actions,Store} from 'kr/Redux';
import {
    Dialog

} from 'kr-ui';
import LocationChoiceSearch from './LocationChoiceSearch';
import DoubleColumn from'./DoubleColumn';


export default class LocationChoice extends Component {
    constructor(props, context) {
        super(props, context);
    }
    select = (values) =>{
        
    }
    render(){
        let {title,onClose,open,communityId} = this.props;
        return(
            <div className = "m-location-choice">
                <Dialog
                    title="编辑职务类型"
                    onClose={onClose}
                    open={open}
                    contentStyle ={{ width: '666px',height:'auto'}}
                >
                    <LocationChoiceSearch communityId = {communityId} onSubmit = {this.select}/>
                    <DoubleColumn/>
                </Dialog>
            </div>
        )
        
        
       
    }


}
