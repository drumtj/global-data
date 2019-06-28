let ref = {};
let data = {};
let callbackList = {};

const joinKey = (dkey:string, key:string) => dkey + '_' + key;

const defineProperty = (obj, key:string, value?:any):string => {
  let dkey = createDataKey(obj);
  let ckey = joinKey(dkey, key);
  if(value !== undefined){
    data[ckey] = value;
  }

  Object.defineProperty(obj, key, {
    set: v => {
      if(callbackList[ckey]){
        callbackList[ckey](data[ckey], v);
      }
      data[ckey] = v;
    },
    get: () => data[ckey],
    enumerable: true,
    configurable: true
  });
  return obj._datakey;
}

const checkDomain = (domain:string):boolean => !(!domain || typeof domain !== "string" || domain.indexOf("..") > -1);

const createDataKey = obj => {
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

const domainSpliter = (domain:string):{dm:string; key:string} => {
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

const setPointer = (domain:string, value:any):{obj:any; key:string} => {
  if(!checkDomain(domain)){
    throw new Error("wrong domain");
  }
  let obj, key, dsp = domainSpliter(domain);
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

const createPointer = (domain:string):any => {
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

const getPointer = (domain:string):any => {
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

  static toJSON(domain:string):string{
    let obj = getPointer(domain);
    if(obj){
      return JSON.stringify(obj);
    }
    return null;
  }

  static toObject(domain:string):Object{
    let json = GlobalData.toJSON(domain);
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

  static watch(domainOrObj:string|Object, key:string, callback:(oldval:any, newval:any)=>void):Object{
    let obj, ckey;
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
        ckey = joinKey(defineProperty(obj, key), key);
      }else{
        //기존에 있는값이니 데이터 유지
        ckey = joinKey(defineProperty(obj, key, obj[key]), key);
      }
    }else{
      obj = domainOrObj;
      ckey = joinKey(defineProperty(obj, key, obj[key]), key);
    }

    callbackList[ckey] = callback;
    return obj;
  }

  static create(domain:string):any{
    return GlobalData.set(domain, {});
  }

  static set(domain:string, value:any):any{
    let obj = setPointer(domain, value);
    defineProperty(obj.obj, obj.key, value);
    return value;
  }

  static get(domain:string):any{
    return getPointer(domain);
  }
}
