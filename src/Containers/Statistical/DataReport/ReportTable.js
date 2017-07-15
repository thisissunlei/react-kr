import React from 'react';
import {
	Button,
} from 'kr-ui';
import { observer } from 'mobx-react';
import {Http} from 'kr/Utils'
import './index.less';
import State from './State';
import data from './Data/head.json'
@observer
export default class ReportTable extends React.Component {



	constructor(props, context) {
		super(props, context);
		this.state={
          openReportDetail:false,
          winHeight : 0,
          isRender:'',
		}
        this.headerData = data.data;
        this.add = [];
        this.signing = [];
        this.allData = [];//所有数据
 
        this.signHeaderList = [];//头部签约数据
        this.addHeaderList = [];//头部新增数据

        this.isFixed = false;
        this.scrollYNum = 0;
        this.scrollXNum = 0;
        this.filterHeader();
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
        Http.request('getReportList',{
            cityId :State.cityId,
            communityId:State.communityId,
            searchStartDate:State.searchStartDate,
            searchEndDate:State.searchEndDate,
        }).then(function(response) {
            console.log(response,"KKKKK");
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
		}).catch(function(err) {

		});
    }
    //过滤头部数组
    filterHeader =() =>{
        var signList = [];
        var addList = [];
        this.headerData.signList.map((item,index)=>{
            signList.push(item.code)
        })
        this.headerData.addList.map((item,index)=>{
            addList.push(item.code)
        })
        this.signList = signList;
        this.addList = addList;
    }
    //点击任何一个数据
	detailClick=()=>{
        const {everyClick} = this.props;
        everyClick && everyClick();
	}
   
    renderTr = (community,isGlobal) =>{
        var bgColor = {background:"#fff"};
        let show = true;

        var com = community.communitys.map((item,index)=>{ 
            return (<tr>
                       
                        { index == 0 && <td style = {bgColor} rowSpan= {community.communitys.length}>{item.cityName}</td>}
                        <td style = {bgColor}>{item.communityName}</td>
                        {this.renderAdd(isGlobal ? '' : community.cityId,isGlobal ? '' : item.communityId,item)}
                        {this.renderSign(isGlobal ? '' : community.cityId,isGlobal ? '' : item.communityId,item)}
                    </tr>)
        })
        return com;
    }
    arrToObject = (arr) =>{
        let obj = {};
       
        arr && arr.map((item,index)=>{
            obj[item.sourceCode] = item.countNum;
        })
        return obj;
    }
    //新增数据渲染被点击
    renderAdd = (cityId,communityId,adds) =>{
        const self = this;
        var allAdd = []
        
           allAdd = this.add.map((item,index) => {
                
            return (!adds.addList ?<td  key= {index} >{"-"}</td> : <td
                        key= {index} 
                        onClick = {()=>{
                            State.detailCityId = cityId || '';
                            State.detailCommunityId = communityId || '';
                            State.sourceId = item.sourceId || '';
                            this.arrToObject(adds.addList)[item.code] && self.detailClick();
                        }}
                    >
                        {this.arrToObject(adds.addList)[item.code]||"-"}
                    </td>)
            })
        
        return allAdd;
    }
    //签约
    renderSign = (cityId,communityId,signs) =>{
        let self = this;
        var allSign = this.signing.map((item,index) =>{
            return (!signs.signList ?<td  key= {index} >{"-"}</td> :<td key= {index}
                        onClick = {()=>{
                            State.detailCityId = cityId || '';
                            State.detailCommunityId = communityId || '';
                            State.sourceId = item.sourceId || '';
                            this.arrToObject(signs.signList)[item.code] && self.detailClick();
                        }}
            
                    >
                        {this.arrToObject(signs.signList)[item.code]||'-'}
                    </td>)
        })
        return allSign;
    }
    //城市社区
    publicTitle = () =>{
        var style = {
            width:100,
            height:90,
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
                width:286
            }}
        >
            <div>
                <div style = {style} >城市</div>
                <div style = {style} >社区</div>
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
        
        // console.log(scrollTop)
            scrollTop = scrollTop>0?scrollTop:0;
            scrollLeft = scrollLeft>0?scrollLeft:0;
            if(scrollTop>=0){
                this.header.style.position = "absolute";
                this.header.style.top = scrollTop+"px";
                this.box.style.paddingTop = "90px";
                this.pubilc.style.top = scrollTop+"px";
                this.spreads.style.top = 90+"px";
                
            }
            if(scrollLeft >=0){
                this.spreads.style.position = "absolute";
                this.spreads.style.left = scrollLeft+"px";
                this.pubilc.style.left = scrollLeft+"px";
            }
        
    }
    //侧滑
    renderSpreads = () =>{
        var city = [];
        for(let i=0;i< this.allData.length;i++){
            var communitys = this.allData[i].communitys;
            for(let j=0;j< communitys.length;j++){
                let every = (
                    <tr>
                        {j == 0 &&<td rowSpan={communitys.length}>{communitys[j].cityName}</td>}
                        <td>{communitys[j].communityName}</td>
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
        this.box.removeEventListener("scroll",this.domOnscroll,false)
    }



	render() {
        const allData = this.allData;
        const {winHeight,isRender} = this.state;

		return (
            <div 
                ref = {
                    (ref) =>{
                        this.box = ref;
                    }
                } 
                style = {{overflow:"auto",width:'100%',position:"relative"}}>
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
                           
                            <td rowSpan="2">城市</td>
                            <td rowSpan="2">社区</td>
                            <td colSpan={this.signHeaderList.length}>新增总量</td>
                            <td colSpan={this.signHeaderList.length}>签约总量</td>
                        </tr>
                        <tr className = "header-tr">
                            {this.signHeaderList.map((item,index)=>{
                                return <td>{item.name}</td>
                            })}
                            {this.addHeaderList.map((item,index)=>{
                                return <td>{item.name}</td>
                            })}
                            
                        </tr>
                         
                        </tbody>
                 </table>
                 </div>
                 <div>
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
           
            </div>
            {this.renderSpreads()}
            {this.publicTitle()}
            </div> 
		);
	}
}
