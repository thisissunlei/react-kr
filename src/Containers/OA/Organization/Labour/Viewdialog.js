import React from 'react';
import {
	Http
} from "kr/Utils";
import {
	KrField,
	KrDate,
} from 'kr-ui';
export default class Viewdialog extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
    			infoList:[]
    		}
    }
    componentDidMount() {
    //   var _this = this;
    //   var id = this.props.detail.id
    //   Http.request('get-version-detail', {
    //           id: id
    //       }).then(function(response) {
    //           _this.setState({infoList: response})
    //       }).catch(function(err) {});
    }
    onCancel = () => {
        const {onCancel} = this.props;
        onCancel && onCancel()
    }

    render() {
        let {infoList} = this.state;
        return (

              <div style={{width:262,marginTop:20,paddingLeft:23}}>
                <KrField
                    style={{width:262}}
                    inline={false}
                    value={infoList.version}
                    label="机构名称"
                    component="labelText"
                />
                <KrField
                    style={{width:262}}
                    value={infoList.osType}
                    label="排序"
                    inline={false}
                    component="labelText"
                />
                
                <KrField
                    style={{width:262}}
                    component="labelText"
                    label="技术部ID号"
                    inline={false}
                    value={infoList.appType}
                />
            </div>
        );
    }

}
