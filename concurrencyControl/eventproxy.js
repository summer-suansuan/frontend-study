var EventProxy = require('eventproxy');
var http = require('http');

const most = 5;//并发数5

var urllist = [];
for(var i = 0; i < 20; i++){
    urllist.push('http://www.baidu.com/s?wd=' + i);
}

function foo(start){
    var ep = new EventProxy();
    ep.after('ok', most, function(){
        foo(start + most);//一个批次任务完成，递归进行下一批任务
    });
    var q = 0;
    for(var i= start; i < urllist.length; i++){
        if(q >= most){
            break;//最多添加most个任务
        }
        http.get(urllist[i],function(res){
            res.on('data', function(){return ;});
            res.on('end',function(){
                ep.emit('ok');//一个任务完成，触发一次ok事件
            });
        });
        q++;
    }
}
foo(0);