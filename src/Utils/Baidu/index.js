
const Baidu = {

     pageView:function(pageUrl){
            pageUrl = pageUrl || window.location.href;
           _hmt.push(['_trackPageview', pageURL]);
     }

}

module.exports = Baidu;