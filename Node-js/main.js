const myMap = new Map();
myMap.set("key1", "value1");
myMap.set("key2", "value2");
myMap.set("key3", "value3");
console.log(myMap); // This will log the Map object
console.log(Object.fromEntries(myMap));