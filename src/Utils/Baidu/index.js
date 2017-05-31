
const Baidu = {

     pageView:function(pageUrl){
            pageUrl = pageUrl || window.location.href;
           window._hmt && window._hmt.push(['_trackPageview', pageUrl]);
     },
     trackEvent:function(category, action, opt_label, opt_value){

           category = category || '';
           action = action || '';
           opt_label = opt_label || '';
           opt_value = opt_value || '';

          window._hmt && window._hmt.push(['_trackEvent', category, action, opt_label,opt_value])
     }

}

module.exports = Baidu;