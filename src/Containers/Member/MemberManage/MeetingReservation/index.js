
import React from 'react';
import {initialize} from 'redux-form';

import {Actions,Store} from 'kr/Redux';
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
	Section,
	Grid,
	Row,
	Col,
	Dialog,
	SearchForms,
	ListGroup,
	ListGroupItem,
	Message,
	Title,
	SnackTip

} from 'kr-ui';

import ReservationDetail from './ReservationDetail';
import Timeline from './Timeline';
import './index.less';

export default class MeetingReservation extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {

		}
	}



    render(){

        return(
            <div className="metting-reservation">
				<Timeline />
            </div>
        );
    }


}
