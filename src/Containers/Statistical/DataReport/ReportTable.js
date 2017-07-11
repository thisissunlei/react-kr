import React from 'react';
import {
	Button,
} from 'kr-ui';
import './index.less';

// @observer
export default class ReportTable extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state={
          openReportDetail:false,
          winHeight : 0,
		}
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
        
	}
    //点击任何一个数据
	detailClick=()=>{

	}
   
    renderTr = (city,community) =>{
        var com = community.communitys.map((item,index)=>{
            return (<tr>
                       
                        {index == 0 && <td style = {{background:"#fff"}} rowSpan= {community.communitys.length}>{city}</td>}
                        <td>{item.communityName}</td>
                        {this.renderAdd(item)}
                        {this.renderSign(item)}
                    </tr>)

        })
        return <div>{com}</div>;
    }
    renderAdd = (adds) =>{
        var allAdd = this.add.map((item,index) => {
            
            return <td>{adds.newAdd[item]}</td>
        })
        return <div>{allAdd}</div>
    }
    renderSign = (signs) =>{
        var allSign = this.signing.map((item,index) =>{
            return <td>{signs.signing[item]}</td>
        })
        return <div>{allSign}</div>
    }
    
    componentDidMount(){
        var winHeight = 0;
		if (window.innerHeight)
		winHeight = window.innerHeight;
		else if ((document.body) && (document.body.clientHeight))
		winHeight = document.body.clientHeight;
		console.log(winHeight,">>>>>>>>>");
        this.setState({
            winHeight,
        })
        window.addEventListener("scroll",this.domOnscroll,false)
    }

    domOnscroll = () =>{
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var scrollLeft= document.documentElement.scrollLeft || document.body.scrollLeft;
        if(scrollTop>100){
           this.header.style.position = "fixed";
           this.header.style.top = "50px";
           

        }else{
            this.header.style.position = "relative";
            this.header.style.top = "0px";
            
        }
    }
    //判断头部是否固定
    flagFixed = () =>{


    }



	render() {
        const allData = this.allData;
        const {winHeight} = this.state;

		return (
            <div style = {{height:winHeight,overflow:"auto",width:'100%'}}>
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
                            <span>
                            <td rowSpan="2">城市</td>
                            <td rowSpan="2">社区</td>
                            </span>
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
                 <table className = "report-table" width = "100%" cellSpacing="0" cellPadding="5" >
                    <tbody>
                        <tr>
                            <span>
                            <td >全国</td>
                            <td >全部</td>
                            </span>
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
		);
	}
}
