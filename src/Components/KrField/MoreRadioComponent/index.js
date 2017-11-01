import React from 'react';
import WrapComponent from '../WrapComponent';
export default class MoreRadioComponent  extends React.Component{

	constructor(props){
        super(props)
        this.state={
            checkData:[]
        }
    }
    
    componentWillReceiveProps(nextProps){
        if(Array.prototype.isPrototypeOf(nextProps.input.value)){
            this.setState({
                checkData:nextProps.input.value
            })
        }
    }

    onChange=(event,item,index)=>{
        let {checkData}=this.state;
        checkData=[].concat(checkData);
        item.checked=event.target.checked;
        checkData[index]=item;
        this.setState({
            checkData
        })
    }
    

	render(){

		let { input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder,style,inline} = this.props;
		const Styles = Object.assign(style,{
			paddingRight:10,
		});
        let {checkData}=this.state;
        var _this=this;
        
		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline}>
                {
                    checkData.map((item,index)=>{
                        return <div style={{display:'inline-block',paddingRight:15}}>
                                    <input {...input} type='checkbox' placeholder={placeholder|| label} disabled={disabled} checked={item.checked} onChange={(event)=>{
                                       _this.onChange(event,item,index);
                                    }}></input>
                                    <span style={{paddingLeft:5}}>{item.label}</span>
                               </div>
                    })
                }
			</WrapComponent>
		)

	}

}
