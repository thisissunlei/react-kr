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

var type = [
    {value:"FLOOR",label:'楼层'},
    {value:"STATION",label:'工位'},
    {value:"SPACE",label:'独立空间'}
]

class LocationChoiceSearch extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            subCompany:[],
            floors: [],
        }
    }
    
    onSubmit = (values) =>{
        let {onSubmit} = this.props;
        onSubmit && onSubmit(values);
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
        this.getFloor();
    }
    render(){
        let {handleSubmit} = this.props;
        let {subCompany,floors} = this.state;
        return(
            
            <div className='m-type-post'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>
                        <KrField grid={1/2}
                            style={{width:262,marginLeft:34,marginBottom:5}}
                            name="floor"
                            component="select"
                            label="楼层"
                            requireLabel={true}
                            options={floors}
						/>
                         <KrField grid={1/2}
                            style={{width:262,marginLeft:34,marginBottom:5}}
                            name="detailType"
                            component="select"
                            label="类型"
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