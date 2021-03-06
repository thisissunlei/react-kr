import React from 'react';
import { reduxForm, initialize, change } from 'redux-form';
import { Actions, Store } from 'kr/Redux';
import {
	Title,
	Section,
	KrField,
	Message,
	PlanMapAll,
	Loading
} from 'kr-ui';
import { Http } from 'kr/Utils';
import Plan from './plan.js';
import './index.less';
class CommunityPlanMap extends React.Component {

	static contextTypes = {
       router: React.PropTypes.object.isRequired
    }

	constructor(props, context) {
		super(props, context);
		this.state = {
			//右侧数据
			figure:[],
			scaleNumber:100,
			//左侧工位会议室数据
			figureSets: [],
			//总楼层数
			floors: [],
			//平面图传参
			initializeConfigs: {},
			//上传文件
			fileData: '',
			//选择楼层
			selectFloor: 3,
			//是否是工位
			isStation: true,
			
			//元件值
			cellname: '',
			//点击的元件下标
			dataIndex: '',
			//点击的元件的id
			cellId:'',

			//平面图对象id
			planMapId: '',
			//删除的元件
			deleteData: [],
			//加载
			loading:true
		}
		//保存返回的数据
		this.saveData = {};
		//是否点击
		this.dragFlag = false;
		//必须要移动后放开的标志
		this.upFlag = false;
		//鼠标和元素差值
		this.minusX='';
		this.minusY='';
		//工位会议室id名称
	    this.nameStation='';
	}

