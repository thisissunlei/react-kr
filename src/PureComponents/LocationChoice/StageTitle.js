import React from 'react';
import {
    Button,
    KrField,
} from 'kr-ui';
import {
	Field,
	reduxForm,
     initialize,
} from 'redux-form';

class StageTitle  extends React.Component{

	constructor(props,context){
		super(props, context);

	}

    floorChange=(value)=>{
        let {floorChange}=this.props;
        floorChange && floorChange(value);
    }

    typeChange=(value)=>{
        let {typeChange}=this.props;
        typeChange && typeChange(value);
    }

    onSubmit=(values)=>{
        let {onSubmit}=this.props;
        onSubmit && onSubmit(values);
    }

	render(){

        let {floors,type,handleSubmit}=this.props;

		return(
            
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
                 </form>
			
		);
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

export default reduxForm({ form: 'StageTitle',validate})(StageTitle);