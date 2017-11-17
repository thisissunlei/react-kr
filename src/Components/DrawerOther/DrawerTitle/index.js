





import React from 'react';
import {
  Grid,
  Row,
  Col
} from '../../Grid';
import ButtonGroup from '../../ButtonGroup';
import Button from '../../Button';
import './index.less';
import create from 'kr-img/create.png'
import edit from 'kr-img/edit.png'
import view from 'kr-img/view.png'
import close from 'kr-img/close.png'
export default class DrawerTitle extends React.Component {

    constructor(props) {
        super(props);
    }

    onCancel =()=>{
        const {onCancel} = this.props;
        onCancel && onCancel();
    }
    checkType=()=>{
        let {title} = this.props;
        let type = 'view';
        type = /查看/.test(title)?'view':type;
        type = /编辑/.test(title)?'edit':type;
        type = /新建/.test(title)?'create':type;
        type = /新增/.test(title)?'create':type;
        let picStyle={};
        switch (type) {
            case 'create':
                picStyle = {
                    background:`url(${create}) no-repeat`,
                    backgroundSize:'cover'
                };
                break;
            case 'edit':
                picStyle = {
                    background:`url(${edit}) no-repeat`,
                    backgroundSize:'cover'
                };
                break;
            case 'view':
                picStyle = {
                    background:`url(${view}) no-repeat`,
                    backgroundSize:'cover'
                };
                break;
            default :
                picStyle = {
                    background:`url(${view}) no-repeat`,
                    backgroundSize:'cover'
                };
                break;
        }
        return picStyle
    }
    render() {
        let {title,iconClass} = this.props;
        let pic = this.checkType();

        let closeStyle={
            background:`url(${close}) no-repeat`,
            backgroundSize:'cover'
        }

        return (
            <div className="ui-drawer-title">
                    <div><span className={iconClass || "new-icon"} 
                    style={pic}></span><label className="title-text">{title||''}</label></div>
                    <div className="order-close" style={closeStyle} onClick={this.onCancel}></div>
            </div>
        );
    }
  }

