let ref = {};
let data = {};
let callbackList = {};

function joinKey(dkey, key){
  return dkey + '_' + key;
}

function defineProperty(obj, key, value?){
  let dkey = createDataKey(obj);
  let ckey = joinKey(dkey, key);
  if(value !== undefined){
    data[ckey] = value;
  }

  Object.defineProperty(obj, key, {
    set: function(v){
      data[ckey] = v;
      if(callbackList[ckey]){
        callbackList[ckey](v);
      }
    },
    get: function(){
      return data[ckey];
    },
    enumerable: true,
    configurable: true
  });
  return obj._datakey;
}

function checkDomain(domain){
  if(!domain || typeof domain !== "string" || domain.indexOf("..") > -1){
    return false;
  }
  return true;
}

function createDataKey(obj){
  if(!obj._datakey){
    Object.defineProperty(obj, '_datakey', {
      value: Date.now(),
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
  return obj._datakey;
}

function domainSpliter(domain){
  let i = domain.lastIndexOf('.');
  let dm, key;
  if(i == -1){
    dm = "";
    key = domain;
  }else{
    dm = domain.substring(0, i);
    key = domain.substring(i + 1);
  }
  return {dm, key};
}


function setPointer(domain:string, value):any{
  if(!checkDomain(domain)){
    throw new Error("wrong domain");
  }
  let dsp = domainSpliter(domain);
  let obj, key;
  if(dsp.dm == ""){
    obj = ref;
  }else{
    obj = getPointer(dsp.dm);
    if(!(obj && typeof obj === "object")){
      obj = createPointer(dsp.dm);
    }
  }
  key = dsp.key;
  obj[key] = value;
  return {
    obj, key
  };
}

function createPointer(domain:string):any{
  if(domain === ""){
    //for root.  //ref
  }else if(!checkDomain(domain)){
    throw new Error("wrong domain");
  }

  let p:any = ref;
  domain.split('.').forEach(k=>{
    if(!k) return;
    if(!p[k]||typeof p[k] !== "object") p[k] = {};
    p = p[k];
  })
  return p;
}

function getPointer(domain:string):any{
  if(domain === undefined || domain === ""){
    return ref;
  }

  if(!checkDomain(domain)){
    throw new Error("wrong domain");
  }

  let i = domain.lastIndexOf('.');
  if(i == -1){
    return ref[domain];
  }

  let p = ref;
  let arr = domain.split('.');
  for(let i=0; i<arr.length; i++){
    if(!arr[i]) continue;
    if(!p[arr[i]]) return undefined;
    p = p[arr[i]];
  }
  return p;
}





export default class GlobalData {
  // static test(){
  //   console.error("data", data);
  //   console.error("ref", ref);
  //   console.error("callbackList", callbackList);
  // }
  //test
  
  static toJSON(domainOrObj){
    let obj;
    if(typeof domainOrObj === "string"){
      obj = getPointer(domainOrObj);
    }else{
      obj = domainOrObj;
    }

    if(obj){
      return JSON.stringify(obj);
    }
    return null;
  }

  static toObject(domainOrObj){
    let json = GlobalData.toJSON(domainOrObj);
    if(json){
      return JSON.parse(json);
    }
    return null;
  }

  static clearCallback(){
    // callbackList = {};
    for(let o in callbackList){
      delete callbackList[o];
    }
  }

  static clear(){
    // ref = {};
    for(let o in ref){
      delete ref[o];
    }
    for(let o in data){
      delete data[o];
    }
    GlobalData.clearCallback();
  }

  static watch(domainOrObj, key, callback){
    let obj, dkey, ckey, tobj;
    if(domainOrObj === undefined || domainOrObj == ""){
      domainOrObj = ref;
    }else if(!domainOrObj){
      throw new Error("object is null");
    }

    if(typeof domainOrObj === "string"){
      obj = getPointer(domainOrObj);
      if(obj === undefined){
        //기존에 없는값이니 생성
        obj = createPointer(domainOrObj);
        dkey = defineProperty(obj, key);
        ckey = joinKey(dkey, key);
      }else{
        //기존에 있는값이니 데이터 유지
        dkey = defineProperty(obj, key, obj[key]);
        ckey = joinKey(dkey, key);
      }
    }else{
      obj = domainOrObj;
      dkey = defineProperty(obj, key, obj[key]);
      ckey = joinKey(dkey, key);
    }

    callbackList[ckey] = callback;
    return obj;
  }

  static create(domain:string){
    return GlobalData.set(domain, {});
  }

  static set(domain:string, value){
    let obj = setPointer(domain, value);
    let dkey = defineProperty(obj.obj, obj.key, value);
    return value;
  }

  static get(domain:string){
    return getPointer(domain);
  }
}
