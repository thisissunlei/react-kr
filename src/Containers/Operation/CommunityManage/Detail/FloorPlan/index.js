import React, {
	PropTypes
} from 'react';
import {
	Actions,
	Store
} from 'kr/Redux';
import $ from 'jquery';
import {DateFormat,Http,Map} from 'kr/Utils';
import {
	KrField,
	Button,
	ListGroup,
	Message,
	ListGroupItem,
	Tooltips
} from 'kr-ui';
import {
	reduxForm,
	change
} from 'redux-form';
import './index.less';

export default class FloorPlan extends React.Component {

	static defaultProps = {
		
	}

	constructor(props, context) {
		super(props, context);
		let _this = this;
		this.state = {
			searchParams:{
               page:1,
			   pageSize:2,
			   communityId:'',
               floor:'',
			},
			//三个数
			station:{
              stationNum:'',
			  stationRate:'',
			  stationTotal:''
			},
			//社区
			communityIdList: [],
			//楼层
			communityInfoFloorList: [],
			//开始结束时间
			dateend: DateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"),
			date: DateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"),
			//总页数
			totalPages:'',
			//
			items:[]
		}
		this.getcommunity();
		Store.dispatch(change('FloorPlan', 'start', DateFormat(new Date(), "yyyy-mm-dd")));
		Store.dispatch(change('FloorPlan', 'end', DateFormat(new Date(), "yyyy-mm-dd")));
	}
	
	
    componentDidMount(){
	   var _this=this;
	   this.getBaseData();
	   this.getRentData();
	   window.addEventListener('scroll',this.scrollListener,false);
	  

	}
    
