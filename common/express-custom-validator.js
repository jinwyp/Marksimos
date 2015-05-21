module.exports = (function() {
    function _between(value, min, max, option) {
        switch (option) {
            //不包括大于那边的等于
            case "g":
                return (value > min && value <= max);
                //不包括小于那边的等于
            case "l":
                return (value >= min && value < max);
                //不包括等于
            case "gl":
            case "lg":
                return (value > min && value < max);
            default:
                return (value >= min && value <= max);
        }
    }
    function _minMax(num1, num2) {
        var min, max;
        if (num1 > num2) {
            min = num2;
            max = num1;
        }
        else {
            min = num1;
            max = num2;
        }
        return { min: min, max: max };
    }
    function _toBeInt(value) {       
        return value << 0 === value;
    }
    //是整数或者是能转换成整数的数字
    function _isEqualInt(value) {
        return value << 0 == value
    }
    return {
        //判断是否为数组
        isArray: function(value) {
            return Array.isArray(value);
        },
        //判断是否为指定长度的数组
        isArrayLen: function(value, num) {
            if (!Array.isArray(value)) {
                return false;
            }
            return value.length === num;
        },
        //等于
        equal: function(value,num) {
            return value == num;
        },
        toBe: function(value, num) {
            return value === num;
        },
        //大于
        gt: function(value, num) {
            return value > num;
        },
        //大于等于
        gte: function(value, num) {
            return value >= num;
        },
        //小于
        lt: function(value, num) {
            return value < num
        },
        //小于等于
        lte: function(value, num) {
            return value <= num;
        },
        //包括两边等于
        between: function(value, num1, num2, option) {           
            var minMax = _minMax(num1, num2);
            return _between(value, minMax.min, minMax.max,option);
        },
        //数据所有元素都包括在两数之间
        eachBetween: function(value, num1, num2, option) {          
            var minMax = _minMax(num1, num2);
            if (value) {
                for (var i = 0; i < value.length; i++) {
                    if (!_between(value[i], minMax.min, minMax.max, option)) {                      
                        return false;
                    }
                }
            }           
            return true;
        },
        //是否全部为整数,严格
        eachInt: function(value) {
            if (value) {
                for (var i = 0; i < value.length; i++) {
                    if (!_toBeInt(value[i])) {
                        return false;
                    }
                }
            }
            return true;
        },
        //是否全部为整数，非严格
        eachEqualInt: function(value) {
            if (value) {
                for (var i = 0; i < value.length; i++) {
                    if (!_isEqualInt(value[i])) {
                        return false;
                    }
                }
            }
            return true;
        }
    };
})();

