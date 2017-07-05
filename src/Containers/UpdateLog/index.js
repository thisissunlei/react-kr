import React from 'react';

import './index.less';

import {
    Dialog,
} from 'kr-ui';

import {Http,DateFormat} from 'kr/Utils';


export default class UpdateLog extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            show: false,
            ver:{
                id:'',
                version:'',
                publishDate:+new Date(),
                ctime:+new Date(),
            },
        }

    }

    componentDidMount(){

        const that = this;

        Http.request('get-version-log').then(function(response){
            that.setState({...response});
        });

    }

    close = () => {

        const {ver,show} = this.state;

        if(!show){
            return ;
        }

         Http.request('version-log-close',{},{
             verId:ver.id,
         });

        this.setState({
            show: false
        });

    }

    renderLogList = () => {

        const {ver,show} = this.state;

        if(!show){
            return null;
        }

        var list = ver.content.split('。');

        list = list.filter(function(item){
            return !!item;
        });

        return (

            <ul className="log-list">
                {
                    list.map((item,index)=>(
                        <li key={index}>{index+1} : {item}。</li>
                    ))
                }
            </ul>
        );

    }

    render() {

        const {ver} = this.state;

        return (

            <Dialog modal={true} open={this.state.show}
                dialogHeaderStyle={{ backgroundColor: '#fff', display: 'none' }}
                bodyStyle={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, borderRadius: 5 }}
                contentStyle={{ width: 500, height: 600 }}
            >
                <div className="m-update-log">
                    <div className="log-header">
                        <h3>Kr Space -v{ver.version}</h3>
                        <span className="time">{DateFormat(ver.publishDate,'mm.dd')}</span>
                    </div>
                    <div className="log-body">
                        <div className="title-main">【新功能攻略】</div>
                        {this.renderLogList()}
                    </div>
                    <div className="log-footer">
                        <a className="close-btn" onClick={this.close}>关闭</a>
                    </div>
                </div>
            </Dialog>

        );

    }

}