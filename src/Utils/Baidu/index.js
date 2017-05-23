
const Baidu = {

     pageView:function(pageUrl){
            pageUrl = pageUrl || window.location.href;
           _hmt.push(['_trackPageview', pageUrl]);
     }

}

module.exports = Baidu;