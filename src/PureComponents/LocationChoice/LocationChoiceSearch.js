import React, { Component, PropTypes } from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import {Http} from "kr/Utils";
import {Actions,Store} from 'kr/Redux';
import {
    Dialog,
    KrField,
    Button
} from 'kr-ui';



class LocationChoiceSearch extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            subCompany:[]
        }
    }
    onSubmit = (values) =>{
        console.log(values,">>>>>>>>")
    }

    render(){
        let {handleSubmit} = this.props;
        let {subCompany} = this.state;
        return(
            
            <div className='m-type-post'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>
                        <KrField grid={1/2}
                            style={{width:262,marginLeft:34,marginBottom:5}}
                            name="subId"
                            component="select"
                            label="楼层"
                            requireLabel={true}
                            options={subCompany}
						/>
                         <KrField grid={1/2}
                            style={{width:262,marginLeft:34,marginBottom:5}}
                            name="subId"
                            component="select"
                            label="类型"
                            requireLabel={true}
                            options={subCompany}
						/>
                         <KrField grid={1/2}
                            style={{width:262,marginLeft:34,marginBottom:5}}
                            inputStyle = {{width:160}}
                            name="all"
                            component="range"
                            label="职务类型名称"
                            requireLabel={false}
						/>
                        <div style = {{display:"inline-block",top:36,left:45,position:"relative"}}>
                            <Button  label="确定" type="submit"/>
                        </div>
                        
                       
                 </form>
			</div>
        )
        
        
       
    }


}
const validate = values =>{
	const errors = {};
    
	return errors
}

export default reduxForm({ form: 'LocationChoiceSearch',validate})(LocationChoiceSearch);