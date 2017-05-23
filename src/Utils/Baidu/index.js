
const Baidu = {

     pageView:function(pageUrl){
            pageUrl = pageUrl || window.location.href;
           _hmt.push(['_trackPageview', pageUrl]);
           _hmt.push(['_trackEvent', 'nav', 'click', 'literature'])
           console.log('dfsd');
     }

}

module.exports = Baidu;