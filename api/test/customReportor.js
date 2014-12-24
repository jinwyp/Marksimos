module.exports = {
    jasmineStarted: function(suiteInfo) {
        console.log('测试数目: ' + suiteInfo.totalSpecsDefined);
    },
    suiteStarted: function(result) {
        console.log('开始: '+ result.fullName);
    },
    specStarted: function(result) {
        console.log('用例开始: ' + result.description + '  :  ' + result.fullName);
    },
    specDone: function(result) {
        console.log(result.description + '  :  ' + result.status);
        for (var i = 0; i < result.failedExpectations.length; i++) {
            console.log('失败: ' + result.failedExpectations[i].message);
            console.log(result.failedExpectations[i].stack);
        }
    },
    suiteDone: function(result) {

        console.log(result.description + '  :  ' + result.status);
        if (result.failedExpectations) {
            for (var i = 0; i < result.failedExpectations.length; i++) {
                console.log('总结:' + result.failedExpectations[i].message);
                console.log(result.failedExpectations[i].stack);
            }
        }
    },
    jasmineDone: function() {
        console.log('结束');
    }
};