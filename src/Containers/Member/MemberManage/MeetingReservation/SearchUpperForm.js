import React from 'react';
import {
	observer,
	inject
} from 'mobx-react';
import {
	reduxForm,
} from 'redux-form';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	ListGroup,
	SearchForm,
	ListGroupItem
} from 'kr-ui';

class MeetingReservationFrom extends React.Component {

	static propTypes = {

	}

	constructor(props) {
		super(props);
		this.state={
		
		}
	}
    onSubmit = () =>{

    } 
	render() {
        const {handleSubmit} = this.props;
	  	return(
			<div className = "meeting-reservation-from" >
			    <form onSubmit={handleSubmit(this.onSubmit)}>
                    <KrField grid={1/2} label="时间:" name="signStartDate" style ={{width:310}}  component="date" inline={true}/>
                    <KrField grid={1/2} name="intentionCommunityId" component='searchIntend'  label="意向入驻社区" inline={true}  placeholder='请输入社区名称' requireLabel={false}/>

					
				</form>
			</div>
		);
	}
}


export default reduxForm({form:'MeetingReservationFrom',enableReinitialize:true,keepDirtyOnReinitialize:true})(MeetingReservationFrom);
