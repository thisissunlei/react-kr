import React from 'react';

import WrapComponent from '../WrapComponent';
import Input from '../../Input';
import Message from '../../Message'
import { stopSubmit, submit, blur, stopAsyncValidation, touch } from 'redux-form';

import './index.less';
import Dialog from '../../Dialog'
// import mockData from './Data.json';
import MoveSelect from '../../MoveSelect';
import { Http } from "kr/Utils";
export default class AddressComponent extends React.Component {

    static propTypes = {
        inline: React.PropTypes.bool,
        simple: React.PropTypes.bool,
        heightStyle: React.PropTypes.object,
        maxLength: React.PropTypes.number,
        autoFocus: React.PropTypes.bool,
    }

    constructor(props, context) {
        super(props, context)
        this.state = {
            isDialog: false,
            allData: [],
            oneOpen: true,
            other: '',
        }
        this.allData = [];
    }

    onFocus = (value) => {
        let {isDialog} = this.state;

        this.setState({
            isDialog: !isDialog,
        })

    }
    changeData = (arr) =>{
        var newData = arr.map((item,index)=>{
            return {label:item.id,label:item.name}
        })  
    }
    getData = () =>{
        const _this = this;
        Http.request("getTheCommunity").then(function (response) {
            var allData = [].concat(this.changeData(response.items));
            _this.setState({
                allData,
            });
        }).catch(function (err) {

        });
    }
    onCancel = () => {
        this.dlogSwidch();
    }

    onSubmit = (data) => {
        this.dlogSwidch();
    }


    dlogSwidch = () => {
        this.setState({
            isDialog: false,
        })
    }

    componentDidMount() {
        // this.getData();
    }
    
    render() {

        const { isDialog, allData, oneOpen } = this.state;
        let {
            input,
            prompt,
            label,
            notifys,
            type,
            meta: { touched, error },
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
            ajaxUrlName,
            valueText,
            checked,
            ...other
        } = this.props;

        if (type === 'hidden') {
            return (
                <div>
                    <Input {...input} type="hidden" />
                </div>
            );
        }
        let placeholderText = placeholder || label;
        let className = '';

        if (touched && error) {
            className = 'error-input';
        }
        if (prompt) {
            placeholderText = "";
        }

        var wrapProps = {
            label,
            requireLabel,
            inline,
            simple,
            notifys,
            wrapStyle: style,
        };

        var inputProps = {
            ...input,
            type,
            placeholder: placeholderText,
            disabled,
            className,
            style: heightStyle,
            onChange: this.onChange,
            //  onBlur:this.onBlur,
            //  onFocus:this.onFocus,
            ...other,
            autoFocus,
        }
       

        return (
            <WrapComponent {...wrapProps}>

                <Input onClick={this.onFocus} {...inputProps} style={{ display: "none" }} />
                <div className="oa-imulation-input "  onClick={this.onFocus}>{input.value.laber||''}</div>
                {touched && error && <div className="error-wrap"> <span>{error}</span> </div>}
                <div className="select-tree">

                    <Dialog
                        title={label}
                        onClose={this.dlogSwidch}
                        open={isDialog}
                        noMaxHeight={true}
                        contentStyle={{ width: '653px',paddingBottom:'30px', position: 'fixed', left: "50%", marginLeft: '-345px' }}
                    >
                        <MoveSelect 
                            data = {allData} 
                            onCancel = {this.onCancel}   
                            onSubmit={this.onSubmit} 
                            selected = {input.value} 
                            checked={checked||false}
                        />
                    </Dialog>
                </div>
            </WrapComponent>
        );
    }
}
