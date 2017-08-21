
import React, { PropTypes } from 'react';
import './index.less';
import {
    clamp
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
		if(!detail.url){
            style = {
                left:30,
                right:42
            }
        }
		return (
			<div className="ui-article_list" 
                onClick = {()=>{
                    this.onClick(detail);
                }}>
                    
                    <img className = "ui-article-img" src={detail.url||''} alt=""/> 
                    
                    <div className = "ui-article-content" style = {style}>
                        <h2 className = "ui-article-title">{detail.title||''}</h2>
                        <div 
                            className = "ui-article-text"
                            ref = {
                                (ref)=>{
                                    this.clamp = ref;
                                }
                            }
                        
                        >{detail.content||''}</div>
                    </div>

			</div>

		);
	}
}
