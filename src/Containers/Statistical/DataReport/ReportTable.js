import React from 'react';
import {
	Button,
    Nothing,
    Loading
} from 'kr-ui';
import { observer } from 'mobx-react';
import {Http} from 'kr/Utils'
import './index.less';
import State from './State';
@observer
export default class ReportTable extends React.Component {



	constructor(props, context) {
		super(props, context);
		this.state={
          isRender:'',
          isLoading:true,
		}
        this.add = [];
        this.signing = [];
        this.allData = [];//所有数据
 
        this.signHeaderList = [];//头部签约数据
        this.addHeaderList = [];//头部新增数据
        
        this.getReportList();
        
	}

    //是否渲染页面
    isRender = () =>{
        this.setState({
             isRender : new Date()
        })
       
    }
    //获取详情页的数据
    getReportList = () =>{
        const self = this;
        this.setState({
            isLoading:true
        })
        Http.request('getReportList',{
            cityId :State.cityId,
            communityId:State.communityId,
            searchStartDate:State.searchStartDate,
            searchEndDate:State.searchEndDate,
        }).then(function(response) {
			var add = [],signing=[];
            self.signHeaderList = response.signHeaderList;
            self.addHeaderList = response.addHeaderList;
            add = self.addHeaderList.map((item,index)=>{
                return {code:item.code || '',sourceId:item.id || ''};
            });
            signing = self.signHeaderList.map((item,index)=>{
                return {code:item.code || '',sourceId:item.id || ''};
            });
            
            self.add = [].concat(add);
            self.signing = [].concat(signing);
            self.allData = response.items;
            self.isRender();
            if(self.allData.length == 0){
                self.box.scrollLeft = 0;
            }
             
             self.setState({
                isLoading:false
            })
		}).catch(function(err) {

		});
    }
    //点击任何一个数据
	detailClick=()=>{
        const {everyClick} = this.props;
        everyClick && everyClick();
	}
   
    renderTr = (community,isGlobal) =>{
        
        let show = true;

        var com = community.communitys.map((item,index)=>{ 
            let bgColor = index == community.communitys.length-1 && index!=0 ? "is-last-style":"no-last-style";
            let bg = index == community.communitys.length-1 && index!=0 ? "#F5F6FA":"#fff";
            return (<tr>
                       
                        { index == 0 && <td style = {{background:"#fff",cursor : "text",minWidth:50}} rowSpan= {community.communitys.length}>{item.cityName}</td>}
                        <td className = {bgColor} style = {{background:bg,cursor : "text",minWidth:140}}>{item.communityName}</td>
                        {this.renderAdd(isGlobal ? '' : community.cityId,isGlobal ? '' : item.communityId,item,bgColor)}
                        {this.renderSign(isGlobal ? '' : community.cityId,isGlobal ? '' : item.communityId,item,bgColor)}
                    </tr>)
        })
        return com;
    }
    //数组转对象
    arrToObject = (arr) =>{
        let obj = {};
       
        arr && arr.map((item,index)=>{
            obj[item.sourceCode] = item.countNum;
        })
        return obj;
    }
    //新增数据渲染被点击
    renderAdd = (cityId,communityId,adds,bgColor) =>{
        const self = this;
        var allAdd = []
        
           allAdd = this.add.map((item,index) => {
            let haveData = !this.arrToObject(adds.addList)[item.code]?false:true;
            let cursor = !haveData? "text":"pointer";
            let color = index == (this.add.length-1) && index!=0 ? "#F3A738":"#000"
            return (!adds.addList ?<td  key= {index} style = {{cursor:"text"}} >{"-"}</td> : <td
                        key= {index} 
                        onClick = {()=>{
                            if(communityId == '' || Number(communityId)<=0){
                                  cityId =  State.cityId != "" ? State.cityId : cityId;
                                 communityId = State.communityId != "" ? State.communityId : communityId; 
                            }
                            if( communityId !='' && Number(communityId)<=0){
                                communityId = ""
                            }
                            State.detailCityId = cityId ;
                            State.detailCommunityId = communityId;
                            State.sourceId = item.sourceId || '';
                            State.isAdd='add';
                            haveData && self.detailClick();
                        }}
                        className = {bgColor} 
                        style = {{cursor:cursor,color:color}} 
                    >
                        {this.arrToObject(adds.addList)[item.code]||"-"}
                    </td>)
            })
        
        return allAdd;
    }
    //签约
    renderSign = (cityId,communityId,signs,bgColor) =>{
        let self = this;
        
        var allSign = this.signing.map((item,index) =>{
            let haveData = !this.arrToObject(signs.signList)[item.code]?false:true;
            let cursor = !haveData? "text":"pointer";
            let color = index == (this.signing.length-1) && index!=0  ? "#F3A738":"#000"
            return (!signs.signList ?<td  key= {index} style = {{cursor:"text"}}  >{"-"}</td> :<td key= {index}
                        onClick = {()=>{
                            if(communityId == '' || Number(communityId)<=0){
                                  cityId =  State.cityId != "" ? State.cityId : cityId;
                                 communityId = State.communityId != "" ? State.communityId : communityId; 
                            }
                            if( communityId !='' && Number(communityId)<=0){
                                communityId = ""
                            }
                            State.detailCityId = cityId || '';
                            State.detailCommunityId = communityId;
                            State.sourceId = item.sourceId || '';
                            State.isAdd='sign';
                            haveData && self.detailClick();
                        }}
                        className = {bgColor} 
                        style = {{cursor:cursor,color:color}} 
            
                    >
                        {this.arrToObject(signs.signList)[item.code]||'-'}
                    </td>)
        })
        return allSign;
    }
    //城市社区
    publicTitle = () =>{
        var style1 = {
            width:50,
            height:89,
            textAlign:"center",
            borderLeft:"1px solid #E1E6EB",
		    borderTop:"1px solid #E1E6EB",
            display:'inline-block',
            padding:'0px 21px',
            textAlign:'center',
            lineHeight:'90px',
            background:'#F6F6F6'
        }
        var style2 = {
            width:140,
            height:89,
            textAlign:"center",
            borderLeft:"1px solid #E1E6EB",
		    borderTop:"1px solid #E1E6EB",
            display:'inline-block',
            padding:'0px 21px',
            textAlign:'center',
            lineHeight:'90px',
            background:'#F6F6F6'
        }
        return (
        <div ref = {(ref) =>{
                    this.pubilc = ref;
            }}
            className = "report-table" 
            style = {{
                zIndex:12,
                position:"absolute",
                width:276,
                display:"none"

            }}
        >
            <div>
                <div style = {style1} >城市</div>
                <div style = {style2} >社区</div>
            </div>   
            
        </div>
        )

    }
    
