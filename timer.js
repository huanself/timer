"use strict"
/**
 * 计时器 
 */
class  _timer{

    constructor(){
        //初始化 
       this.type = 1;
       this.interval=null;
       this.timerInfo={
        starting: false,
        second: 0,
        interval: null,
        timer: "00:00:00"
       }
    }

    padLeft0(c) {
        if (c < 10) {
          return `0${c}`;
        } else {
          return c;
        }
      }

    //计算时间
    calcTimer() {
        this.timerInfo.second = parseInt(this.timerInfo.second);
        if (this.timerInfo.second == 0) {
          this.timerInfo.timer = "00：00：00";
        } else {
          if (this.timerInfo.second < 60) {
            this.timerInfo.timer = `00：00：${this.padLeft0(
              this.timerInfo.second
            )}`;
          } else if (this.timerInfo.second < 3600) {
            const mite = Math.floor(this.timerInfo.second / 60);
            const sec = this.timerInfo.second % 60;
            this.timerInfo.timer = `00：${this.padLeft0(mite)}：${this.padLeft0(
              sec
            )}`;
          } else if (this.timerInfo.second >= 3600) {
            const hour = Math.floor(this.timerInfo.second / 3600);
            let mite = 0;
            let sec = 0;
            //剩余秒
            const lessSecond = this.timerInfo.second % 3600;
            if (lessSecond < 60) {
              sec = lessSecond;
            } else {
              mite = Math.floor(lessSecond / 60);
              sec = this.timerInfo.second % 60;
            }
            this.timerInfo.timer = `${this.padLeft0(hour)}：${this.padLeft0(
              mite
            )}：${this.padLeft0(sec)}`;
          }
        }  
      }

    //1倒计时  2 正计时
    startTimer() {
        this.timerInfo.starting = true; 
        if (this.type == 1) {
          this.timerInfo.second =this.timerInfo.second == 0 ?  parseInt(this.minuteSel) * 60 + parseInt(this.secondSel) :this.timerInfo.second;
          this.interval = setInterval(() => {
            this.timerInfo.second -= 1;
            this.calcTimer();
            if (this.timerInfo.second <=0) {
              this.stop();
            }
          }, 1000);
        } else if (this.type == 2) {
          this.interval = setInterval(() => {
            this.timerInfo.second += 1;
            this.calcTimer();
            if(this.timerInfo.second>= 24*60*60){
                this.timerInfo.second = 24*60*60;
                this.pause();
            }
          }, 1000);
        }
      }

      //暂停
      pause(){
        this.timerInfo.starting = false;
        clearInterval(this.interval);
        this.interval = null;
      }

      //停止
      stop(){ 
        this.pause();
        this.timerInfo.second = 0;
      }

      /**
       * 
        计时
        parmas 1 计时类型
        parmas 2 计时秒
        parmas  3 计时分
        parmas  4  计时时
       */
      rockon(){ 
        this.timerInfo.second = arguments.length>1 ? arguments[1] : 0;
        this.type = arguments.length>0 ? arguments[0] : 1; 
        let  sec = (isNaN(arguments[1])? 0 : arguments[1] ) + (isNaN(arguments[2] )? 0 : arguments[2]*60 ) + (isNaN(arguments[3] )? 0 : arguments[3]*3600 );
        if(isNaN(sec) || sec>=24*60*60){
            this.timerInfo.timer="输入时间不正确!"
        }
        else{
        this.timerInfo.second = sec;
        this.startTimer();
        }
      }
      //开始  计时器
      start(){
        this.startTimer();
      } 


}

const  lhTimer = new _timer();
console.log(lhTimer)

export default lhTimer;