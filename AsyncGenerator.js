class MyAsyncGenerator{
    constructor(callback){
      this.res = ()=>{}
      callback(this.nextFun,this.ReturnFun,this.errorFun);    
    }
    [Symbol.asyncIterator]() {
      return this
    }
    Returned = false;
    next() {
        if(this.Returned)
          return {dome:true};
        return new Promise((res,rej)=>{this.res= res,this.rej = rej})
    }
    nextFun=(value)=>{
        this.res({value,done:false})
    }
    ReturnFun=(value)=>{
        this.Returned = true;
        this.res({value,done:true})
    }
    errorFun=(err)=>{
        this.rej(err)
    }
  }
   function interval(While,everyMs){
    let index =-1
    return new MyAsyncGenerator((Next,Return,Throw)=>{
      const intervalId = setInterval(()=>{
      index++;
      if(!While()){
        Return(index); 
        return clearInterval(intervalId);
      }
      Next(index);
    } ,everyMs);
    })
  } 
const ff = async () => {
    let x = 3;
    const int = interval(()=>x--,1000)
    int.next()
    int.next()
    int.next()
    for await (const iterator of int) {
      console.log(iterator)
    } 
  }
  ff
