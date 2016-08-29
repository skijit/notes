Max Dictionaries
================

- Analogous to javascript objects
- Dictionaries have names which live in the global namespace
    - Explicitly name the dict with an argument
    - Or they will have a name generated under the hood when you perform certain actions.
- Reference a Dictionary with **dict**
    - Dynamic
        - Pass a message "dictionary dictName" into a dict object and the name will reference that dict
        - use a 'read' message with a reference to a filename
    - Static
        - Explicitly name the dictionary with an argument
        - Use a filename which is either JSON or YAML
- Passing dicts around:
    - Passing by value:
        - When you bang on a dict, it outputs "dictionary dictName"
        - This gets intput into another dict object, which makes its own copy of the data (ie clone)
        - Just like Jitter matrices in this regard
    - Passing by reference:
        - The only way to pass by reference is to name 2 dicts statically, via argument! 
- Dictionary Syntax is the stringification of a dicionary into it's key/value pairs, using a colon delimeter (:)
    - Ex: ```pig1 : straw pig2 : sticks pig3 : bricks```
    - This is useful for...
        - **dict.serialize** and **dict.deserialize**, which could be useful when using **udpsend** and **udpreceive**
        - **dict.pack** : you specify in arguments the keys you want and it will create a dictionary with those keys, a system-generated name, and inlets corresponding to each key, so you can set values separately.
        - **dict.unpack** : same as **dict.pack** except that it will send each value from a corresponding outlet.
        - **dict.route** : you set one or many k/v pairs (either in Dictionary syntax) or passing the whole dictionary in the right inlet.  Then if dictionary on the left inlet has to have those same k/v's, output dictname on the left outlet, otherwise use the right outlet. 
- Using a dictionary in javascript.
    - Use the ```Dict``` object:
    ```(javascript)
    var d1 = new Dict("ark");
    var d2 = new Dict;

    var name = d2.name;
    post("The second Dict is named", name);```    
    - The following methods are supported on a ```Dict``` :
        - getnames(): returns a list of all dictionary names currently in use in the environment
		- getkeys(): returns a list of all keys in the dictionary
		- get("foo"): return the value associated with the key named "foo"
		- set("foo", "bar"): for the key "foo", set the value to "bar"
		- push_to_coll("a_coll"): export the contents of the dictionary to a coll object named "a_coll"
		- pull_from_coll("another_coll"): import the contents of a coll object named "another_coll" into this dictionary
		- export_json("filename.json"): export the contents of the dictionary to a file in the JSON format
		- import_json("filename.json"): import a JSON file named "filename.json" into this dictionary            
- Traversing dict properties
    - **dict.iter** will traverse through each top-level key value pair.  
        - Often connected to a ***print***, ***zl.slice***, or ***regexp** objects
    - Viewing contents (including deep structure):
        - Double-clicking on a dict will display it in a new window as JSON.              
        - **dict.view** will drop all the data into a panel when it gets a ```dictionary <dictName>``` message.            
- Programmatically getting/setting values:
    - See POTD3 (dict.datastructures) for examples
    - Getting
        - You can use message boxes such as below to get key values or types or all keys:
            - ```get a-number```
            - ```gettype a-number```
            - ```get array-data```
            - ```get array-data[3]```
            - ```getkeys```
            - Getting Nested Dictionaries...
            - ```get dumpster::field-a```
            - ```gettype dumpster```  (will return 'dictionary')
            - ```get dumpster``` (if dumpster is a dictionary, will return something like 'dictionary ua1235454')
    - Setting
        - You can use message boxes such as below to set key values:
            - ```set basic-number 115```
            - ```set basic-float 112.25```
            - ```set basic-symbol labrador```
            - ```set list-data 14 fred moxie```
            - ```set array-data[] 0 1 2 3 4```
            - Setting Nested Dictionaries, use ```replace``` and the ```::``` separator:
                - ```replace dict-data::myInt 1```
                - ```replace dict-data::mySymbol inane```
- Data Persistence
    - You can load and save dict data from a file (see PTOD2 - dict.filesaves)
    - You can use the embed (=1) attribute to save the data with the patcher
        
    
### Dictionaries POTD Thread
- [Thread](https://cycling74.com/forums/topic/dictionary-patch-of-the-day-potd-thread/) from Max/MSP Forums
- Patch One: dict.nameshare
    - You can share the same dict across all boundaries: patch, subpatch, abstraction, bpatcher, etc.
- Patch Two: dict.filesaves
    - You can load a dict from a file or export it to another file (with export message)
    - using the **closebang** object you can force the system to save the contents of the dictionary when you close the patcher file.
- Patch Three: dict.datastructures
 