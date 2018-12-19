import React from 'react';
import {
	observer,
	inject
} from 'mobx-react';
import {
	reduxForm,
} from 'redux-form';
import { Http, DateFormat, ajax } from 'kr/Utils'
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	ListGroup,
	SearchForm,
	ListGroupItem,
	Message
} from 'kr-ui';

class MeetingReservationFrom extends React.Component {

	static propTypes = {

	}

	constructor(props) {
		super(props);
		this.state = {
			options: [],
			searchParams: {
				cmtId: '',
				meetingDate: DateFormat(new Date(), "yyyy-mm-dd"),
				floor: '',

			},
			date: DateFormat(new Date(), "yyyy-mm-dd"),
			communityIdList: [],
		}
		this.getcommunity('');
	}
	getcommunity = () => {
		let _this = this;
		let { communityIdList } = this.state;
		let arr=[];
		ajax.get('get-community-new-list').then(function (response) {

				response.map(function (item, index) {
				let obj={};
				item.value = item.cmtId || item.id;
				item.label = item.cmtName || item.name;
				obj.value = item.cmtId || item.id;
				obj.label = item.cmtName || item.name;
				arr.push(obj)
			});
			_this.setState({
				communityIdList:arr,
			});
		}).catch(function (err) {



		});
	}
	timeChange = (data) => {
		let { searchParams } = this.state;
		let { onSubmit } = this.props;
		if (!data) {
			data = "";
		}
		this.setState({
			searchParams: {
				cmtId: searchParams.cmtId,
				meetingDate: data,
				floor: searchParams.floor,
			}
		}, function () {
			onSubmit(this.state.searchParams)
		})

	}
	selectChange = (data) => {
		let { searchParams } = this.state;
		let { onSubmit } = this.props;
		let options = [];
		if (!data || data.value == -1) {
			this.setState({
				options,
				searchParams: {
					cmtId: "",
					meetingDate: searchParams.meetingDate,
					floor: searchParams.floor,
				}
			}, function () {
				onSubmit(this.state.searchParams)
			})

			return;
		}
		data.value = data.value ? data.value : '';
		let _this = this;
		Http.request("get-krmting-room-stock-floor-list", { cmtId: data.value }).then(function (response) {
			response.floors.map(function (item, index) {
				options.push({ label: item, value: item });
			})
			_this.setState({
				options,
				searchParams: {
					cmtId: data.value,
					meetingDate: searchParams.meetingDate,
					floor: searchParams.floor,
				}
			}, function () {
				onSubmit(_this.state.searchParams)
			})
		}).catch(function (err) {
			Message.error(err.message);
		});
	}
	floorChange = (data) => {
		let { searchParams } = this.state;
		let { onSubmit } = this.props;
		if (!data) {
			data = { value: '' };
		}
		this.setState({
			searchParams: {
				cmtId: searchParams.cmtId,
				meetingDate: searchParams.meetingDate,
				floor: data.value,
			}
		}, function () {
			onSubmit(this.state.searchParams)
		})
	}


	render() {
		const { handleSubmit } = this.props;
		const { options, date, communityIdList } = this.state;
		return (
			<div className="meeting-reservation-from" >
				<form >
					<KrField grid={1 / 2} label="时间:" name="time" style={{ width: 310 }} component="date" inline={true} placeholder={date} onChange={this.timeChange} />
					<KrField grid={1 / 2}
						name="intentionCommunityId"
						component='searchMeetingCommunity'
						style={{ width: 335, marginTop: 3 }}
						label="社区:" inline={true}
						placeholder='请输入社区名称'
						requireLabel={false}
						onChange={this.selectChange}
						options={communityIdList}
					/>
					<div className="meeting-reservation-select">
						<KrField grid={1 / 2} label="" name="staionTypeId" style={{ width: 325 }} component="select" style={{ width: 262 }}
							options={options}
							inline={true}
							requireLabel={false}
							onChange={this.floorChange}
						/>
					</div>


				</form>
			</div>
		);
	}
}


export default reduxForm({ form: 'MeetingReservationFrom', enableReinitialize: true, keepDirtyOnReinitialize: true })(MeetingReservationFrom);
