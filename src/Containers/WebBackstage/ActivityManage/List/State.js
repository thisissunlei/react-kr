import mobx, {
	observable,
	action,
	extendObservable
} from 'mobx';
import {
	Actions,
	Store
} from 'kr/Redux';

import {Message} from 'kr-ui';
let State = observable({
	openNewCreate: false,
	openView: false,
	openDetail:false,
	openEditDetail: false,
	openAdvancedQuery :false,
	openCloseNavs:false,
	status:false,
	submit:false,
	itemDetail: {},
	item: {},
	list: {},
	content:'',
	actField:{
		actEnroll:[],
		items:[]
	},
	filter:'COMP_NAME',
	// 是否置顶
	isStick : false,
	// 上传图片地址
	requestURI :'/mockjsdata/33/activity/upload-pic', 
	// 默认地址
	initailPoint : "北京",
	HeightAuto:false,
	contentHeightAuto:false,
	initailPoint : "",
	choseName: false,
	chosePhone: false,
	choseCompany: false,
	chosePosition: false,
	choseAdd: false,
	noPublic : false,
	itemDetail:{},
	searchParams: {
		beginDate:'',
		cityId:'',
		countyId: '',
		endDate:'',
		name:'',
		page: 1,
		pageSize: 15,
		type:'',
		time:''
	},
	itemData : '',
	
});

State.itemDownPublish = action(function(id) {
	var _this = this;
	var searchParams = Object.assign({},mobx.toJS(_this.searchParams));
	searchParams.time = +new Date();
	Store.dispatch(Actions.callAPI('activityPublish', {
		id: id,
		type:0
	})).then(function(response) {
		Message.success('下线成功');
		_this.searchParams = searchParams;
	}).catch(function(err) {
		Message.error('下线失败');
	});

});
State.itemUpPublish = action(function(id) {
	var _this = this;
	var searchParams = Object.assign({},mobx.toJS(_this.searchParams));
	searchParams.time = +new Date();
	
	Store.dispatch(Actions.callAPI('activityPublish', {
		id: id,
		type:1
	})).then(function(response) {
		Message.success('发布成功');
		_this.searchParams = searchParams;
	}).catch(function(err) {
		Message.error('发布失败');
	});



});

State.upItemPosition = action(function(id) {
	var _this = this;
	var searchParams = Object.assign({},mobx.toJS(_this.searchParams));
	searchParams.time = +new Date();
	
	Store.dispatch(Actions.callAPI('activityUpPosition', {
		id: id,
		top:1
	})).then(function(response) {
		Message.success('置顶成功');
		_this.searchParams = searchParams;
	}).catch(function(err) {
		console.log('err',err);
		Message.error(err.message);
	});



});
State.resetUpItemPosition = action(function(id) {
	var _this = this;
	var searchParams = Object.assign({},mobx.toJS(_this.searchParams));
	searchParams.time = +new Date();
	Store.dispatch(Actions.callAPI('activityUpPosition', {
		id: id,
		top:0
	})).then(function(response) {
		Message.success('取消置顶成功');
		_this.searchParams = searchParams;
	}).catch(function(err) {
		console.log('err',err);
		Message.error(err.message);
	});
});

State.activityGetList = action(function(id) {
	var _this = this;
	Store.dispatch(Actions.callAPI('activityGetList', {
		id: id,
	})).then(function(response) {
		console.log('response',response);
		_this.actField = response;
	}).catch(function(err) {
		console.log('err',err);
	});
});

