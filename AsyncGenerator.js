class MyAsyncGenerator{
  #res = ()=>({value:null,done:true})
  #rej = (e)=>{throw e} 
  constructor(callback){
      const nextFun=(value)=>{
          this.#res({value,done:false})
        }
      const ReturnFun=(value)=>{
          this.#Returned = true;
          this.#res({value,done:true})
      }
      const errorFun=(err)=>{
          this.#rej(err)
      } 
      this.next();
      callback(nextFun,ReturnFun,errorFun);    
    }
    [Symbol.asyncIterator]() {
      return this;
    }
    #Returned = false;
    next() {
        if(this.#Returned)
          return {dome:true};
        return new Promise((res,rej)=>{this.#res= res,this.#rej = rej})
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
    const n = await int.next();
    n.next();
    for await (const iterator of int) {
      console.log(iterator)
    } 
  }
  ff
