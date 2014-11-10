// var _ = require('underscore')

// setTimeout(function(){
// 	console.log('close');
// }, 0);
// process.nextTick(function(){
// 	console.log('nextTick...');
// });
//  console.log('start');
test

// var http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// }).listen(1337, '127.0.0.1');
// console.log('Server running at http://127.0.0.1:1337/');
// process.nextTick(function(){
// 	console.log('nextTick...');
// });

// var i = 0;
// function a(){
// 	var i = 2;
// 	i ++;
// }
// a();
// console.log(i);

// var a = 1, b = 2;
// console.log(a.concat(b));


// var a = { sku: [1,2,3]};

// console.log(a.sku);

// a.sku = _.without(a.sku, 2);

//console.log(a.sku);
// function test(a){
//     var b = [];
//     var self  = a;
// 	return function(self){
// 		b.push(a);
// 		console.log('closure: ' + b);
// 	}
// }

// var buf = test(1);
// buf();
// buf();
// buf();

// test(1)();
// test(2)();
// test(3)();


var test = {
	a : '1',
	b : '2'
}

console.log('outside:' + test.a);
for (var prop in test) {
	if(test[prop] == '1'){ test[prop] = 3; }
	console.log(test[prop]);
};


console.log(typeof({123 : '123'}));

console.log('123'.abc);