	//获取基本信息
	getBaseData=()=>{
		let {dateend,date,searchParams}=this.state;
		var data={};
		data.startDate=date;
		data.endDate=dateend;
		data.communityId=searchParams.communityId;
		data.floor=searchParams.floor;
		data.page=searchParams.page;
		data.pageSize=searchParams.pageSize;
		var _this=this;
		Http.request('getControlGraph',data).then(function(response) {
                 
			      var items=response.items;
				   _this.setState({
					  totalPages:response.totalPages,
					  items
				  })
				   items.map((it,indexs)=>{
                    var stationsDataOrigin = it.figures;
					var stations = [];
					var list='';
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
						obj.type=obj.belongType;
						if(item.status){
							obj.status=item.status;
						}
						obj.pName=item.pName?item.pName:'';
						obj.phone=item.phone?item.phone:'';
						obj.leaseEnd=item.leaseEnd?item.leaseEnd:'';
						obj.leaseStart=item.leaseStart?item.leaseStart:'';
						obj.company=item.company?item.company:'';
						return obj;
					}); 

					var initializeConfigs = {
							stations: stations,
							backgroundImageUrl:'http://optest.krspace.cn'+it.graphFilePath,
							map:{
                             translateX:0,
							 translateY:0,
							 scaleEnable:false
							},
							isMode:'view'
					}
                     Map(`plan-app${indexs}`,initializeConfigs);
				})
				
				
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
    
	//获取出租数信息
	getRentData=()=>{
       let {dateend,date,searchParams}=this.state;
		var data={};
		data.startDate=date;
		data.endDate=dateend;
		data.communityId=searchParams.communityId;
		data.floor=searchParams.floor;
		var _this=this;
		Http.request('getGraphRent',data).then(function(response) {
			_this.setState({
				station:{
					stationNum:response.stationNum,
					stationRate:response.stationRate,
					stationTotal:response.stationTotal
				},
			})
		}).catch(function(err) {
			Message.error(err.message);
		}); 
	} 


	//获取社区
	getcommunity=()=> {
		let _this = this;
		let {
			communityIdList
		} = this.state;
		Http.request('getCommunity').then(function(response) {
			communityIdList = response.communityInfoList.map(function(item, index) {
				item.value = item.id;
				item.label = item.name;
				return item;
			});
			communityIdList.unshift({
				label: '请选择',
				value: '0',
				id: '0',
			});
			_this.setState({
				communityIdList,
			});
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
    
	//选择社区
	selectCommunity=(personel)=> {
		if (personel) {
			this.getCommunityFloors(personel.id);
			var searchParams={
			communityId:personel.id,
			floor:''
			}
			searchParams = Object.assign({},this.state.searchParams, searchParams);
            this.setState({
			    searchParams
			},function(){
				this.getRentData();
				this.getBaseData();
			})
		}
		Store.dispatch(change('FloorPlan', 'floor', ''));
	}
	
	//获取楼层
	getCommunityFloors=(id)=> {
		let communityId = {
			communityId: parseInt(id)
		};
		var communityInfoFloorList;
		var that = this;
		Http.request('getCommunityFloors', communityId).then(function(response) {
			communityInfoFloorList = response.floors.map(function(item, index) {
				var obj = {};
				obj.value = item;
				obj.label = item;
				return obj;
			});
			that.setState({
				communityInfoFloorList
			});
		}).catch(function(err) {
			Message.error(err.message);
		});
	}

	//选择楼层
	selectFloors=(param)=>{
		 if(param){
            var searchParams={
			 floor:param.label
			}
			searchParams = Object.assign({},this.state.searchParams, searchParams);
            this.setState({
			    searchParams
			},function(){
				this.getRentData();
				this.getBaseData();
		 })
		}
	}
	
	//开始时间
	firstDate = (personel) => {
		    let firstDate = new Date(personel);
			let endDate = new Date(this.state.dateend);
			let start = firstDate.getTime();
			let end = endDate.getTime();
			if (start <= end) {
				this.setState({
					date: personel
				},function(){
					this.getRentData();
				    this.getBaseData();
				})
			} else {
				Message.error('结束时间不能小于开始时间');
				this.setState({
					date: personel
				})
			}
	}

	//结束时间
	secondDate = (personel) => {
		    let secondDate = new Date(personel);
			let firstDate = new Date(this.state.date);
			let start = firstDate.getTime();
			let end = secondDate.getTime();
			if (start <= end) {
				this.setState({
					dateend: personel
				},function(){
					this.getRentData();
				    this.getBaseData();
				})
			} else {
				Message.error('结束时间不能小于开始时间');
			    this.setState({
					dateend: personel
				})
			}

	}

	//滚动监听
    scrollListener=()=>{
      if(this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()){
		   let {totalPages}=this.state;
		   if(this.state.searchParams.page<totalPages){
			   var searchParams={
				 page:this.state.searchParams.page+1
				}
				searchParams = Object.assign({},this.state.searchParams, searchParams);
			   this.setState({
                  searchParams
			   },function(){
				   this.getBaseData();
			   })
		   }
        }
	}

	//滚动条在Y轴上的滚动距离
	getScrollTop = () => {
	　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
	　　if(document.body){
	　　　　bodyScrollTop = document.body.scrollTop;
	　　}
	　　if(document.documentElement){
	　　　　documentScrollTop = document.documentElement.scrollTop;
	　　}
	　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
	　　return scrollTop;
	}
   
    //浏览器视口的高度
	getWindowHeight = () => {
	　　var windowHeight = 0;
	　　if(document.compatMode == "CSS1Compat"){
	　　　　windowHeight = document.documentElement.clientHeight;
	　　}else{
	　　　　windowHeight = document.body.clientHeight;
	　　}
	　　return windowHeight;
	}
    
	//文档的总高度
	getScrollHeight = () => {
	　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
	　　if(document.body){
	　　　　bodyScrollHeight = document.body.scrollHeight;
	　　}
	　　if(document.documentElement){
	　　　　documentScrollHeight = document.documentElement.scrollHeight;
	　　}
	　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
	　　return scrollHeight;
	}



	onSubmit=()=>{
		
	}

	componentWillUnmount(){
	  window.removeEventListener('scroll',this.scrollListener,false);	
	}

	render() {

		const {
			communityIdList,
			communityInfoFloorList,
			dateend,
			date,
			station,
			items
		} = this.state;

		let {
			handleSubmit
		} = this.props;

		

		return (

			<div id="planTable" style={{margin:20,paddingBottom:30}}>
		 	<form name="planTable" onSubmit={handleSubmit(this.onSubmit)} className="form-list" style={{textAlign:'right'}}>

					<ListGroup>
						<ListGroupItem><span style={{display:'inline-block',lineHeight:'45px',textAlign:'left'}}>社区</span></ListGroupItem>
						<ListGroupItem style={{maxWidth:170,marginTop:'-6px',minWidth:110,width:'100%',textAlign:'left'}}><KrField grid={1/1} name="community" component="select"   options={communityIdList} onChange={this.selectCommunity} /></ListGroupItem>
						<ListGroupItem><span style={{display:'inline-block',lineHeight:'45px',textAlign:'left'}}>楼层</span></ListGroupItem>
						<ListGroupItem  style={{maxWidth:170,marginTop:'-6px',minWidth:100,width:'100%',textAlign:'left'}}><KrField name="floor" grid={1/1} component="select" options={communityInfoFloorList} onChange={this.selectFloors}/></ListGroupItem>
						<ListGroupItem style={{minWidth:100,marginTop:'-6px',marginLeft:'-3px',textAlign:'left'}}> <KrField name="start"  component="date"  simple={true} onChange={this.firstDate}/></ListGroupItem>
						<ListGroupItem style={{marginLeft:'10px',textAlign:'left'}}><span style={{display:'inline-block',lineHeight:'45px'}}>至</span></ListGroupItem>
						<ListGroupItem  style={{minWidth:100,marginTop:'-6px',textAlign:'left'}}> <KrField name="end" component="date" simple={true}  onChange={this.secondDate}/> </ListGroupItem>
					</ListGroup>
			</form>
			
			<div className='m-control-list'>
               <div className="com-header">
					<ul className="header-list">
						<li><span className="color-span none"></span><span>空置工位</span></li>
						<li><span className="color-span ordered"></span><span>预订工位</span></li>
						<li><span className="color-span enter"></span><span>已入驻工位</span></li>
					</ul>
					<div className="station-list">
						<span className="til">已出租工位数：{station.stationNum}</span>
						<span className="til">可出租工位数：{station.stationTotal}</span>
						<span className="til">出租率：{station.stationRate}</span> 
					</div>
			    </div>

                <div className='com-body'>
				  <div className="com-tips">
					<div>工位编号：</div>
					<div>姓名：</div>
					<div>电话：</div>
					<div>公司：</div>
					<div>租期：</div>
				 </div>

				  {
					  items&&items.map((item,index)=>{
                         return <div key={index} className="com-container" style={{borderTop:'4px solid rgb(219, 237, 254)'}}>
								    <div style={{fontSize:'14px',paddingLeft:'10px',color:'#9a9a9a'}}>{item.communityName+item.floor+'层'}</div>
									<div id={`plan-app${index}`} style={{background:'#fff',width:'100%',height:'670px'}}>
										
									</div>
						        </div>
					  })
				  }
                         
				 
				</div>


		    </div>

		</div>
		);
	}
}

FloorPlan = reduxForm({
	form: 'FloorPlan'
})(FloorPlan);
