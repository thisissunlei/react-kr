import React, {
	Component
} from 'react';
// import $ from 'jquery';
// import {
// 	FontIcon,
// } from 'kr-ui';
import ReactDOM from 'react-dom';
import './index.less';
// import {ShallowEqual} from 'kr/Utils';
export default class UploadImage extends Component {
	static defaultProps = {
		
	}
	static PropTypes = {
		className: React.PropTypes.string
	}
	constructor(props){
		super(props);
		this.state={
			files :[]
		}
	}
	componentDidMount() {
	}
	componentWillReceiveProps(nextProps){
	}
	onChange=(files)=>{
		console.log("files",files);
		this.setState({
            files: this.state.files.concat(files)
        })
        console.log("files",files);
	}
	render() {
		return(
			<div className='ui-uploadimg-outbox' >
				<div className='ui-uploadimg-innerbox' >
					<div className='ui-uploadimg-inner'>
						<img className="image"  src="" width="200px" ref="uploadImage"/>
						<span className='ui-uploadimg-button'>+</span>
						<input type='file' onChange={this.onChange}/>
						<span className='ui-uploadimg-tip'>上传图片</span>
					</div>
				</div>
			</div>
		);
	}
}
