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
      var id = this.props.detail.id
      Http.request('get-version-detail', {
              id: id
          }).then(function(response) {
              _this.setState({infoList: response})
          }).catch(function(err) {});
    }
    onCancel = () => {
        const {onCancel} = this.props;
        onCancel && onCancel()
    }

    render() {
        const {handleSubmit} = this.props;
        let {infoList} = this.state;
        return (

            <div style={{width:670,marginTop:30,paddingLeft:80,paddingRight:40}}>
                <span className="u-audit-close" style={{marginRight:40}}  onTouchTap={this.onCancel}></span>
                <div className="u-operations-edit-title">
                  <span>版本详情</span>
                </div>
                <KrField
                    style={{width:260}}
                    inline={false}
                    value={infoList.version}
                    label="系统版本"
                    component="labelText"
                />
                <KrField
                    style={{width:260,marginLeft:25}}
                    value={infoList.osType}
                    label="设备类型"
                    inline={false}
                    component="labelText"
                />
                <KrField
                    style={{width:260}}
                    value={infoList.enable=='ENABLE'?'启用':'未启用'}
                    label="启用标识"
                    inline={false}
                    component="labelText"
                />
                <KrField
                    style={{width:260,marginLeft:25}}
                    value={infoList.forced=='FORCED'?'强制':'不强制'}
                    label="是否强制更新"
                    inline={false}
                    component="labelText"
                />
                <KrField
                    style={{width:260}}
                    component="labelText"
                    label="app类型"
                    inline={false}
                    value={infoList.appType}
                />
                <KrField
                    style={{width:260,marginLeft:25}}
                    label="下载地址"
                    value={infoList.downUrl}
                    inline={false}
                    component="labelText"
                />
                <KrField
                    style={{width:260}}
                    inline={false}
                    component="labelText"
                    inline={false}
                    label="发布时间"
                    value={< KrDate style = {{marginTop:5}} value = {
                            infoList.publishTime
                    }
                    format = "yyyy-mm-dd HH:MM:ss" />}
                />
                <KrField
                    style={{width:545}}
                    label="版本更新内容"
                    inline={false}
                    value={infoList.updateInfo}
                    component="labelText"
                />

            </div>
        );
    }

}
