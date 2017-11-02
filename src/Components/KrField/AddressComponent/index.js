import React from 'react';

import WrapComponent from '../WrapComponent';
import Input from '../../Input';
import Message from '../../Message'
import {stopSubmit,submit,blur,stopAsyncValidation,touch} from 'redux-form';
import './index.less';
import Dialog from '../../Dialog'
import {
    LocationChoice
} from 'kr/PureComponents'
export default class AddressComponent extends React.Component{

	static propTypes = {
		inline:React.PropTypes.bool,
		simple:React.PropTypes.bool,
		heightStyle:React.PropTypes.object,
		maxLength:React.PropTypes.number,
		autoFocus:React.PropTypes.bool,
	}

	constructor(props,context){
		super(props,context)
		this.state = {
			isDialog:false,
		}
    }
    dlogSwidch = () =>{
        let {isDialog} = this.state;
        this.setState({
            isDialog:!isDialog
        })
    }
    onSubmit = (values) =>{
        let params = Object.assign({},values);
    
    }
    inputClick = () =>{
        this.dlogSwidch();
    }
	render(){

		const {isDialog} = this.state;

		
		let {
            input,
            prompt,
            label,
            notifys, 
            type, 
            meta: { touched, error } ,
            requireLabel,
            onChange,
            onBlur,
            onFocus,
            disabled,
            placeholder,
            style,
            inline,
            simple,
            heightStyle,
            autoFocus,
            ...other
        } = this.props;
        var wrapProps = {
            label,
            requireLabel,
            inline,
            simple,
            notifys,
            wrapStyle:style,
        };
        let placeholderText=placeholder||label;
        var inputProps = {
            ...input,
            type,
            placeholder:placeholderText,
            disabled,
            style:heightStyle,
            onChange:this.onChange,
            ...other,
            autoFocus,
        }


        return (
            <WrapComponent {...wrapProps}>
                
                <Input onClick = {this.inputClick} {...inputProps} />
                
                <Dialog
                    title={label}
                    onClose={this.dlogSwidch}
                    open={isDialog}
                    noMaxHeight = {true}
                    contentStyle ={{ width: '653px',height:'580px',position:'fixed',left: "50%",marginLeft:'-345px'}}
                >
                    {/*
                         <LocationChoice 
                        onChange = {this.dlogSwidch} 
                        onSubmit = {this.onSubmit} 
                    />
                    
                    */}
                   
                </Dialog>
            
            </WrapComponent>
        );
	 }
 }
