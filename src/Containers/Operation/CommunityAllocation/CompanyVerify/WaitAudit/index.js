import React from 'react';
import {Http} from 'kr/Utils';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
  Button,
  Dialog,
  Title,
  KrDate,
  Tooltip,
  Drawer,
  Message,
  CheckPermission
} from 'kr-ui';

import './index.less';
export default class WaitAudit extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      itemDetail: {},
    }
  }
 

  render() {
    let {
      itemDetail
    } = this.state;
    return (
      <div className="g-wait-audit">
       
        111
      </div>
    );

  }

}
