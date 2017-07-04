import React from 'react';

import './index.less';

import {
    Dialog,
} from 'kr-ui';


export default class UpdateLog extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            updateLogOpen: true,
        }

    }

    openUpdateLog = () => {
        this.setState({
            updateLogOpen: false
        });
    }

    renderLogList = () => {

       const list = [
           {},
           {}
       ]; 


        return (

            <ul className="log-list">
                <li>
                    1，销控表优化信息表格，更加方便我们社区的管家们查看，心情棒棒哒，快去体验吧～go~go~
                            </li>
                <li>
                    2，
                    销控表优化信息表格，更加方便我们社区的管家们查看，心
                            </li>
            </ul>
        );

    }

    render() {

        return (

            <Dialog modal={true} open={this.state.updateLogOpen}
                dialogHeaderStyle={{ backgroundColor: '#fff', display: 'none' }}
                bodyStyle={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, borderRadius: 5 }}
                contentStyle={{ width: 500, height: 600 }}
            >
                <div className="m-update-log">
                    <div className="log-header">
                        <h3>Kr Space -v2.0</h3>
                        <span className="time">12.20</span>
                    </div>
                    <div className="log-body">
                        <div className="title-main">【新功能攻略】</div>
                        {this.renderLogList()}
                    </div>
                    <div className="log-footer">
                        <a className="close-btn" onClick={this.openUpdateLog}>关闭</a>
                    </div>
                </div>
            </Dialog>

        );

    }

}