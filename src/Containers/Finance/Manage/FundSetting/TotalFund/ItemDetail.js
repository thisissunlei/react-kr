import React, {PropTypes} from 'react';
import {
    KrField,
    KrDate
} from 'kr-ui';

export default class ItemDetail extends React.Component {

    static PropTypes = {
        detail: React.PropTypes.object,
        onCancel: React.PropTypes.func
    }
    constructor(props) {
        super(props);
        this.state = {
          status:'',
          position:'',
        }
        this.onCancel = this.onCancel.bind(this);
    }

    onCancel() {
        const {onCancel} = this.props;
        onCancel && onCancel();
    }

    render() {
      let detail = this.props.detail;

      var status = detail.status;
      var position= detail.position;
      var twinsFlag= detail.twinsFlag;
      if (detail.status == "ENABLE") {
          status = "启用"
      } else if (detail.status == "DISENABLE") {
          status = "关闭"
      }
      if (detail.position == "BOTH") {
          position = "全部"
      } else if (detail.position == "PAYMENT") {
          position = "回款"
      }

        return (

            <div style={{
                marginTop: 35,
                marginLeft: 30
            }}>
                <KrField grid={1 / 2} component="labelText" label="编码" value={detail.categoryCode} inline={false}/>
                <KrField grid={1 / 2} component="labelText" label="排序号" value={detail.sortNum} inline={false}/>
                <KrField grid={1 / 2} component="labelText" label="款项名称" value={detail.categoryName} inline={false}/>
                <KrField grid={1 / 2} component="labelText" label="显示位置" value={position}  inline={false}/>
                <KrField grid={1 / 2} component="labelText" label="状态" value={status} inline={false}/>
                <KrField grid={1 / 2} component="labelText" label="创建人" value={detail.createrName} inline={false}/>
                <KrField grid={1 / 2} component="labelText" label="创建时间" value={< KrDate style = {{marginTop:5}} value = {
                    detail.createTime
                }
                format = "yyyy-mm-dd HH:MM:ss" />} inline={false}/>
              <KrField grid={1} style={{width:520}} component="labelText" label="备注" value={detail.remark} inline={false}/>

            </div>

        );
    }
}
