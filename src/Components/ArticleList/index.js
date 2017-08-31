
import React, { PropTypes } from 'react';
import './index.less';
import {
    clamp,
    delHtmlTag
} from 'kr/Utils'

export default class ArticleList extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			searchParams:{
				name:'ddsdfs'
			},
		
		}

	}
	componentDidMount(){
        
        clamp(
            this.clamp,
            {
                clamp : 5,
                useNativeClamp : false,
                truncationChar :  "...",
                animate :  false,  
            })

	}
    profileRender = () =>{

    }
    onClick = (data) =>{
        let {onClick} = this.props;
        onClick && onClick(data);
    }
	
	render() {
        const {detail} = this.props;
        let style = {};
        let imgStyle = {display:"inline-block"}
		if(!detail.url){
            style = {
                left:0,
                right:0,
                top:0,
                position:"relative",
                boxSizing: "border-box",
                padding:" 0px 42px 0px 30px",
            };
            imgStyle = {
                display:"none"
            };
        }
		return (
			<div className="ui-article_list" 
                onClick = {()=>{
                    this.onClick(detail);
                }}>
                    
                    <img className = "ui-article-img" src={detail.url||''} style = {imgStyle} alt=""/> 
                    
                    <div className = "ui-article-content" style = {style}>
                        <div className = "ui-article-title">{detail.title||''}</div>
                        <div 
                            className = "ui-article-text"
                            ref = {
                                (ref)=>{
                                    this.clamp = ref;
                                }
                            }
                        >{delHtmlTag(detail.content||'')}</div>
                    </div>

			</div>

		);
	}
}
