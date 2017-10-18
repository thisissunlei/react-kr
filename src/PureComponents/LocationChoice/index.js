import React, { Component, PropTypes } from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import {Http} from "kr/Utils";
import {Actions,Store} from 'kr/Redux';
import {
    Dialog,
    Button,
    KrField
} from 'kr-ui';
import LocationChoiceSearch from './LocationChoiceSearch';
import DoubleColumn from'./DoubleColumn';
var type = [
    {value:"FLOOR",label:'楼层'},
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
    }
    onSubmit = (values) =>{
        let {url,communityId} = this.props;
        var object = Object.assign({communityId:communityId,numberMax:values.all.startValue,numberMin:values.all.endValue},values)
        this.box.getData(url,object);
        
       
    }
    onClick = (values) =>{
        
        let {onSubmit} = this.props;
       
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
        this.getFloor();
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
                    <Dialog
                        title={title}
                        onClose={onClose}
                        open={open}
                        contentStyle ={{ width: '666px',height:'auto'}}
                    >
                        <div className='m-type-post'>
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
                        </div>
                        <DoubleColumn 
                            ref ={
                                (ref)=>{
                                    this.box = ref;
                                }
                            }
                            url = {url}
                            onSubmit = {this.onClick}
                            onClose = {onClose}
                            data = {data||{}}
                        />
                    
                    </Dialog>
                </form>
            </div>
        )
        
        
       
    }


}
const validate = values =>{
	const errors = {};
    if(!values.floor && values.floor != 0){
        errors.floor = "楼层为必选项";
    }
    if(!values.detailType){
        errors.detailType = "类型为必选项";
    }

	return errors
}

export default reduxForm({ form: 'LocationChoice',validate})(LocationChoice);