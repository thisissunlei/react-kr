import React from 'react';
import {
	Button,
} from 'kr-ui';
import './index.less';
import data from './Data/head.json'
// @observer
export default class ReportTable extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state={
          openReportDetail:false,
          winHeight : 0,
		}
        this.headerData = data.data;
        this.add = ["Ap1","Ap2","Ap3","Ap4","Ap5","Ap6","Ap7","Ap8","Ap9","Ap10","Ap11"]
        this.signing = ["sig1","sig2","sig3","sig4","sig5","sig6","sig7","sig8","sig9","sig10","sig11"]
        this.allData = [
            {
                city:"北京",
                communitys:[
                    {
                        city:'北京',
                        communityName:"创业大街社区",
                        newAdd:{Ap1:123,Ap2:123,Ap3:123,Ap4:123,Ap5:123,Ap6:123,Ap7:123,Ap8:123,Ap9:123,Ap10:123,Ap11:123},
                        signing:{sig1:888,sig2:888,sig3:888,sig4:888,sig5:888,sig6:888,sig7:888,sig8:888,sig9:888,sig10:888,sig11:888},
                    },
                    {
                        city:'北京',
                        communityName:"创业大街社区",
                        newAdd:{Ap1:123,Ap2:123,Ap3:123,Ap4:123,Ap5:123,Ap6:123,Ap7:123,Ap8:123,Ap9:123,Ap10:123,Ap11:123},
                        signing:{sig1:888,sig2:888,sig3:888,sig4:888,sig5:888,sig6:888,sig7:888,sig8:888,sig9:888,sig10:888,sig11:888},
                    },
                     {
                        city:'北京',
                        communityName:"创业大街社区",
                        newAdd:{Ap1:123,Ap2:123,Ap3:123,Ap4:123,Ap5:123,Ap6:123,Ap7:123,Ap8:123,Ap9:123,Ap10:123,Ap11:123},
                        signing:{sig1:888,sig2:888,sig3:888,sig4:888,sig5:888,sig6:888,sig7:888,sig8:888,sig9:888,sig10:888,sig11:888},
                    },
                     {
                        city:'北京',
                        communityName:"创业大街社区",
                        newAdd:{Ap1:123,Ap2:123,Ap3:123,Ap4:123,Ap5:123,Ap6:123,Ap7:123,Ap8:123,Ap9:123,Ap10:123,Ap11:123},
                        signing:{sig1:888,sig2:888,sig3:888,sig4:888,sig5:888,sig6:888,sig7:888,sig8:888,sig9:888,sig10:888,sig11:888}
                    },
                ]
            },
            {
                city:"上海",
                communitys:[
                    {
                        city:'上海',
                        communityName:"上海创业大街社区",
                        newAdd:{Ap1:123,Ap2:123,Ap3:123,Ap4:123,Ap5:123,Ap6:123,Ap7:123,Ap8:123,Ap9:123,Ap10:123,Ap11:123},
                        signing:{sig1:888,sig2:888,sig3:888,sig4:888,sig5:888,sig6:888,sig7:888,sig8:888,sig9:888,sig10:888,sig11:888}
                    },
                    {
                        city:'上海',
                        communityName:"上海创业大街社区",
                        newAdd:{Ap1:123,Ap2:123,Ap3:123,Ap4:123,Ap5:123,Ap6:123,Ap7:123,Ap8:123,Ap9:123,Ap10:123,Ap11:123},
                        signing:{sig1:888,sig2:888,sig3:888,sig4:888,sig5:888,sig6:888,sig7:888,sig8:888,sig9:888,sig10:888,sig11:888}
                    },
                     {
                        city:'上海',
                        communityName:"上海创业大街社区",
                        newAdd:{Ap1:123,Ap2:123,Ap3:123,Ap4:123,Ap5:123,Ap6:123,Ap7:123,Ap8:123,Ap9:123,Ap10:123,Ap11:123},
                        signing:{sig1:888,sig2:888,sig3:888,sig4:888,sig5:888,sig6:888,sig7:888,sig8:888,sig9:888,sig10:888,sig11:888}
                    },
                     {
                        city:'上海',
                        communityName:"上海创业大街社区",
                        newAdd:{Ap1:123,Ap2:123,Ap3:123,Ap4:123,Ap5:123,Ap6:123,Ap7:123,Ap8:123,Ap9:123,Ap10:123,Ap11:123},
                        signing:{sig1:888,sig2:888,sig3:888,sig4:888,sig5:888,sig6:888,sig7:888,sig8:888,sig9:888,sig10:888,sig11:888}
                    },
                     {
                        city:'上海',
                        communityName:"上海创业大街社区",
                        newAdd:{Ap1:123,Ap2:123,Ap3:123,Ap4:123,Ap5:123,Ap6:123,Ap7:123,Ap8:123,Ap9:123,Ap10:123,Ap11:123},
                        signing:{sig1:888,sig2:888,sig3:888,sig4:888,sig5:888,sig6:888,sig7:888,sig8:888,sig9:888,sig10:888,sig11:888}
                    },
                     {
                        city:'上海',
                        communityName:"上海创业大街社区",
                        newAdd:{Ap1:123,Ap2:123,Ap3:123,Ap4:123,Ap5:123,Ap6:123,Ap7:123,Ap8:123,Ap9:123,Ap10:123,Ap11:123},
                        signing:{sig1:888,sig2:888,sig3:888,sig4:888,sig5:888,sig6:888,sig7:888,sig8:888,sig9:888,sig10:888,sig11:888}
                    },
                     {
                        city:'上海',
                        communityName:"上海创业大街社区",
                        newAdd:{Ap1:123,Ap2:123,Ap3:123,Ap4:123,Ap5:123,Ap6:123,Ap7:123,Ap8:123,Ap9:123,Ap10:123,Ap11:123},
                        signing:{sig1:888,sig2:888,sig3:888,sig4:888,sig5:888,sig6:888,sig7:888,sig8:888,sig9:888,sig10:888,sig11:888}
                    },
                     {
                        city:'上海',
                        communityName:"上海创业大街社区",
                        newAdd:{Ap1:123,Ap2:123,Ap3:123,Ap4:123,Ap5:123,Ap6:123,Ap7:123,Ap8:123,Ap9:123,Ap10:123,Ap11:123},
                        signing:{sig1:888,sig2:888,sig3:888,sig4:888,sig5:888,sig6:888,sig7:888,sig8:888,sig9:888,sig10:888,sig11:888}
                    },
                     {
                        city:'上海',
                        communityName:"上海创业大街社区",
                        newAdd:{Ap1:123,Ap2:123,Ap3:123,Ap4:123,Ap5:123,Ap6:123,Ap7:123,Ap8:123,Ap9:123,Ap10:123,Ap11:123},
                        signing:{sig1:888,sig2:888,sig3:888,sig4:888,sig5:888,sig6:888,sig7:888,sig8:888,sig9:888,sig10:888,sig11:888}
                    },
                     {
                        city:'上海',
                        communityName:"上海创业大街社区",
                        newAdd:{Ap1:123,Ap2:123,Ap3:123,Ap4:123,Ap5:123,Ap6:123,Ap7:123,Ap8:123,Ap9:123,Ap10:123,Ap11:123},
                        signing:{sig1:888,sig2:888,sig3:888,sig4:888,sig5:888,sig6:888,sig7:888,sig8:888,sig9:888,sig10:888,sig11:888}
                    },
                     {
                        city:'上海',
                        communityName:"上海创业大街社区",
                        newAdd:{Ap1:123,Ap2:123,Ap3:123,Ap4:123,Ap5:123,Ap6:123,Ap7:123,Ap8:123,Ap9:123,Ap10:123,Ap11:123},
                        signing:{sig1:888,sig2:888,sig3:888,sig4:888,sig5:888,sig6:888,sig7:888,sig8:888,sig9:888,sig10:888,sig11:888}
                    },
                     {
                        city:'上海',
                        communityName:"上海创业大街社区",
                        newAdd:{Ap1:123,Ap2:123,Ap3:123,Ap4:123,Ap5:123,Ap6:123,Ap7:123,Ap8:123,Ap9:123,Ap10:123,Ap11:123},
                        signing:{sig1:888,sig2:888,sig3:888,sig4:888,sig5:888,sig6:888,sig7:888,sig8:888,sig9:888,sig10:888,sig11:888}
                    },
                     {
                        city:'上海',
                        communityName:"上海创业大街社区",
                        newAdd:{Ap1:123,Ap2:123,Ap3:123,Ap4:123,Ap5:123,Ap6:123,Ap7:123,Ap8:123,Ap9:123,Ap10:123,Ap11:123},
                        signing:{sig1:888,sig2:888,sig3:888,sig4:888,sig5:888,sig6:888,sig7:888,sig8:888,sig9:888,sig10:888,sig11:888}
                    },
                     {
                        city:'上海',
                        communityName:"上海创业大街社区",
                        newAdd:{Ap1:123,Ap2:123,Ap3:123,Ap4:123,Ap5:123,Ap6:123,Ap7:123,Ap8:123,Ap9:123,Ap10:123,Ap11:123},
                        signing:{sig1:888,sig2:888,sig3:888,sig4:888,sig5:888,sig6:888,sig7:888,sig8:888,sig9:888,sig10:888,sig11:888}
                    },

                ]
            }

        ];
        this.isFixed = false;
        this.scrollYNum = 0;
        this.scrollXNum = 0;
        this.filterHeader();
        
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
   
    renderTr = (city,community) =>{
        var bgColor = {background:"#fff"};
        var com = community.communitys.map((item,index)=>{
            return (<tr>
                       
                        {index == 0 && <td style = {bgColor} rowSpan= {community.communitys.length}>{city}</td>}
                        <td style = {bgColor}>{item.communityName}</td>
                        {this.renderAdd(item)}
                        {this.renderSign(item)}
                    </tr>)

        })
        return com;
    }
    
    //新增数据渲染被点击
    renderAdd = (adds) =>{
        const self = this;
        var allAdd = this.add.map((item,index) => {
            
            return <td
                        key= {index} 
                        onClick = {()=>{
                            self.detailClick();
                        }}
                    >
                        {adds.newAdd[item]}
                    </td>
        })
        return allAdd
    }
    //签约
    renderSign = (signs) =>{
        var allSign = this.signing.map((item,index) =>{
            return <td key= {index}>{signs.signing[item]}</td>
        })
        return allSign
    }
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
    renderSpreads = () =>{
        var city = [];
        for(let i=0;i< this.allData.length;i++){
            var communitys = this.allData[i].communitys;
            for(let j=0;j< communitys.length;j++){
                let every = (
                    <tr>
                        {j == 0 &&<td rowSpan={communitys.length}>{communitys[j].city}</td>}
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
                        <tr>
                            <td >全国</td>
                            <td >全部</td>
                        </tr>
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
        const {winHeight} = this.state;

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
                            <td colSpan="11">新增总量</td>
                            <td colSpan="11">签约总量</td>
                        </tr>
                        <tr className = "header-tr">

                            <td >app预约</td>
                            <td >官网预约</td>
                            <td >58同城</td>
                            <td >安居客</td>
                            <td >闲鱼网</td>
                            <td >今日头条</td>
                            <td >微信公众号</td>
                            <td >400电话</td>
                            <td >市场合作</td>
                            <td >中介客源</td>
                            <td >合计</td>
                            <td >app预约</td>
                            <td >官网预约</td>
                            <td >58同城</td>
                            <td >安居客</td>
                            <td >闲鱼网</td>
                            <td >今日头条</td>
                            <td >微信公众号</td>
                            <td >400电话</td>
                            <td >市场合作</td>
                            <td >中介客源</td>
                            <td >合计</td>
                        </tr>
                         
                        </tbody>
                 </table>
                 </div>
                 <div>
                 <table className = "report-table" width = "100%" cellSpacing="0" cellPadding="5" >
                    <tbody>
                        <tr>

                            <td >全国</td>
                            <td >全部</td>
                            
                            <td colSpan="11">新增总量</td>
                            <td colSpan="11">签约总量</td>
                        </tr>
                        {
                            allData.map((item,index) => {

                                var city = item.city;

                                return this.renderTr(city,item);


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
