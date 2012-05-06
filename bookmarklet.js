javascript:window.bookmarklet=function(opts){fullFunc(opts)};window.bookmarklet({js:['https://raw.github.com/adamschwartz/threedeeworld/master/jquery.threeDeeWorld.js'],ready:function(){
    $('body').threeDeeWorld({
        worldSelector: 'body > div:first',
        threeDeeSelector: '*:not(:has(*))',
        clickAnimationTypes: ['li, a, img, td']
    });
}});
function fullFunc(a){function d(b){if(b.length===0){a.ready();return false}$.getScript(b[0],function(){d(b.slice(1))})}function e(b){$.each(b,function(c,f){$("<link>").attr({href:f,rel:"stylesheet"}).appendTo("head")})}a.jqpath=a.jqpath||"http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js";(function(b){var c=document.createElement("script");c.type="text/javascript";c.src=b;c.onload=function(){e(a.css);d(a.js)};document.body.appendChild(c)})(a.jqpath)};