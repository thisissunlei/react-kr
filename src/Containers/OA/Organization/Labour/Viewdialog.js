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
        var orgType='';
        if(infoList.orgType=="SUBCOMPANY"){
            orgType = "分部";
        }else if(infoList.orgType=="DEPARTMENT"){
            orgType="部门";
        }
        return (

              <div style={{width:644,marginTop:20,paddingLeft:23}}>
                <KrField
                    style={{width:262,marginTop:6,marginRight:28,marginLeft:35}}
                    inline={false}
                    value={infoList.orgName}
                    label="名称"
                    grid={1/2}
                    component="labelText"
                />
                <KrField
                    style={{width:262,marginTop:6}}
                    inline={false}
                    value={orgType}
                    label="类型"
                    grid={1/2}
                    component="labelText"
                />
                <KrField
                    style={{width:262,marginTop:6,marginRight:28,marginLeft:35}}
                    value={infoList.orgSort}
                    label="排序号"
                    inline={false}
                    grid={1/2}
                    component="labelText"
                />
                <KrField
                    style={{width:262,marginTop:6}}
                    value={infoList.code}
                    label="编码"
                    inline={false}
                    grid={1/2}
                    component="labelText"
                />
                <KrField
                    style={{width:262,marginTop:6,marginRight:28,marginLeft:35}}
                    value={infoList.chargeName}
                    label="负责人"
                    grid={1/2}
                    inline={false}
                    component="labelText"
                />
                
                <KrField
                    style={{width:262,marginRight:28}}
                    component="labelText"
                    label="管理员"
                    grid={1/2}
                    inline={false}
                    value={infoList.adminName}
                />
            </div>
        );
    }

}
