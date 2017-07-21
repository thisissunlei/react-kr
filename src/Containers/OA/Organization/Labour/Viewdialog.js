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
      var _this = this;
      var orgId = this.props.detail.orgId;
      var orgType = this.props.detail.orgType;
      Http.request('org-detail', {
              orgId: orgId,
              orgType: orgType
          }).then(function(response) {
              _this.setState({infoList: response})
          }).catch(function(err) {});
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
                    value={infoList.orgName}
                    label="名称"
                    component="labelText"
                />
                <KrField
                    style={{width:262,marginTop:6}}
                    value={infoList.orgSort}
                    label="排序号"
                    inline={false}
                    component="labelText"
                />
                <KrField
                    style={{width:262,marginTop:6}}
                    value={infoList.code}
                    label="编码"
                    inline={false}
                    component="labelText"
                />
                <KrField
                    style={{width:262,marginTop:6}}
                    value={infoList.chargeName}
                    label="负责人"
                    inline={false}
                    component="labelText"
                />
                
                <KrField
                    style={{width:262}}
                    component="labelText"
                    label="管理员"
                    inline={false}
                    value={infoList.adminName}
                />
            </div>
        );
    }

}
