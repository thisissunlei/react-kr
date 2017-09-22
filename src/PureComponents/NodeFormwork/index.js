import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import $ from 'jquery';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
  Message
} from 'kr-ui';
import './index.less';
export default class NodeFormwork extends Component{

	constructor(props){
		super(props);
		this.state={
			showSection:false
		}

	}
	componentDidMount(){
		var config={
			contextMenu:[
				{lable:'删除表格',
					cmdName:'deletetable'
				},
				{
					lable:'',
					cmdName:'insertcaption'
				},
				{    lable:'',
					cmdName:'inserttitle'
				},
	  
				{    lable:'',
					cmdName:'inserttitlecol'
				},
				{    lable:'',
					cmdName:'mergeright'
				},
				{    lable:'',
					cmdName:'mergedown'
				},
				{
					lable:'',
					cmdName:'insertrow'
				},
				{
					lable:'',
					cmdName:'insertrownext'
				},
				  {
					  label:'隐藏',
					  cmdName:'hiden'
				  },
				  {
					  label:'显示',
					  cmdName:'show'
				  },
				  {
					  label:'编辑',
					  cmdName:'editor'
				  },
				  {
					  label:'只读',
					  cmdName:'readonly'
				  },
				  {
					  label:'必填',
					  cmdName:'mustwrite'
				  },
				  {
					  label:'非必填',
					  cmdName:'orwrite'
				  }
	  
			 ]
		  };
		  var ue = UE.getEditor('container',config,{
            initialFrameWidth :'',
			initialFrameHeight: '502',		
		  });
			 var editor=new UE.Editor();
			 $('.span-list-all').on('dblclick',function(){
				
					});
					var ue = UE.getEditor('container',config);
					   var editor=new UE.Editor();
					   $('#insert-bnt').on('click',function () {
						   ue.execCommand('insertHtml',$('#kr-text').val());
						   $('.insert-cachet').hide();
					   });
				
					var flag1=true;
					var flag2=true;
					var flag3=true;
					var flag4=true;
					var flag5=true;
					   $('.span-list-1').on('dblclick',function (event) {
						   var that=this;
						   if(flag1){
							   ue.execCommand( 'insertimage', [{
								   src:'themes/default/images/2e.png',
								   width:'20px',
								   height:'20px'
							   }]);
							   ue.execCommand('insertHtml','<p></p>'+$(this).text()+'</p>');
							   flag1=!flag1;
							   flag5=false;
							   console.log(flag5);
						   }
						   $(this).css({
							   'background':'red'
						   });
				
						   var Otd=ue.selection.getStart();
							   console.log(Otd);
						   $(Otd).css({
							   'position':'relative'
						   });
						   $(Otd).children('p').css({
							   'position':'absolute',
							   'left':'7%',
							   'right':'7%',
							   'top':'5%',
							   'bottom':'5%'
				
						   });
						   var flag6=true;
						   $(Otd).children('p').on('click',function () {
				
							   $('.span-list-fields').attr({
								   'show':'none'
							   });
							   var _this=this;
							   if(flag6){
								   $(this).css({
									   'borderWidth':'3px',
									   'borderStyle':'solid',
									   'borderColor':'blue'
								   });
							   }else {
								   $(this).css({
									   'borderWidth':'0',
									   'borderStyle':'none',
									   'borderColor':'none'
								   });
								   ue.removeListener('keydown')
							   }
							   flag6=!flag6;
							   flag5=false;
								  console.log(flag5);
								   ue.addListener('blur',function(editor){
									   $(Otd).children('p').css({
										   'borderWidth':'0',
										   'borderStyle':'none',
										   'borderColor':'none'
									   });
				
								   });
								  ue.addListener('keydown',function (event,Cold) {
				
									 if(Cold.key=='Backspace'){
										  if($(_this).css('borderStyle')=='solid'){
											  $(Otd).html({
												  'display':'none'
											  });
											  $(_this).css({
												  'borderStyle':'none'
											  });
											  flag1=true;
				
											  $(that).css({
												  'background':'blue'
											  });
										  }
				
				
									 }
								  });
				
						   });
				
					   });
				
					$('.span-list-2').on('dblclick',function (event) {
						  $(this).attr({
							  'show':'isShow'
						  });
						var that=this;
				
						if(flag2){
							ue.execCommand( 'insertimage', [{
								src:'themes/default/images/2e.png',
								width:'20px',
								height:'20px'
							}]);
							ue.execCommand('insertHtml','<p></p>'+$(this).text()+'</p>');
							flag2=!flag2;
						}
						flag5=false;
						console.log(flag5);
						$(this).css({
							'background':'red'
						});
				
						var Otd=ue.selection.getStart();
						console.log(Otd);
						$(Otd).css({
							'position':'relative'
						});
						$(Otd).children('p').css({
							'position':'absolute',
							'left':'7%',
							'right':'7%',
							'top':'5%',
							'bottom':'5%'
				
						});
						var flag6=true;
						$(Otd).children('p').on('click',function () {
				
							$(that).attr({
								'show':'isShow'
							});
							var _this=this;
							if(flag6){
								$(this).css({
									'borderWidth':'3px',
									'borderStyle':'solid',
									'borderColor':'blue'
								});
							}else {
								$(this).css({
									'borderWidth':'0',
									'borderStyle':'none',
									'borderColor':'none'
								});
								ue.removeListener('keydown')
							}
						   flag6=!flag6;
							flag5=false;
							console.log(flag5);
							ue.addListener('blur',function(editor){
								$(Otd).children('p').css({
									'borderWidth':'0',
									'borderStyle':'none',
									'borderColor':'none'
								});
				
							});
							ue.addListener('keydown',function (event,Cold) {
				
								if(Cold.key=='Backspace'){
									if($(_this).css('borderStyle')=='solid'){
										$(that).attr({
											'show':'none'
										});
										$(_this).css({
											'borderStyle':'none'
										});
										flag2=true;
										$(Otd).html({
											'display':'none'
										});
										$(that).css({
											'background':'blue'
										});
									}
				
				
								}
							});
						});
				
					});
					$('.span-list-3').on('dblclick',function (event) {
				
				
						var that=this;
				
						if(flag3){
							ue.execCommand( 'insertimage', [{
								src:'themes/default/images/2e.png',
								width:'20px',
								height:'20px'
							}]);
							ue.execCommand('insertHtml','<p></p>'+$(this).text()+'</p>');
							flag3=!flag3;
							flag5=false;
							console.log(flag5);
						}
						$(this).css({
							'background':'red'
						});
				
						var Otd=ue.selection.getStart();
						console.log(Otd);
						$(Otd).css({
							'position':'relative'
						});
						$(Otd).children('p').css({
							'position':'absolute',
							'left':'7%',
							'right':'7%',
							'top':'5%',
							'bottom':'5%'
				
						});
						var flag6=true;
						
						$(Otd).children('p').on('click',function () {
				
							$('.span-list-fields').attr({
								'show':'none'
							});
							var _this=this;
							if(flag6){
								$(this).css({
									'borderWidth':'3px',
									'borderStyle':'solid',
									'borderColor':'blue'
								});
							}else {
								$(this).css({
									'borderWidth':'0',
									'borderStyle':'none',
									'borderColor':'none'
								});
								ue.removeListener('keydown')
							}
							flag6=!flag6;
							flag5=false;
							console.log(flag5);
							ue.addListener('blur',function(editor){
								$(Otd).children('p').css({
									'borderWidth':'0',
									'borderStyle':'none',
									'borderColor':'none'
								});
				
							});
							ue.addListener('keydown',function (event,Cold) {
								if(Cold.key=='Backspace'){
									if($(_this).css('borderStyle')=='solid'){
										$(_this).css({
											'borderStyle':'none',
										});
										console.log($(_this).css('borderStyle'));
										flag3=true;
										$(Otd).html({
											'display':'none'
										});
										$(that).css({
											'background':'blue'
										});
				
									}
				
								}
							});
						});
				
					});
					$('.span-list-4').on('dblclick',function (event) {
				
						$('.span-list-fields').attr({
							'show':'isShow'
						});
						var that=this;
				
						if(flag4){
							ue.execCommand( 'insertimage', [{
								src:'themes/default/images/2e.png',
								width:'20px',
								height:'20px'
							}]);
							ue.execCommand('insertHtml','<p></p>'+$(this).text()+'</p>');
							flag4=!flag4;
							flag5=false;
							console.log(flag5);
						}
						$(this).css({
							'background':'red'
						});
				
						var Otd=ue.selection.getStart();
						console.log(Otd);
						$(Otd).css({
							'position':'relative'
						});
						$(Otd).children('p').css({
							'position':'absolute',
							'left':'7%',
							'right':'7%',
							'top':'5%',
							'bottom':'5%'
				
						});
						var flag6=true;
						$(Otd).children('p').on('click',function () {
				
							$('.span-list-fields').attr({
								'show':'isShow'
							});
							var _this=this;
							if(flag6){
								$(this).css({
									'borderWidth':'3px',
									'borderStyle':'solid',
									'borderColor':'blue'
								});
							}else {
								$(this).css({
									'borderWidth':'0',
									'borderStyle':'none',
									'borderColor':'none'
								});
								ue.removeListener('keydown')
							}
							flag6=!flag6;
							flag5=false;
							console.log(flag5);
							ue.addListener('blur',function(editor){
								$(Otd).children('p').css({
									'borderWidth':'0',
									'borderStyle':'none',
									'borderColor':'none'
								});
				
							});
				
							ue.addListener('keydown',function (event,Cold) {
								if(Cold.key=='Backspace'){
									$(that).attr({
										'show':'none'
									});
									if($(_this).css('borderStyle')=='solid'){
										$(_this).css({
											'borderStyle':'none',
										});
										flag4=true;
										$(Otd).html({
											'display':'none'
										});
										$(that).css({
											'background':'blue'
										});
									}
								}
							});
						});
				
					});
					$('.confirm').on('click',function () {
						   alert(ue.getContent())
				
					});
			
	}
	render(){
		return (
			<div className="node-formwork">
				<div className="textbox-top">
                  <span>新建模板-html模式</span>
                  <div className="kr-top">
                       <span><button className="confirm">确认</button></span>
                        <span><button className="save">取消</button></span>
                  </div>
                </div>
				<div className="container-right">
				<div className="field-lable-container">
        <div className="field-lable">
            <span>标签</span>
            <span>字段</span>
        </div>
        <div className="kr-list">
            <span className="span-list-1 psan-list-tag span-list-all">请假人</span>
            <span className="span-list-2 span-list-fields span-list-all">李四</span>
	     
        </div>
        <div className="kr-list">
            <span className="span-list-3 psan-list-tag span-list-all">请假部门</span>
            <span className="span-list-4 span-list-fields span-list-all">技术部</span>
        </div>
    </div>
				</div>
				 <script id="container" name="content" type="text/plain">
			  <table>
    <tbody>
        <tr className="firstRow" name='td1'>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
        </tr>
        <tr>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
        </tr>
        <tr >
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
        </tr>
        <tr>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
        </tr>
        <tr >
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
        </tr>
        <tr>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
        </tr>
        <tr >
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
        </tr>
        <tr >
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
        </tr>
        <tr >
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
            <td width="97" valign="top"></td>
        </tr>
    </tbody>
</table>
<p>
    <br/>
</p>
 </script>
	 </div>
		);
	}
}