	getMapConfigs = (data) => {

		let {selectFloor} = this.state;
		var href =this.context.router.params.communityId;
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
				obj.style='old';
				obj.type=obj.belongType;
				

				return obj;
			});

			var checked='';
			if(response.stationSizeSame){
				if(response.stationSizeSame=='NOT_SAME'){
                    checked=false;
				}else{
					checked=true;
				}
			}
            
			var initializeConfigs = {
				stations: stations,
				defaultStation:{
					width:Number(response.cellWidth),
					height:Number(response.cellHeight)
				},
				stationToSame:checked,
				backgroundImageUrl:response.graphFilePath,
				map:{
                  translateX:0,
			      translateY:0,
				},			
				isMode:'edit'
			}

			_this.setState({
				figureSets: response.figureSets,
				initializeConfigs,
				figure:response.figures,
				planMapId: response.id?response.id:'',
			});
            
			_this.mapComponent.newMap(initializeConfigs);
			_this.mapComponent.ready(function(data){
                  _this.setState({
					  loading:false
				  })
			});
			


			
			document.getElementById("sizeCheckbox").checked=checked;
			document.getElementById("bgfilename").innerHTML=response.graphFileName?response.graphFileName:'无';
			if(data){
				Message.success(data);
			}

		}).catch(function (err) {
			Message.error(err.message);
		})
	}


	getMapFloor = () => {

		var _this = this;
		var href = _this.context.router.params.communityId;
		Http.request('getFloorByComunity', {
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

	}

	componentDidMount() {
		var _this=this;
		const mapComponent = this.mapComponent;
		document.addEventListener('mousemove', this.eventListen,false);
		/*document.addEventListener('keydown',function(e){
			if( e.ctrlKey  == true && e.keyCode == 83 ){
				_this.save();
			   e.preventDefault();
			}
       });*/
		this.getMapFloor();
	}


	//工位元件hover
	mouseOverStaion = () => {
		this.setState({
			isStation: true
		})
		document.getElementById('tab-meeting').setAttribute("class",'no-bottom-color');
		document.getElementById('tab-station').setAttribute("class",'blue-bottom-color');
	}

	//会议室元件hover
	mouseOverMeeting = () => {
		this.setState({
			isStation: false
		})
		document.getElementById('tab-station').setAttribute("class",'no-bottom-color');
		document.getElementById('tab-meeting').setAttribute("class",'blue-bottom-color');
	}

	//楼层
	onChangeFloor = (value) => {
		if(!value){
			return ;
		}
		this.setState({
			selectFloor: value.label,
		}, function () {
			this.getMapConfigs();
		})
	}

	//工位大小一致
	sizeSameCheck = (event) => {
		var sameSize = event.target.checked;
		this.mapComponent.setStationToSame(sameSize, function (code, message) {
			if (code < 0 && change) {
				Message.error('请选择工位');
				document.getElementById("sizeCheckbox").checked = false;
			}
		});
	}

	//放大比例
	rangeSelect = (event) => {
		var scaleSize = Number(event.target.value);
		var scaleNumber = parseInt(event.target.value * 100);
		this.setState({
			scaleNumber
		});
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

	//平面图放大callback
	onScaleMap = (scaleNumber)=>{
		scaleNumber = parseInt(scaleNumber*100);
		this.setState({
			scaleNumber
		});
	}

	onRemove = (data,station) => {
		data = [].concat(data);
		let { figureSets,deleteData } = this.state;
		var del=[];
		data.map((item, index) => {
			var list = {};
			list.cellName = item.name;
			list.belongId = item.belongId;
			list.belongType = item.belongType;
			figureSets.splice(item.index,0,list);
			if(item.style=='old'){
			  del.push(item);	
			}
		});
		this.setState({
			deleteData:deleteData.concat(del),
			figureSets
		});
	}

	//保存
	save = () => {
		let {planMapId, selectFloor,deleteData} = this.state;
		if(!planMapId){
			Message.error('请先上传背景图');
			return;
		}
		document.getElementById('save-no').style.display='inline-block';
        var _this=this;
		this.mapComponent.save(function (saveData) {
			saveData = Object.assign({}, saveData);
			var stations = [];
			var deleteStation = [];
			deleteData.map((item, index) => {
				deleteStation.push(item.id.toString());
			})
			var de = deleteStation.join();
			saveData.stations.map((item, index) => {
				var list = {};
				list.cellCoordX = Number(item.x);
				list.cellCoordY = Number(item.y);
				list.cellWidth = Number(item.width);
				list.cellHeight = Number(item.height);
				list.belongId = Number(item.belongId);
				if(item.id){
                  list.id=Number(item.id);
				}
				list.belongType = item.belongType;
				if (list.cellCoordX) {
					stations.push(list);
				}
			})
			stations = JSON.stringify(stations);
			var cellWidth = '';
			var cellHeight = '';
			var isSame = '';
			var href = _this.context.router.params.communityId;
			var checked = document.getElementById("sizeCheckbox").checked;
			if (checked) {
				isSame = 'SAME';
				saveData.stations.map((item,index)=>{
                     if(item.belongType=='STATION'){
                       cellWidth=item.width;
					   cellHeight=item.height;
					 }
				})
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
				document.getElementById('save-no').style.display='none';
				_this.getMapConfigs('保存更新成功');
				_this.setState({
				  scaleNumber:100,
				  deleteData:[]	
				})
				_this.mapComponent.setScale(1);
			}).catch(function (err) {
				Message.error(err.message);
			});

		});
	}


	//上传
	onSubmit = () => {
		var href =this.context.router.params.communityId;
		var _this = this;
		let { fileData } = this.state;
		this.getUpFileUrl(fileData);
		
	}
	//获取上传路径
	getUpFileUrl = (file) =>{
		var form = new FormData();
		let _this = this;
		let params = {category:'op/upload',isPublic:'false'}
	
		Http.request("global-get-up-files-url",params).then(function (res) {
			/**
			 * 一下数据赋值必须按顺序  必须 必须  必须
			*/
			form.append('OSSAccessKeyId', res.ossAccessKeyId);
			form.append('policy', res.policy);
			form.append('Signature', res.sign);
			form.append('key', res.pathPrefix+'/'+file.name);
			form.append('uid', res.uid);
			form.append('callback', res.callback);
			form.append('x:original_name', file.name);
			form.append('file', file);
			_this.doUpFile(res.serverUrl,form,file.name)

		}).catch(function (err) {
			_this.onError(err.message)
		});
	}
	//文件上传方法
	doUpFile = (serverUrl,form,name) => {
		var _this = this;
		var xhrfile = new XMLHttpRequest();
		xhrfile.onreadystatechange = function() {
			if (xhrfile.readyState === 4) {
				var fileResponse = xhrfile.response;
				if (xhrfile.status === 200) {
					if (fileResponse && fileResponse.code > 0) {
						_this.endUpload(fileResponse.data,name);
					} else {
						_this.onError(fileResponse.msg);
					}
				} else if (xhrfile.status == 413) {

					_this.onError('您上传的文件过大！');
				} else {
					_this.onError('后台报错请联系管理员！');
				}
			}
		};
		xhrfile.open('POST', serverUrl, true);
		xhrfile.responseType = 'json';
		xhrfile.send(form);
	}

	//上传保存
	endUpload = (data,name) => {
		let { selectFloor, planMapId } = this.state;
		var _this = this;
		var href = _this.context.router.params.communityId;
		Http.request('plan-upload', {}, {
			communityId: href,
			floor: selectFloor,
			graphFileId: data.id,
			graphFileName: name,
			id: planMapId,
		}).then(function (response) {
			_this.setState({
				planMapId: response.id
			})
			Message.success('背景图上传成功');
		}).catch(function (err) {
			Message.error(err.message);
		});
	}


	//点击
	allStationDown = (event) => {
		let { isStation } = this.state;
		if(event.target.className!='station-pic'&&event.target.className!='meeting-pic'){
			return ;
		}
		this.minusX=event.clientX - event.target.getBoundingClientRect().left;
		this.minusY=event.clientY - event.target.getBoundingClientRect().top;
		this.dragFlag = true;
		if (isStation) {
			this.nameStation='single-drag-square'
			this.setState({
				cellname: event.target.nextSibling.innerHTML,
				dataIndex: event.target.dataset.index,
				cellId:event.target.dataset.id
			})
		} else {
            this.nameStation='single-drag-meeting'
			this.setState({
				cellname: event.target.innerHTML,
				dataIndex: event.target.dataset.index,
				cellId:event.target.dataset.id
			})
		}
	}

	//移动
	eventListen = (event) => {
		if (this.dragFlag) {
			this.upFlag = true;
			document.getElementById(this.nameStation).style.display = 'inline-block';
			document.getElementById(this.nameStation).style.left = event.clientX - this.minusX + 'px';
			document.getElementById(this.nameStation).style.top = event.clientY - this.minusY + 'px';
		}
	}

	//释放
	allStationUp = (event) => {
		let { isStation, cellname, figureSets, dataIndex,cellId } = this.state;
		var type = '';
		var width = '';
		var height = '';
		var x='';
		var y='';
		var myApp = document.getElementById("mapAPP");
		if (isStation) {
			type = 'STATION';
			width = 30;
			height = 30;
            x=event.target.getBoundingClientRect().left+width/2;
			y=event.target.getBoundingClientRect().top+height/2;
		} else {
			type = 'SPACE';
			width = 60;
			height = 40;
			x= event.target.getBoundingClientRect().left+118/2;
			y= event.target.getBoundingClientRect().top+48/2;
		}

		if (this.upFlag) {
			if (myApp.getBoundingClientRect().left < event.target.getBoundingClientRect().left + width &&
				myApp.getBoundingClientRect().top < event.target.getBoundingClientRect().top + height) {
				figureSets.splice(dataIndex, 1);

				var station = {
					x: x,
					y: y,
					width: width,
					height: height,
					belongType: type,
					name: cellname,
					belongId:Number(cellId),
					index:dataIndex,
					style:'new',
					type:type
				};
				this.mapComponent.createStation(station);
				this.setState({
					figureSets: figureSets
				});
			}
				
		}

		document.getElementById("single-drag-meeting").style.display = 'none';
		document.getElementById("single-drag-square").style.display = 'none';
        this.upFlag = false;
		this.dragFlag = false;

	}

	componentWillUnmount(){
        document.removeEventListener('mousemove', this.eventListen,false);
	}


	render() {

		let {handleSubmit } = this.props;
		let {isStation,figureSets,floors,initializeConfigs,loading} = this.state;
		var floor = [];
		floors.map((item, index) => {
			var list = {};
			list.label = item;
			list.value = item;
			floor.push(list);
		})

		var communityName = sessionStorage.getItem('communityName');
        let title=`平面图配置(${communityName})`;
		return (
			<div>
				<Title value="工位平面图-氪空间后台管理系统" />
				<Section title={title} description="" style={{ marginBottom: -5, minHeight: 910 }}>
					<div className="wrap">
						<form onSubmit={handleSubmit(this.onSubmit)} >
							<div className='plan-header'>

								<div className='header-floor'>
									<KrField name='floor' label='楼层:'
										inline={true} component='select'
										options={floor}
										onChange={this.onChangeFloor}
									/>
								</div>

								<div className="size-type">
									<input type="checkbox" id="sizeCheckbox" title="工位大小一致" onChange={this.sizeSameCheck} style={{verticalAlign:'middle'}}/>
									<span>工位大小一致</span>
								</div>


								<div className="num-type">
									<span className="til">当前比例：</span>
									<input type="range" value={this.state.scaleNumber/100} min="0.1" max="2" step="0.1" onChange={this.rangeSelect} style={{verticalAlign:'middle'}}/>
									<output>{this.state.scaleNumber}</output>%
							   </div>

								<div className='upload-img'>
								  <a href="javascript:;" className="plan-file">选择文件 	 
									<input type="file" name="file" style={{ width: '70px'}} onChange={this.fileUpload}/>
                                  </a>
									<div className="back-type">
										<span id="bgfilename" style={{ fontSize: '14px' }}>
										</span>
									</div>
									<div className='upload-btn' onClick={this.onSubmit}>上传</div>
								</div>

								<div className='save-header' onClick={this.save}>保存</div>
								<div className='save-header-none' id='save-no'>保存</div>

							</div>


							<div className="m-station" id='m-station'
								onMouseDown={this.allStationDown}
								onMouseUp={this.allStationUp}
							>

								<div className='station-pic' id='single-drag-square'></div>
								<div className="meeting-pic" id='single-drag-meeting'></div>

								<div className='plan-body-left'>
									<div className='tab-list'>
										<li id='tab-station' onClick={this.mouseOverStaion}>
											<span>工位元件</span>
											{isStation && <span className='single-station'></span>}
										</li>
										<li id='tab-meeting' onClick={this.mouseOverMeeting}>
											<span>会议室元件</span>
											{!isStation && <span className='single-meeting'></span>}
										</li>
									</div>
									<div className='plan-detail-list'>
										{isStation && <div className='plan-station'>
											{figureSets && figureSets.map((item, index) => {
												if (item.belongType == "STATION") {
													return (<div key={index} className="plan-wrap-pic">
														<div className="station-pic" 
														  data-index={index} 
														  data-id={item.belongId}>
														</div>
														<span>{item.cellName}</span>
													</div>)
												}
											})}
										</div>}
										{!isStation && <div className='plan-borderRoom'>
											{figureSets && figureSets.map((item, index) => {
												if (item.belongType == "SPACE") {
													return (<div key={index} className="plan-meeting-pic">
														<div className="meeting-pic" 
														  data-index={index} 
														  data-id={item.belongId}>
														    {item.cellName}
														</div>
													</div>)
												}
											})}
										</div>}
									</div>
								</div>



							</div>

							<Plan
								ref={(mapComponent) => this.mapComponent = mapComponent}
								initializeConfigs={initializeConfigs}
								onRemove={this.onRemove}
								onScaleMap={this.onScaleMap}
							/>

						</form>
					</div>
				</Section>
			</div>
		);
	}

}
export default reduxForm({ form: 'CommunityPlanMap' })(CommunityPlanMap);