State.activityItemcontent = action(function() {
	let res = "<p style=\"margin: 0 0 10px;text-indent: 32px;padding: 0;line-height: 150%;background: rgb(255, 255, 255)\"><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"><span style=\"font-family:宋体\">回首</span>2016，我在想，这会不会是属于氪空间最难忘的一年呢？2016，是联合办公的第一年，从某种意义上讲也是氪空间的第一年，同样也是我的第一年。</span></p><p style=\"margin: 0 0 10px;text-indent: 32px;padding: 0;line-height: 150%;background: rgb(255, 255, 255)\"><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"></span></p><p><img src=\"https://pic.36krcnd.com/20170215/bfbfb0b0efd6406a5df56488c493e6ef.png\"></p><p style=\"margin: 0 0 10px;text-indent: 32px;padding: 0;line-height: 150%;background: rgb(255, 255, 255)\"><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"></span><br></p><p style=\"margin: 0 0 10px;text-indent: 32px;padding: 0;line-height: 150%;background: rgb(255, 255, 255)\"><span style=\"color: rgb(57, 57, 57); font-family: 宋体; letter-spacing: 0px; line-height: 150%;\">氪空间是一个有明确未来的事业，今年</span><span style=\"color: rgb(57, 57, 57); font-family: 宋体; letter-spacing: 0px; line-height: 150%;\">11月份，我们获得了普思（万达）和IDG资本共同投资的2亿A+轮融资，我们受到了来自多方的赞誉，但我们非常清楚过去的这一年发生的一切，也切身的感受到了创业的“九死一生”。</span></p><p style=\"margin: 0 0 10px;text-indent: 32px;padding: 0;line-height: 150%;background: rgb(255, 255, 255)\"><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"><span style=\"font-family:宋体\">过去的一年，我们无数次拥抱变化，也曾走过弯路，但如今看来，我们很幸运，因为在看似</span>“安全”的阶段，我们依旧可以保持清醒，发现并面对错误，而对于改进方向和未来，我们非常明确且坚定。</span></p><p style=\"margin: 0 0 10px;text-indent: 32px;padding: 0;line-height: 150%;background: rgb(255, 255, 255)\"><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"><span style=\"font-family:宋体\">我们的业务是由物业持有者的痛点触发的</span></span></p><p style=\"margin: 0 0 10px;text-indent: 32px;padding: 0;line-height: 150%;background: rgb(255, 255, 255)\"><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"><span style=\"font-family:宋体\">大家都知道，我以前一直从事房地产相关行业，我的那些朋友，就是现在被大家吐槽最多的开发商和各类物业的持有者。在你们看来，他们的日子就像周星驰电影中的</span>“收租婆”那样，令人羡慕？，但事实是，并不是人们想象的那样，他们的生意一直存在着痛点，并且从未被很好的解决。他们到底在烦恼什么呢？</span></p><p style=\"margin: 0 0 10px;text-indent: 32px;padding: 0;line-height: 150%;background: rgb(255, 255, 255)\"><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"><span style=\"font-family:宋体\">就在前两天，我们在上海又拿下了一个核心区域的核心物业，</span>11000平米，是当地的一个开发商的物业，我跟他见面的时候，就算了一笔账，也就是半个小时的时间，我们就达成了合作。我说，传统意义上，你和租户之间的租期是1年，最多可能是3年，如果放在10年的时间里看，每年都在重复着免租期、设计、装修、招租，以及随之不定期出现的租赁纠纷，其实，你实际获得租金的时间也就不到8年。外行不知道，咱们最清楚你们劳心劳力还没有得到应有的社会尊敬的切身痛楚了。</span></p><p style=\"margin: 0 0 10px;text-indent: 32px;padding: 0;line-height: 150%;background: rgb(255, 255, 255)\"><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"><span style=\"font-family:宋体\">氪空间是怎么做的呢？我们与物业持有者签署长期租约，然后对其进行更新改造后再租给企业，就充分的解决了业主的后顾之忧，帮他们</span>“省事儿”的同时，实现了空间价值的最大化。</span></p><p style=\"margin: 0 0 10px;text-indent: 32px;padding: 0;line-height: 150%;background: rgb(255, 255, 255)\"><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"><span style=\"font-family:宋体\">所以说，我们的业务是由物业持有者的痛点触发的，而另一个维度，正如氪空间因</span>“空间”而生一样，我们所处的行业——联合办公，是在一个更大的“空间”中有机会大施拳脚，这个空间就是城市。过去的20年，城市在疯狂生长，它的中心不断迁移，由工厂到以交易为主的商业综合体，再到传统零售业受到电商的猛烈冲击，直接导致了一些老的商业综合体的式微，城市似乎生病了，最直接的体现是位于城市核心区的大量老建筑活力流失，走向衰败，这是在城市发展的大背景下，这部分物业的持有者承受的前所未有的压力，这也是他们的一个痛点。</span></p><p style=\"margin: 0 0 10px;text-indent: 32px;padding: 0;line-height: 150%;background: rgb(255, 255, 255)\"><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"><span style=\"font-family:宋体\">所以，氪空间在做的事情，就是着眼于城市的核心区域，或位于核心区边缘具备稀缺优势的物业，把那些被忽略的</span>“价值”重新擦亮，与物业持有者通过长期租赁的方式拿到物业，然后对其进行更新改造，当然，对于每个区域中每个空间中的精华和难忘的“记忆”，我们会充分接纳并且守护，并让它们和氪空间的文化有机融合。对于业主而言，当那些走下坡路的老物业被重新改造，注入全新的内容后，对产业形成全新的吸引力和承载力，迸发新活力。</span></p><p style=\"margin: 0 0 10px;text-indent: 32px;padding: 0;line-height: 150%;background: rgb(255, 255, 255)\"><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"><span style=\"font-family:宋体\">每改造一座物业，每开放一座社区，就像在城市的地图上画上一点，相信有一天，我们对</span>“城市更新”的作用力，对业主的“解放”价值将由点及面，形成巨大的“新动能”，帮助业主们获得价值升华，帮助城市再度焕发青春。</span></p><p style=\"margin: 0 0 10px;text-indent: 32px;padding: 0;line-height: 150%;background: rgb(255, 255, 255)\"><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"><span style=\"font-family:宋体\">氪空间的进步与客户的需求是紧密联系的</span></span><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"><span style=\"font-family:宋体\">。</span></span></p><p style=\"margin: 0 0 10px;text-indent: 32px;padding: 0;line-height: 150%;background: rgb(255, 255, 255)\"><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"><span style=\"font-family:宋体\">一年前的今天，氪空间从</span>36氪拆分出来，独立完成了融资。从心情上，我们对接下来要做的这份事业满怀信心，如今再看这份事业的模样，已然几经迭代。</span></p><p style=\"margin: 0 0 10px;text-indent: 32px;padding: 0;line-height: 150%;background: rgb(255, 255, 255)\"><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"><span style=\"font-family:宋体\">曾经，我们对空间的概念很模糊</span>…曾经，我们缺乏资金，所以我们谨小慎微的做着试验，比如拿到最便宜的物业，那是一个地下室，四面封闭没有光照，直到有一天我坐在办公桌前，感觉很压抑，透不过气，我才明白这种压抑并非来自于招商的压力，而是这个空间本身，是不适合办公的。</span></p><p style=\"margin: 0 0 10px;text-indent: 32px;padding: 0;line-height: 150%;background: rgb(255, 255, 255)\"><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"><span style=\"font-family:宋体\">后来我们有了一点钱，我们开始拓展其他的店面，试图用最小的资金做最大规模化的东西，我们签了很多性价比相对比较高的物业，或通过合作签约的模式获得很多物业，这些物业租期很短，楼宇的形象参差不齐，但是我们通过改造，保证了空间内部的形象和格局，招商的情况还不错，当我以为那就是氪空间的时候，我又听到了一些声音：说我们的会议室太小，不够高大上；楼体太破，没有走进来的欲望；没有老板间，空间相似度太高</span>...于是我们继续升级产品。</span></p><p style=\"margin: 0 0 10px;text-indent: 32px;padding: 0;line-height: 150%;background: rgb(255, 255, 255)\"><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"><span style=\"font-family:宋体\">我们的客户到底是谁？他们到底需要什么？我们的产品是什么？需要我们在实践的过程中不断思考，我们所处的行业很新，我们必须要最快的让一件事落地。氪空间的一家入驻企业，由最初的</span>3个人扩张到10人，当体量扩张后，他们不需要搬家，不需要去选址、设计装修、采购家具，只要按需增加工位和其他配置即可，直到他们增长到30人，他们的CEO和我说：需要独立的空间，需要老板间和财务室。于是我们迅速更新了我们的产品，我们在敞开式工位的基础上增加了独立包间、套间，后来又有一些企业和我说，即便团队只有3、4个人，他们也同样需要封闭式的小空间，他们不需要去预约大的会议室，只要在办公室中开会就可以了...他们提出了各式各样的要求，在这个过程中我们不断升级我们的产品。</span></p><p style=\"margin: 0 0 10px;text-indent: 32px;padding: 0;line-height: 150%;background: rgb(255, 255, 255)\"><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"><span style=\"font-family:宋体\">氪空间做的事情就是联合办公，为中小企业制定可以解决以上所有痛点的</span>“一站式解决方案”，充分满足他们在成长不同阶段的需求。当然，我相信产品永远是不完美的，我们还在持续进步。而每一次的升级，从表面上看是产品的更迭，实际上既是团队的锤炼，也是资本和市场的较量。</span></p><p style=\"margin: 0 0 10px;text-indent: 32px;padding: 0;line-height: 150%;background: rgb(255, 255, 255)\"><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"><span style=\"font-family:宋体\">我们的成绩与员工的开拓进取是息息相关的</span></span></p><p style=\"margin: 0 0 10px;text-indent: 32px;padding: 0;line-height: 150%;background: rgb(255, 255, 255)\"><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"><span style=\"font-family:宋体\">氪空间武汉社区的负责人每天会带两件衬衫上班，当背着书包拜访了一个又一个客户，一件衬衫早就被汗水浸透，于是，中午囫囵吃个饭后，他要换上另一件，开始见下午的客户，那个时候的他，依旧像清晨一样，装备整齐激情满满；</span></span></p><p style=\"margin: 0 0 10px;text-indent: 32px;padding: 0;line-height: 150%;background: rgb(255, 255, 255)\"><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"><span style=\"font-family:宋体\">物业拓展部的负责人肤色很黑，并且越来越黑，他调侃自己为</span>“黑社会”，但其实我们都知道，那是属于“风吹日晒”的颜色，“执行力”是他和团队的行为准则，所以在他们眼中，无所谓雾霾，无所谓黑夜，氪空间在全国10个城市有布局，他们见过这10个城市凌晨4点的样子；</span></p><p style=\"margin: 0 0 10px;text-indent: 32px;padding: 0;line-height: 150%;background: rgb(255, 255, 255)\"><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"><span style=\"font-family:宋体\">氪空间某社区的设计方案，在工程部的一位同事电脑里有</span>20个模样，这是完全不同的20版设计方案，每一次推翻方案的人都是他自己，因为对于工作有近乎完美的追求，所以他有了颠覆自我的勇气，在他们的世界里没有所谓的“最终版”，只要还有改进的空间，就可以推翻一切重新来过。</span></p><p style=\"margin: 0 0 10px;text-indent: 32px;padding: 0;line-height: 150%;background: rgb(255, 255, 255)\"><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"><span style=\"font-family:宋体\">我们在全国有</span>28座社区，每一座都承载了数不清的故事，那些难忘的笑容和泪水，让我们无比珍惜，我们的成绩属于你们——氪空间的每一个成员，“人”是2016年氪空间最大的收获。</span></p><p style=\"margin: 0px 0px 10px; text-indent: 32px; padding: 0px; line-height: 150%; background: rgb(255, 255, 255);\"><span style=\"font-family: 宋体;color: rgb(57, 57, 57);letter-spacing: 0;font-size: 16px\"><span style=\"font-family:宋体\">未来，我希望能看到人的成长，希望和越来越多的氪空间成员，一起砥砺前行！</span></span></p>";
	this.detailContent = res;
});

module.exports = State;
