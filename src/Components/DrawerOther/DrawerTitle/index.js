





import React from 'react';
import {
  Grid,
  Row,
  Col
} from '../../Grid';
import ButtonGroup from '../../ButtonGroup';
import Button from '../../Button';
import './index.less';
export default class DrawerTitle extends React.Component {

    constructor(props) {
        super(props);
    }

    onCancel =()=>{
        const {onCancel} = this.props;
        onCancel && onCancel();
    }
    render() {
        let {title,iconClass} = this.props;
        return (
            <div className="ui-drawer-title">
                    <div><span className={iconClass || "new-icon"}></span><label className="title-text" style={{marginLeft:10}}>{title||''}</label></div>
                    <div className="order-close" onClick={this.onCancel}></div>
            </div>
        );
    }
  }

