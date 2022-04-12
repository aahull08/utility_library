var _ = function(element) {
  var u = {
    last: function() {
      return element[element.length-1];
    },
    
    first: function() {
      return element[0];
    },
    
    without: function(...args){
      let newArr = [];
      element.forEach((ele) => {
        if (!args.includes(ele)){
          newArr.push(ele);
        }
      });
      return newArr;
    },
    
    lastIndexOf: function(ele){
      return element.lastIndexOf(ele);
    },
    
    sample: function(...args){
      if (args.length === 0){
        let randomeIdx =  Math.round(Math.random() * (element.length - 1));
        return element[randomeIdx];
      }
      
      let size = args[0];
      let newArr = [];
      
      while (size !== 0){
        let randomeIdx =  Math.round(Math.random() * (element.length - 1));
        newArr.push(element.splice(randomeIdx, 1)[0]);
        size -= 1;
      }
      
      return newArr;
    },
    
    //Object Collections
    objectInclude: function(smallerObj, bigObj){
      let keys = Object.keys(smallerObj);
      let keysMatch = function(key){
        return smallerObj[key] === bigObj[key];
      };
      
      if (keys.every(keysMatch)){
        return true;
      }
      
      return false;
    },
    
    findWhere: function(testObj){
      for (let i = 0; i < element.length; i += 1){
        if (this.objectInclude(testObj, element[i])){
          return element[i];
        }
      }
    },
    
    where: function(testObj){
      let newArr = [];
      for (let i = 0; i < element.length; i += 1){
        if (this.objectInclude(testObj, element[i])){
          newArr.push(element[i]);
        }
      }
      return newArr;
    },
    
    pluck: function(key){
      let newArr = [];
      for (let i = 0; i < element.length; i += 1){
        if (element[i][key]){
          newArr.push(element[i][key]);
        }
      }
      return newArr;
    },
    
    keys: function(){
      return Object.keys(element);
    },
    
    values: function(){
      let newArr = [];
      for (let key in element){
        newArr.push(element[key]);
      }
      return newArr;
    },
    
    pick: function(...args){
      let newObj = {};
      
      args.forEach((key) => {
        if(Object.keys(element).includes(key)){
          newObj[key] = element[key];
        }
      });
      
      return newObj;
    },
    
    omit: function(...args){
      let newObj = {};
      
      for (let key in element){
        if (!args.includes(key)){
          newObj[key] = element[key];
        }
      }
      
      return newObj;
    },
    
    has: function(prop){
      return Object.keys(element).includes(prop);
    }
    
  };
  
  (["isElement", "isArray", "isObject", "isFunction",
  "isString", "isBoolean", "isNumber"]).forEach(function(method){
    u[method] = function() { _[method].call(u, element); };
  });
  
  _.range = function(...args){
    let newArr = [];
    let first;
    let last;
    
    if (args.length === 1){
      first = 0;
      last = args[0];
    } else {
      first = args[0];
      last = args[1];
    }
    
    while(first < last){
      newArr.push(first);
      first += 1;
    }
    
    return newArr;
  };
  
  _.extend = function(...args){
      while (args.length > 1){
        let poppedObj = args.pop();
        for (let key in poppedObj){
          args[args.length - 1][key] = poppedObj[key];
        }
      }
      return args[0];
    };

  
  _.isElement = function(obj){
    return obj && obj.nodeType === 1;
  };
  
  _.isArray = Array.isArray || function(obj){
    return toString.call(obj) === "[object Array]";
  };
  
  _.isObject = function(obj){
    let type = typeof obj;
    return type === "function" || type === "object" && !!obj;
  };
  
  _.isFunction = function(obj){
    return typeof obj === "function";
  };
  
  _.isString = function(obj){
    return toString.call(obj) === "[object String]";
  };
  
  _.isBoolean = function(obj){
    return toString.call(obj) === "[object Boolean]";
  };
  
  _.isNumber = function(obj){
    return toString.call(obj) === "[object Number]";
  };
  
  return u;
};

// console.log(_([1, 2, 3, 4]).sample());