    componentDidMount(){
        var winHeight = 0;
        
		if (window.innerHeight)
		winHeight = window.innerHeight;
		else if ((document.body) && (document.body.clientHeight))
		winHeight = document.body.clientHeight;
		
        this.box.style.height = ((+winHeight-283))+"px";
        this.header.style.zIndex = "10";
        this.spreads.style.zIndex = "5";
        this.box.addEventListener("scroll",this.domOnscroll,false)
    }
    
    //滚轮监听
    domOnscroll = () =>{
        var scrollTop = this.box.scrollTop;
        var scrollLeft= this.box.scrollLeft;
            scrollTop = scrollTop>0?scrollTop:0;
            scrollLeft = scrollLeft>0?scrollLeft:0;
            if(scrollTop>=0){
                this.header.style.position = "absolute";
                this.header.style.top = scrollTop+"px";
                this.box.style.paddingTop = "90px";
                this.pubilc.style.top = scrollTop+"px";
                this.spreads.style.top = 90+"px";
                this.pubilc.style.display = "block";
                this.spreads.style.display = "block";
                
            }
            if(scrollLeft >=0){
                this.spreads.style.position = "absolute";
                this.spreads.style.left = scrollLeft+"px";
                this.pubilc.style.left = scrollLeft+"px";
                this.pubilc.style.display = "block";
                this.spreads.style.display = "block";
            }
        
    }
    //侧滑
    renderSpreads = () =>{
        var city = [];
        for(let i=0;i< this.allData.length;i++){
            var communitys = this.allData[i].communitys;
            for(let j=0;j< communitys.length;j++){
                let bgColor = j == communitys.length-1 && j!=0  ? "#F5F6FA" : "#fff";
                let every = (
                    <tr>
                        {j == 0 &&<td style = {{background:"#fff",minWidth:50}} rowSpan={communitys.length}>{communitys[j].cityName}</td>}
                        <td  style = {{background:bgColor,cursor : "text",minWidth:140}}>{communitys[j].communityName}</td>
                    </tr>
                )
                city.push(every);
            }
        }

        return (
                <div
                    ref = {
                        (ref)=>{
                            this.spreads = ref;
                        }
                    } 
                    style = {{display:"none"}}
                >
                <table className = "report-table" width = "186" cellSpacing="0" cellPadding="5" >
                    <tbody>
                        {city}
                    
                    </tbody>
                </table>
                </div>
                    
                )
    }

    componentWillUnmount(){
       this.box && this.box.removeEventListener("scroll",this.domOnscroll,false)
    }



	render() {
        const allData = this.allData;
        const {isLoading} = this.state;
       
		return (
            <div 
                ref = {
                    (ref) =>{
                        this.box = ref;
                    }
                } 
                style = {{overflow:"auto",width:'100%',position:"relative",boxSizing:"border-box"}}>
            <div 
                ref = {
                    (ref)=>{
                        this.header = ref;
                    }
                }
                style = {{
                    position : "relative",
                    top:0,
                }} 
            >
                <table 
                    className = "report-table" 
                    width = "100%" 
                    cellSpacing="0" 
                    cellPadding="5" 
                    style = {{marginBottom:0,borderBottom:0}} 
                >
                <tbody>
                    
                            <tr className = "header-tr">
                            
                                <td rowSpan="2" style = {{minWidth:50}}>城市</td>
                                <td rowSpan="2" style = {{minWidth:140}}>社区</td>
                                <td colSpan={this.addHeaderList.length}>新增总量</td>
                                <td colSpan={this.signHeaderList.length}>签约总量</td>
                            </tr>
                            <tr className = "header-tr">
                                {this.addHeaderList.map((item,index)=>{
                                    let color = index == (this.addHeaderList.length-1) ? "#F3A738":"#000"

                                    return <td style = {{color:color}}>{item.name}</td>
                                })}
                                {this.signHeaderList.map((item,index)=>{
                                    let color = index == (this.signHeaderList.length-1) ? "#F3A738":"#000"
                                    return <td style = {{color:color}}>{item.name}</td>
                                })}
                                
                            </tr>
                            
                            </tbody>
                    </table>
                 </div>
                 <div >
                 <table className = "report-table" width = "100%" cellSpacing="0" cellPadding="5" >
                    <tbody>
                            
                            {
                                allData.map((item,index) => {
                                    let isGlobal = index==0 ? true : false;
                                    return this.renderTr(item,isGlobal);
                                })
                            }
                        
                    </tbody>

                </table> 
                {!isLoading && allData.length == 0 &&<Nothing />}
                {isLoading && <Loading />}
           
                </div>
                {this.renderSpreads()}
                {this.publicTitle()}
            </div> 
		);
	}
}
