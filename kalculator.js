(function(){
  var
    //monitor
    monitor_functions = document.getElementById('monitor_functions'),
    monitor_numbers =  document.getElementById('monitor_numbers'),
    //buttons of function
    btn_clear =  document.getElementById('btn_clear'),
    btn_posiNega =  document.getElementById('btn_posiNega'),
    btn_division =  document.getElementById('btn_division'),
    btn_multiply =  document.getElementById('btn_multiply'),
    btn_minus =  document.getElementById('btn_minus'),
    btn_plus =  document.getElementById('btn_plus'),
    btn_equal =  document.getElementById('btn_equal'),
    //buttons of number
    btn_1 =  document.getElementById('btn_1'),
    btn_2 =  document.getElementById('btn_2'),
    btn_3 =  document.getElementById('btn_3'),
    btn_4 =  document.getElementById('btn_4'),
    btn_5 =  document.getElementById('btn_5'),
    btn_6 =  document.getElementById('btn_6'),
    btn_7 =  document.getElementById('btn_7'),
    btn_8 =  document.getElementById('btn_8'),
    btn_9 =  document.getElementById('btn_9'),
    btn_0 =  document.getElementById('btn_0'),
    btn_dot =  document.getElementById('btn_dot'),

    //ディスプレに表示する数字
    number_displayed = '',
    //計算する数字のキャッシュ
    number_cache = [],
    //0:四則計算ボタンを押してない　1:四則計算ボタンを押した
    operation = '',
    //計算結果
    result = '',
    //1:equalを押したとき
    equal_flg = 0,
    //0:数字を連続して入力する　1:上書き
    number_flg = 0,
    // (+/-)を押したとき
    posiNega_flg = 0,
    //最大桁数
    max = 15
  ;

  /*
  *1〜9の数字を押したときのメソッド
  */
  function inputBasic(arg){
    //イコールを押した直後の処理
    if(equal_flg === 1){
      clearAll();
    }
    // (+/-)を押した直後は数字を上書きする
    if(posiNega_flg === 1){
      number_flg = 1;
    }
    //number_flgが0なら連続入力1なら上書きする
    if(number_flg !== 0){ //上書き処理
      number_displayed = arg;
      number_flg = 0;
      posiNega_flg = 0;
    } else { //連続入力
      if (number_displayed !== '0') { //number_displayedが0以外なら連続入力
        number_displayed += arg;
        number_flg = 0;
      }else { //number_displayedが0なら上書き
        number_displayed = arg;
        number_flg = 0;
      }
    }
    returnNumber();
  }

  /*
  *0を押したときのメソッド
  */
  function inputZero(arg){
    //イコールを押した直後の処理
    if(equal_flg === 1){
      clearAll();
    }
    // (+/-)を押した直後は数字を上書きする
    if(posiNega_flg === 1){
      number_displayed = arg;
      returnNumber();
      posiNega_flg = 0;
    }
    //number_displayedが0以外の場合に連続入力
    if(number_displayed !== '0'){
      number_displayed += arg;
      returnNumber();
    }
  }

  /*
  *dotを押したときのメソッド
  */
  function inputDot(arg){
    //イコールを押した直後は何もしない
    if(equal_flg !== 1){
      // (+/-)を押した直後は何もしない
      if(posiNega_flg !== 1){
        //number_displayedに既に'.'がない場合'.'を入れる
        if(number_displayed !== '' && number_displayed.indexOf('.') === -1){
          //number_displayedの先頭が'.'にならないようにする
          if(number_displayed !== '.'){
            number_displayed += arg;
            returnNumber();
            number_flg = 0;
          }
        }
      }
    }
  }

  /*
  * (+/-)を押したときのメソッド
  */
  function input_posiNega(){
    //イコールを押した直後の処理
    if(equal_flg === 1){
      clearAll();
      number_displayed = result;
      returnNumber();
    }
    // (+/-)を切り替えるてキャッシュする
    if(number_displayed !== ''){
      number_displayed = String(number_displayed);
      if(number_displayed.charAt(0) !== '-'){
        number_displayed = '-' + number_displayed
      }　else {
        number_displayed = number_displayed.slice(1);
      }
      returnNumber();
      posiNega_flg = 1;
    }
  }

  /*
  * clearを押したときのメソッド
  */
  function input_clear(){
    clearAll();
  }

  /*
  * equalを押したときのメソッド
  */
  function input_equal(){
    if(number_displayed !== '' && operation !== ''){
      number_cache.push(parseFloat(number_displayed));
      calculation();
      monitor_functions.innerHTML = '';
      equal_flg = 1;
    }
  }

  /*
  * 四則計算ボタンを押したときのメソッド
  */
  function arithmetic(arg){
    var mark = arg;
      if(equal_flg === 1){
        number_flg = 1;
        monitor_functions.innerHTML = mark;
        equal_flg = 0;
        operation = mark;
      } else {
        if(number_displayed !== ''){
          number_flg = 1;
          monitor_functions.innerHTML = mark;
          number_cache.push(parseFloat(number_displayed));
          number_displayed = '';
          if(operation !== ''){
            calculation();
          }
          operation = mark;
        }
      }
  }

  /*
  * 計算メソッド
  */
  function calculation(){
    if(operation === '+'){
      result = number_cache[0] + number_cache[1];
    } else if(operation === '-'){
      result = number_cache[0] - number_cache[1];
    } else if(operation === '*'){
      result = number_cache[0] * number_cache[1];
    } else if(operation === '/'){
      result = number_cache[0] / number_cache[1];
    }
      monitor_numbers.innerHTML = result;
      number_cache.splice(0,2);
      number_cache.push(parseFloat(result));
      posiNega_flg = 0;
  }

  /*
  * クリアメソッド
  */
  function clearAll(){
    number_displayed = '';
    operation = '';
    number_flg = 0;
    equal_flg = 0;
    posiNega_flg = 0;
    monitor_functions.innerHTML = operation;
    number_cache.splice(0,2);
    returnNumber();
  }

  /*
  * 数字を表示させる（桁数制限あり）メソッド
  */
  function returnNumber(){
    if(number_displayed.length < max){
      monitor_numbers.innerHTML = number_displayed;
      monitor_numbers.style.background = '#ffffff'
    } else {
      monitor_numbers.style.background = '#ff0000'
    }
  }

  /*
  * ボタンを押したときの各変数
  */
  function input_1(){inputBasic('1');}
  function input_2(){inputBasic('2');}
  function input_3(){inputBasic('3');}
  function input_4(){inputBasic('4');}
  function input_5(){inputBasic('5');}
  function input_6(){inputBasic('6');}
  function input_7(){inputBasic('7');}
  function input_8(){inputBasic('8');}
  function input_9(){inputBasic('9');}
  function input_0(){inputZero('0');}
  function input_dot(){inputDot('.');}

  function input_plus(){arithmetic('+');}
  function input_minus(){arithmetic('-');}
  function input_division(){arithmetic('/');}
  function input_multiply(){arithmetic('*');}

  /*
  * イベント登録
  */
  btn_1.addEventListener('click',input_1,false);
  btn_2.addEventListener('click',input_2,false);
  btn_3.addEventListener('click',input_3,false);
  btn_4.addEventListener('click',input_4,false);
  btn_5.addEventListener('click',input_5,false);
  btn_6.addEventListener('click',input_6,false);
  btn_7.addEventListener('click',input_7,false);
  btn_8.addEventListener('click',input_8,false);
  btn_9.addEventListener('click',input_9,false);
  btn_0.addEventListener('click',input_0,false);
  btn_dot.addEventListener('click',input_dot,false);

  btn_clear.addEventListener('click',input_clear,false);
  btn_plus.addEventListener('click',input_plus,false);
  btn_minus.addEventListener('click',input_minus,false);
  btn_equal.addEventListener('click',input_equal,false);
  btn_division.addEventListener('click',input_division,false);
  btn_multiply.addEventListener('click',input_multiply,false);
  btn_posiNega.addEventListener('click',input_posiNega,false);

  /*
  * ロード時に初期化
  */
  clearAll();

// console.log(number_displayed);
// console.log(number_cache);
// console.log(operation);
// console.log(result);
// console.log(equal_flg);
// console.log(number_flg);

})();