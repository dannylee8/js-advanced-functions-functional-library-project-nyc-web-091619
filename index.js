const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },


    //  takes a collection, which can be an array or an object, iteratee is the call back function 
    // through which each item in the collection is passed through.
    each: function(collection, iteratee) {
      // create a new const variable (a constant reference to a value, NOT a constant value), named 
      // newCollection which is then assigned the value of the ternary expression.  The ternary 
      // expression evaluates whether the collection is an array.  If it an array, it slices the array, 
      // making a new copy of it.  If not, and it is a Javascript object, Object.values is called on
      // the collection to return an array of the "collection" objects enumerable property values.
      const newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection)

      // create a for loop, starting from index of 0, and iterating up the length of the newCollection array
      // and pass each element of the array to the "iteratee" callback frunction.  Then, return the original
      // collection.
      for (let idx = 0; idx < newCollection.length; idx++)
        iteratee(newCollection[idx])
      return collection;
    },

    // the map function takes an argument of "collection" which could be an array or a Javascript object,
    // it also takes "iteratee" as a callback function.  
    map: function(collection, iteratee) {

      // check to see if the collection is an array already, or if we need to use Object.values on a 
      // Javscript object to receive a return which is an array of enumerable property values.
      if (!(collection instanceof Array))
        collection = Object.values(collection)

        // create a new array to hold the values that we will be returning to the caller.
        const newArr = []

        // iterate through each item of the "collection" array and take the return value of the 
        // iteratee callback function and "push" (append at rear) the return value into newArr
        // .push method returns the new length of the array
        for (let idx = 0; idx < collection.length; idx++)
          newArr.push(iteratee(collection[idx]))
          
      // return the newArr array to the caller
      return newArr
    },

    // the reduce function takes 3 arguments, the first is a collection, the second is a
    // callback, the third is a starting sum.  "c" is set to an empty array as a default
    // argument.  "callback" is set to a default of an empty/do-nothing arrow function.
    reduce: function(c = [], callback = () => {}, sum) {
      // collection is set to value of c.slice(0) which is the same as above slice(), it
      // starts at array index 0 and returns a copy of the whole array 'c'
      let collection = c.slice(0)

      // if no default "sum" (starting number) is given then we set the first number to
      // the first element of the collection array.  We then .slice(1) the collection
      // array to remove the [0] element and return the rest of the array and assign it
      // to our collection variable
      if (!sum) {
        sum = collection[0]
        collection = collection.slice(1)
      }

      // count the size of collection and set it to 'length' for use in the comparision 
      // of for loop
      let length = collection.length;

      // iterate through the collection and send it to the callback function, which in 
      // this case (indexText.js) is: 
      // "callback = (acc, val, collection) => (acc + (val * 3))" 
      for (let i = 0; i < length ; i++) {
        sum = callback(sum, collection[i], collection)
      }
      return sum
    },

    // the find function takes arguments of collection and a predicate 
    // (boolean-valued function) which in this case is:
    //    function findCBGenerator(target) {
    //      return (function(currEl) { return target === currEl })
    //    }
    // "findCBGenerator" returns true when the current passed in value
    // matches the argument given to findCBGenerator when it is called.

    find: function(collection, predicate) {
      // check collection is an array or set it to the array return of
      // Object.values()
      if (!collection instanceof Array) {
        collection = Object.values(collection)
      }

      // iterate through the collection (array) and send each element
      // to the predicate (callback) function for evaluation.  If it
      // is not a match, continue iterating, if its a match, return
      // that element
      for (let i=0 ; i < collection.length; i++) {
        if (predicate(collection[i])) return collection[i]
      }

      // if nothing matches, return undefined
      return undefined
      
    },

    // same as find...
    filter: function(collection, predicate) {
      if (!collection instanceof Array) {
        collection = Object.values(collection)
      }

      // except we add an empty array to hold elements that match so
      // we can return it to the caller
      const returnArray = []

      // loop through the collection, and pass it to the callback function
      // which in this case is: (indexTest.js)
      //    function excluder(currEl) {
      //      return (currEl > 10)
      //    }
      // if there are any matches we push them to the end of the 
      // returnArray using .push method (.push returns length of new array)
      for (let i=0 ; i < collection.length; i++) {
        if (predicate(collection[i])) returnArray.push(collection[i])
      }
      // send back a list of matching elements as an array to calling function
      return returnArray
    },

    // take "collection" as and argument and use a ternary statement to evaluate 
    // whether it is an array or a Javascript object. If it is an array, use the
    // .length array method to return the number of elements in the array, if
    // it is an Object, pull out an array of its keys and count them and return
    // that number.
    size: function(collection) {
      return (collection instanceof Array) ? 
        collection.length : Object.keys(collection).length
    },

    // The function takes an argument of an array, and an optional argument of
    // how many first elements to return (e.g. fi.first(testArr, 3)) would 
    // return the first 3 elements.
    // We give a default argument of "false" to stop if no number is given.
    first: function(collection, stop=false) {
      // this ternary expression evaluates whether a second argument is given,
      // "stop", if so, slice the collection array from element [0] to the 
      // element [stop].  If there is none, just get element [0] of collection
      // and return it to the caller.
      return (stop) ? collection.slice(0, stop) : collection[0]
    }, 
    
    // same as first(), except we slice from the the array at the index of
    // [max length of the array - "start"] to the collection.length (ie. the
    // rest of the array).  If there is no "start" variable then we simply
    // subtract 1 from the length to get index of the last element of the 
    // array "collection"
    last: function(collection, start=false) {
      return (start) ? collection.slice(collection.length - start, collection.length) : collection[collection.length-1]
    },

    // Takes an argument of an array and then we set a variable that is equal to a
    // set of values that we want to eliminate from our array.
    compact: function(collection) {
      const excludableThings = new Set([false, null, 0, "", undefined, NaN])
      // then we filter the array by iterating through it and if it has one
      // of the excludableThings values in, we reject it and return the array
      // with only good values
      return collection.filter(element => !excludableThings.has(element))
    },

    // takes an array and callback.  There are different callbacks for this test
    // in indexTest.js:
    //    function sortArrFunction(val) { return val }
    //    function sortIntsBySin(val)   { return Math.sin(val) }
    //    function sortObjFunction(obj) { return obj.age }
    sortBy: function(collection, callback) {
      // here we use the "spread" operator to generate a new array and assign it
      // to our newly create const variable "returnArray" (const variables mean
      // that it is a constant reference to a value and not a constant value)
      const returnArray = [...collection]
      // we use the .sort method here, passing to the callback that was included
      // as an argument, when the sortBy() was invoked.  
      return returnArray.sort(function(a, b) {
        // they are subtracted from one another and the way .sort works is that
        // if the evaluation is:
        //      less than 0 : than 'a' comes first
        //      returns 0   : the 'a' and 'b' are unchanged in relation 
        //                    with each other but can be sorted in 
        //                    in relation to other elements
        //      returns 1   : then 'b' comes first 
        return callback(a) - callback(b)
      })
    },

    // this is a helper function for flatten, iterates through the array "arr"
    // and .push it into the "receiver" array.  This is another way to do a slice()
    // or to use a "..." (spread) operator.  Basically, we are just cloning a new 
    // array so that we can mutate it without effecting the original array
    unpack: function(receiver, arr) {
      for (let val of arr)
        receiver.push(val)
    },

    // flatten() takes 3 arguments, a collection (array), shallow (boolean) and
    // a newArray (array, with default value of empty array).  If shallow is true
    // then the function will only flatten the nested array by a single leve.
    flatten: function(collection, shallow, newArr=[]) {
      // this is another way to check if collection is an array, just like the
      // code above ("collection instanceof Array"), if its not an array we .push
      // collection into newArr to force it into an array.
      if (!Array.isArray(collection)) return newArr.push(collection)
      // if "shallow" is true (boolean) then we do just one level of flattening
      // which is done with the helper function above.  This is just like slice
      // or spread, taking the top level of elements.
      if (shallow) {
        for (let val of collection)
          // loop through collection and unpack() the first level of values,
          // the ternary evaluations checks if it is an array, if so it sends
          // it to unpack() to handle the creation of the new array.
          Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
      } else {
        // otherwise just call on this function recursively until we go through
        // each element of the collection, unpacking each level of arrays as
        // necessary
        for (let val of collection) {
          this.flatten(val, false, newArr)
        }
      }
      // send back our results!
      return newArr
    },

    // helper function for uniq which takes an array and iterates through it 
    // if its not a duplicate then add it to a new array to be returned to
    // the caller
    uniqSorted: function(collection) {
      const sorted = [collection[0]]
      for (let idx = 1; idx < collection.length; idx++) {
        if (sorted[idx-1] !== collection[idx])
          sorted.push(collection[idx])
      }
      return sorted
    },

    // takes an array, boolean and callout function. Setting the 
    // sorted boolean to false and iteratee callout to false as
    // the default
    uniq: function(collection, sorted=false, iteratee=false) {
      // if sorted is true then just sort the 
      if (sorted) {
        return fi.uniqSorted(collection, iteratee)
      } else if (!iteratee) {
        // create new array and return it
        return Array.from(new Set(collection))
      } else {
        // modify vals if iteratee is given
        const modifiedVals = new Set()
        const uniqVals = new Set()
        for (let val of collection) {
          const moddedVal = iteratee(val)
          if (!modifiedVals.has(moddedVal)) {
            modifiedVals.add(moddedVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },
    
    // return an object obj's keys by creating a new empty array and pushing
    // in the keys for it. 
    keys: function(obj) {
      // Using for loop
      const keys = []
      for (let key in obj){
        keys.push(key)
      }
      return keys
    },

    // same but for the values of each key
    values: function(obj) {
      // Using for loop
      const values = []
      for (let key in obj){
        values.push(obj[key])
      }
      return values

      // Using the custom 'map' method from above
      // return this.map(obj, (value) => value)

    },

    // return functionNames array with the names of the key (name) of each
    // function in an object
    functions: function(obj) {
      const functionNames = []

      for (let key in obj) {
        if (typeof obj[key] === "function"){
          functionNames.push(key)
        }
      }

      return functionNames.sort()
    },
  }
})()

fi.libraryMethod()
