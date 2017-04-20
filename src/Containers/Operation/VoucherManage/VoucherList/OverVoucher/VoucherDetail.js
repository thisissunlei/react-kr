import React from 'react';
import 'react-photoswipe/lib/photoswipe.css';
import {PhotoSwipeGallery} from 'react-photoswipe';
import {Http} from 'kr/Utils';
import {
	KrField
} from 'kr-ui';
import './index.less';


export default class VoucherDetail extends React.Component {

	static PropTypes = {
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state = {
      infoList:[]
		}
	}
	componentDidMount() {
    var _this = this;
    var id = this.props.detail.id
    Http.request('findPaymentEvidence', {
            id: id
        }, {}).then(function(response) {
            _this.setState({infoList: response})
        }).catch(function(err) {});

	}
  onCancel = () => {
        let {onCancel} = this.props;
        onCancel && onCancel();
    }
	renderFileName=()=>{

		this.fileList.map((item, value) => {
			return (
				<div key={index}>{item}</div>
			)
		});
	}
	getThumbnailContent = (item) => {
  return (
    <img src={item.src} width={90} height={90}/>
  );
	}
	render() {
		let {infoList} = this.state;
		let items = [];
		if(infoList.urls){
			items = infoList.urls.map((item,value) => {
				return(
					{
						src: item.src,
						w: 900,
						h: 900,
					}
				)
			});
		}
// 		let items = [
//   {
//     src: 'http://lorempixel.com/1200/900/sports/1',
//     thumbnail: 'http://lorempixel.com/120/90/sports/1',
//     w: 900,
//     h: 900,
//     title: 'Image 1'
//   },
//   {
//     src: 'http://lorempixel.com/1200/900/sports/2',
//     thumbnail: 'http://lorempixel.com/120/90/sports/2',
//     w: 900,
//     h: 900,
//     title: 'Image 2'
//   },
// 	{
//     src: 'http://lorempixel.com/1200/900/sports/1',
//     thumbnail: 'http://lorempixel.com/120/90/sports/1',
//     w: 900,
//     h: 900,
//     title: 'Image 1'
//   },
//   {
//     src: 'http://lorempixel.com/1200/900/sports/2',
//     thumbnail: 'http://lorempixel.com/120/90/sports/2',
//     w: 900,
//     h: 900,
//     title: 'Image 2'
//   },
// ];
		return (
			<div >
					 <div style={{marginTop:30}}>
						 <KrField grid = {1 / 2}   inline={false} component="labelText" label="签约方名称" value={infoList.customerName}/>
						 <KrField grid = {1 / 2}  component="labelText" inline={false} label="付款方式" value={infoList.payWayName}/>
						 <KrField grid = {1 / 2} component="labelText" inline={false} label="付款方名称" value={infoList.paymentAccount}/>
						 <KrField grid = {1 / 2}  component="labelText" label="入驻社区" inline={false} value={infoList.communityName}/>
						 <KrField grid = {1}  component="labelText" inline={false} defaultValue={infoList.remark} label="备注说明" />
						 <KrField grid = {1}  component="labelText" inline={false} label="添加凭证" />
						 	<div style={{marginLeft:19,marginTop:-28}}>
								<PhotoSwipeGallery items={items} thumbnailContent={this.getThumbnailContent}/>
						 	</div>
					 </div>
			</div>


		);
	}
}
