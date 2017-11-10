import React from 'react';

import WrapComponent from '../../KrField/WrapComponent';
import Message from '../../Message'

import './index.less';
import Dialog from '../../Dialog'
// import mockData from './Data.json';
import MoveSelect from '../../MoveSelect';
import { Http } from "kr/Utils";
import KrField from '../../KrField';
export default class AddressBtn extends React.Component {

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
        let { isDialog } = this.state;

        this.setState({
            isDialog: !isDialog,
        })

    }
    changeData = (arr) => {
        var newData = arr.map((item, index) => {
            return { label: item.id, label: item.name }
        })
    }
    getData = () => {
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
        // let { input } = this.props;
        // input.onChange(data);
        // this.dlogSwidch();
        // this.setState({
        //     other: new Date()
        // })
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
        // const { requireLabel, placeholder,label} = this.props;
        return (<div>2342342</div>)
        return (
            <div className="browse-btn-address">
                <KrField {...this.props}/>
                <div className="select-tree">
                    <Dialog
                        title={label}
                        onClose={this.dlogSwidch}
                        open={isDialog}
                        noMaxHeight={true}
                        contentStyle={{ width: '653px', paddingBottom: '30px', position: 'fixed', left: "50%", marginLeft: '-345px' }}
                    >
                        <MoveSelect
                            data={input.value || []}
                            onCancel={this.onCancel}
                            onSubmit={this.onSubmit}
                            checked={checked || false}
                        />
                    </Dialog>
                </div>
            </div>
        );
    }
}
