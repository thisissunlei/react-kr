import React from 'react';
import { reduxForm, initialize, change } from 'redux-form';
import { Actions, Store } from 'kr/Redux';
import {
	Title,
	Section,
	KrField,
	Message,
	PlanMapAll
} from 'kr-ui';
import { Http } from 'kr/Utils';
import './index.less';
class CommunityPlanMap extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			isStation: true,
			figureSets: [],
			floors: [],
			//平面图传参
			initializeConfigs: {},
			//上传文件
			fileData: '',
			//大小一致
			sameSize: false,
			//放大比例
			scaleSize: 1,
			//选择楼层
			selectFloor: 3,
			//拖拽差值
			minusX: '',
			minusY: '',
			//是否是工位
			isStation: true,
			//工位会议室id名称
			nameStation: '',
			//元件值
			cellname: '',
			//传的canvas对象
			stationObj: {
			},
			//点击的人下标
			dataIndex: '',

			//平面图对象id
			planMapId: '',

			//删除的元件
			deleteData: [],

			//楼层变化
			floorChange: false

		}
		//保存返回的数据
		this.saveData = {};

		this.dragFlag = false;
		this.upFlag = false;
	}



	getMapConfigs = () => {
		let { selectFloor } = this.state;
		var href = window.location.href.split('communityAllocation/')[1].split('/')[0];
		var _this = this;
		Http.request('plan-get-detail', {
			floor: selectFloor,
			communityId: href
		}).then(function (response) {

			var stationsDataOrigin = response.figures;
			var stations = [];
			stations = stationsDataOrigin.map(function (item, index) {

				if (!item) {
					return;
				}
				var obj = {};
				var x = item.cellCoordX;
				var y = item.cellCoordY;

				obj.x = Number(x);
				obj.y = Number(y);
				obj.width = Number(item.cellWidth);
				obj.height = Number(item.cellHeight);
				obj.name = item.cellName;
				obj.belongType = item.belongType;
				obj.belongId = Number(item.belongId);
				obj.id = Number(item.id);
				obj.canFigureId = item.canFigureId;

				return obj;
			});

			var InitializeConfigs = {
				stations: stations,
				backgroundImageUrl: 'http://optest.krspace.cn' + response.graphFilePath
			}

			_this.setState({
				figureSets: response.figureSets,
				initializeConfigs: InitializeConfigs,
				planMapId: response.id,
				sameSize: response.stationSizeSame
			});
		}).catch(function (err) {
			Message.error(err.message);
		})
	}


	getMapFloor = () => {

		var _this = this;
		var href = window.location.href.split('communityAllocation/')[1].split('/')[0];
		Http.request('getCommunityFloors', {
			communityId: href
		}).then(function (response) {
			_this.setState({
				floors: response.floors,
				selectFloor: response.floors[0]
			}, function () {
				Store.dispatch(change('CommunityPlanMap', 'floor', _this.state.floors[0]));
			});
			_this.getMapConfigs();
		}).catch(function (err) {
			Message.error(err.message);
		});
	}

	componentWillMount() {
		var _this = this;
		this.getMapFloor();
	}

	componentDidMount() {
		document.addEventListener('mousemove', this.eventListen);
		const mapComponent = this.mapComponent;
	}


	//工位元件hover
	mouseOverStaion = () => {
		this.setState({
			isStation: true
		})
		document.getElementById('tab-meeting').style.borderBottom = '2px solid #eee';
		document.getElementById('tab-station').style.borderBottom = '2px solid rgb(219, 237, 254)';
	}

	//会议室元件hover
	mouseOverMeeting = () => {
		this.setState({
			isStation: false
		})
		document.getElementById('tab-station').style.borderBottom = '2px solid #eee';
		document.getElementById('tab-meeting').style.borderBottom = '2px solid rgb(219, 237, 254)'
	}

	//楼层
	floor = (value) => {
		this.setState({
			selectFloor: value.label
		}, function () {
			this.getMapConfigs(value.label);
		})
	}

	//工位大小一致
	sizeSameCheck = (event) => {

		this.setState({
			sameSize: event.target.checked,
		});

		this.mapComponent.setStationToSame(sameSize, function (code, message) {
            if (code < 0 && change) {
                alert('请选择工位');
                document.getElementById("sizeCheckbox").checked = false;
            }
        });

	}

	//放大比例
	rangeSelect = (event) => {
		document.getElementById("ratioSelectVal").innerHTML = parseInt(event.target.value * 100);
		var scaleSize =  Number(event.target.value);
		this.mapComponent.setScale(scaleSize);
	}

	//上传文件
	fileUpload = (event) => {
		document.getElementById("bgfilename").innerHTML = event.target.files[0].name;
		var fileData = event.target.files[0];
		this.setState({
			fileData
		});
		this.mapComponent.setBackgroundImage(fileData);
	}

	//传过来的删除
	onRemove = (data) => {

		let { figureSets } = this.state;

		data.map((item, index) => {
			var list = {};
			list.cellName = item.name;
			list.belongId = 10717;
			list.belongType = item.type == 'station' ? "STATION" : "SPACE";
			figureSets.push(list);
		});

		this.setState({
			deleteData: data,
			figureSets
		});

	}

	//保存
	save = () => {

		let { deleteData, planMapId, selectFloor } = this.state;

		this.mapComponent.save(function (saveData) {

			var stations = [];
			var deleteStation = [];
			deleteData.map((item, index) => {
				deleteStation.push(item.id.toString());
			})
			var de = deleteStation.join();
			deleteStation = JSON.stringify(deleteStation);
			saveData.stations.map((item, index) => {
				var list = {};
				list.cellCoordX = item.x;
				list.cellCoordY = item.y;
				list.cellWidth = item.width;
				list.cellHeight = item.height;
				list.id = item.id;
				list.belongId = item.belongId;
				list.belongType = item.belongType;
				if (list.cellCoordX) {
					stations.push(list);
				}
			})
			stations = JSON.stringify(stations);
			var cellWidth = '';
			var cellHeight = '';
			var isSame = '';
			var href = window.location.href.split('communityAllocation/')[1].split('/')[0];
			var checked = document.getElementById("sizeCheckbox").checked;
			if (checked) {
				isSame = 'SAME';
				cellWidth = saveData.stations[0].width;
				cellHeight = saveData.stations[0].height;
			} else {
				isSame = 'NOT_SAME';
				cellWidth = '';
				cellHeight = '';
			}
			Http.request('plan-edit', {}, {
				stationSizeSame: isSame,
				id: planMapId,
				floor: selectFloor,
				communityId: href,
				cellWidth: cellWidth,
				cellHeight: cellHeight,
				graphCellJson: stations,
				deleteCellIdsStr: de
			}).then(function (response) {
				window.location.reload();
			}).catch(function (err) {
				Message.error(err.message);
			});

		});


	}


	//上传
	onSubmit = () =>{ 
		var href = window.location.href.split('communityAllocation/')[1].split('/')[0];
		var _this = this;
		let { fileData } = this.state;
		var form = new FormData();
		form.append('file', fileData);
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					var response = xhr.response.data;
					form.append('sourceservicetoken', response.sourceservicetoken);
					form.append('docTypeCode', response.docTypeCode);
					form.append('operater', response.operater);

					var xhrfile = new XMLHttpRequest();
					xhrfile.onreadystatechange = function () {
						if (xhrfile.readyState === 4) {
							var fileResponse = xhrfile.response;
							if (xhrfile.status === 200) {
								if (fileResponse && fileResponse.code > 0) {
									_this.endUpload(fileResponse.data);
								}
							} else if (xhrfile.status == 413) {
								Message.error('您上传的文件过大！');
							} else {
								Message.error('后台报错请联系管理员！');
							}
						}
					};

					xhrfile.open('POST', 'http://optest.krspace.cn/api-old/krspace_oa_web/doc/docFile/uploadSingleFile', true);
					xhrfile.responseType = 'json';
					xhrfile.withCredentials = true;
					xhrfile.send(form);
				} else {
					Message.error('初始化文件上传失败');
				}
			}
		};
		xhr.open('GET', '/api/krspace-finance-web/cmt/floor-graph/upload-token', true);
		xhr.responseType = 'json';
		xhr.send(null);
	}

	//上传保存
	endUpload = (data) => {
		let { selectFloor, planMapId } = this.state;
		var _this = this;
		var href = window.location.href.split('communityAllocation/')[1].split('/')[0];
		Http.request('plan-upload', {}, {
			communityId: href,
			floor: selectFloor,
			graphFileId: data.id,
			graphFileName: data.filename,
			id: planMapId,
		}).then(function (response) {
			_this.setState({
				planMapId: response.id
			})
		}).catch(function (err) {
			Message.error(err.message);
		});
	}


	//点击
	allStationDown = (event) => {
		let { isStation } = this.state;
		this.setState({
			minusX: event.clientX - event.target.getBoundingClientRect().left,
			minusY: event.clientY - event.target.getBoundingClientRect().top,
		})

		this.dragFlag = true;

		if (isStation) {
			this.setState({
				nameStation: 'single-drag-square',
				cellname: event.target.nextSibling.innerHTML,
				dataIndex: event.target.dataset.index
			})
		} else {
			this.setState({
				nameStation: 'single-drag-meeting',
				cellname: event.target.innerHTML,
				dataIndex: event.target.dataset.index
			})
		}
	}

	//移动
	eventListen = (event) => {

		let { nameStation, minusX, minusY } = this.state;

		if (this.dragFlag) {
			this.upFlag = true;
			document.getElementById(nameStation).style.display = 'inline-block';
			document.getElementById(nameStation).style.left = event.clientX - minusX + 'px';
			document.getElementById(nameStation).style.top = event.clientY - minusY + 'px';
		}

	}

	//释放
	allStationUp = (event) => {

		let { isStation, cellname, figureSets, dataIndex } = this.state;
		var type = '';
		var width = '';
		var height = '';
		var myApp = document.getElementById("mapAPP");
		if (isStation) {
			type = 'station';
			width = 30;
			height = 30;
		} else {
			type = 'meeting';
			width = 118;
			height = 48;
		}


		if (this.upFlag) {
			if (myApp.getBoundingClientRect().left < event.target.getBoundingClientRect().left + width &&
				myApp.getBoundingClientRect().top < event.target.getBoundingClientRect().top + height) {
				figureSets.splice(dataIndex, 1);

				var station = {
					x: event.target.getBoundingClientRect().left + width / 2,
					y: event.target.getBoundingClientRect().top + height / 2,
					width: width,
					height: height,
					type: type,
					name: cellname
				};

				console.log(this.mapComponent);
				this.mapComponent.createStation(station);

				this.setState({
					figureSets: figureSets
				});

				this.upFlag = false;
				this.dragFlag = false;

			}
		}

		document.getElementById("single-drag-meeting").style.display = 'none';
		document.getElementById("single-drag-square").style.display = 'none';


	}



	render() {

		let { handleSubmit } = this.props;
		let { floorChange, isStation, figureSets, floors, initializeConfigs, fileData, sameSize, scaleSize, stationObj } = this.state;
		var floor = [];
		floors.map((item, index) => {
			var list = {};
			list.label = item;
			list.value = item;
			floor.push(list);
		})

		return (
			<div>
				<Title value="平面图配置" />
				<Section title='平面图配置开发' description="" style={{ marginBottom: -5, minHeight: 910 }}>
					<div className="wrap">
						<form onSubmit={handleSubmit(this.onSubmit)} >
							<div className='plan-header'>

								<div className='header-floor'>
									<KrField name='floor' label='楼层:'
										inline={true} component='select'
										options={floor}
										onChange={this.floor}
									/>
								</div>

								<div className="size-type">
									<input type="checkbox" id="sizeCheckbox" title="工位大小一致" onChange={this.sizeSameCheck} />
									<span>工位大小一致</span>
								</div>


								<div className="num-type">
									<span className="til">当前比例：</span>
									<input type="range" id="ratioSelect" min="0.1" max="2" step="0.1" onChange={this.rangeSelect} />
									<output id="ratioSelectVal">100</output>%
							</div>

								<div className='upload-img'>
									<input type="file" id="backgroundImg" name="file" style={{ width: '60px' }} onChange={this.fileUpload} />
									<div className="back-type">
										<span id="bgfilename" style={{ fontSize: '14px' }}>

										</span>
									</div>
									<div className='upload-btn' onClick={this.onSubmit}>上传</div>
								</div>

								<div className='save-header' id='save-header' onClick={this.save}>保存</div>

							</div>


							<div className="m-station" id='m-station'
								onMouseDown={this.allStationDown}
								onMouseUp={this.allStationUp}
							>

								<div className='station-pic' id='single-drag-square'></div>
								<div className="meeting-pic" id='single-drag-meeting'></div>

								<div className='plan-body-left'>
									<div className='tab-list'>
										<li id='tab-station' onMouseOver={this.mouseOverStaion}>
											<span>工位元件</span>
											{isStation && <span className='single-station'></span>}
										</li>
										<li id='tab-meeting' onMouseOver={this.mouseOverMeeting}>
											<span>会议室元件</span>
											{!isStation && <span className='single-meeting'></span>}
										</li>
									</div>
									<div className='plan-detail-list'>
										{isStation && <div className='plan-station'>
											{figureSets && figureSets.map((item, index) => {
												if (item.belongType == "STATION") {
													return (<div key={index} className="plan-wrap-pic">
														<div className="station-pic" data-index={index}></div>
														<span>{item.cellName}</span>
													</div>)
												}
											})}
										</div>}
										{!isStation && <div className='plan-borderRoom'>
											{figureSets && figureSets.map((item, index) => {
												if (item.belongType == "SPACE") {
													return (<div key={index} className="plan-meeting-pic">
														<div className="meeting-pic" data-index={index}>{item.cellName}</div>
													</div>)
												}
											})}
										</div>}
									</div>
								</div>



							</div>

							<PlanMapAll
								ref={(mapComponent) => this.mapComponent = mapComponent}
								initializeConfigs={initializeConfigs}
								fileData={fileData}
								scaleSize={scaleSize}
								stationObj={stationObj}
								onRemove={this.onRemove}
							/>

						</form>
					</div>
				</Section>
			</div>
		);
	}

}
export default reduxForm({ form: 'CommunityPlanMap' })(CommunityPlanMap);
