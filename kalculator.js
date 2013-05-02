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
    //0:四則計算ボタンを押てない　1:四則計算ボタンを押した
    operation = '',
    //計算結果
    result = ''
    //1:equalを押したとき
    equal_flg = 0;
    //0:数字を連続して入力する　1:上書き
    number_flg = 0;
  ;

  //1〜9の数字を押したときのメソッド
  function inputBasic(arg){
    if(equal_flg == 1){
      clearAll();
    }
    if(number_flg !== 0){
      number_displayed = arg;
      number_flg = 0;
    } else {
      //number_displayedが0なら上書き
      if (number_displayed !== '0') {
        number_displayed += arg;
        number_flg = 0;
      }else {
        number_displayed = arg;
        number_flg = 0;
      }
    }
    monitor_numbers.innerHTML = number_displayed;
  }

  //0を押したときのメソッド
  function inputZero(arg){
    if(equal_flg == 1){
      clearAll();
    }
    if(number_displayed !== '0'){
      number_displayed += arg;
      monitor_numbers.innerHTML = number_displayed;
    }
  }

  //dotを押したときのメソッド
  function inputDot(arg){
    if(equal_flg == 1){
      clearAll();
    }
    if(number_displayed !== '' && number_displayed.indexOf('.') == -1){
      if(number_displayed !== '.'){
        number_displayed += arg;
        monitor_numbers.innerHTML = number_displayed;
        number_flg = 0;
      }
    }
  }

  // (+/-)を押したときのメソッド
  function input_posiNega(){
  if(equal_flg == 1){
    clearAll();
    number_displayed = result;
    monitor_numbers.innerHTML = number_displayed;
    }

    if(number_displayed !== ''){
      number_displayed = String(number_displayed);
      if(number_displayed.charAt(0) !== '-'){
        number_displayed = '-' + number_displayed
      }　else {
        number_displayed = number_displayed.slice(1);     
      }
    }
    monitor_numbers.innerHTML = number_displayed;
  }

  //clear button を押したときのメソッド
  function input_clear(){
    clearAll();
  }


  //equal button を押したときのメソッド
  function input_equal(){
    if(number_displayed !== '' && operation !== ''){
      number_cache.push(parseFloat(number_displayed));
      calculation();
      monitor_functions.innerHTML = '';
      equal_flg = 1;
    }
  }

  //plus button を押したときのメソッド
  function input_plus(){
    if(equal_flg == 1){
      number_flg = 1;
      monitor_functions.innerHTML = "+";
      equal_flg = 0;
      operation = "+";
    } else {
      if(number_displayed !== ''){
        number_flg = 1;
        monitor_functions.innerHTML = "+";
        number_cache.push(parseFloat(number_displayed));
        number_displayed = '';
        if(operation !== ''){
          calculation();
        }
        operation = "+";
      }
    }
  }

  //minus button を押したときのメソッド
  function input_minus(){
    if(equal_flg == 1){
      number_flg = 1;
      monitor_functions.innerHTML = "-";
      equal_flg = 0;
      operation = "-";
    } else {
      if(number_displayed !== ''){
        number_flg = 1;
        monitor_functions.innerHTML = "-";
        number_cache.push(parseFloat(number_displayed));
        number_displayed = '';
        if(operation !== ''){
          calculation();
        }
        operation = "-";
      }
    }
  }

  //division button を押したときのメソッド
  function input_division(){
    if(equal_flg == 1){
      number_flg = 1;
      monitor_functions.innerHTML = "/";
      equal_flg = 0;
      operation = "/";
    } else {
      if(number_displayed !== ''){
        number_flg = 1;
        monitor_functions.innerHTML = "/";
        number_cache.push(parseFloat(number_displayed));
        number_displayed = '';
        if(operation !== ''){
          calculation();
        }
        operation = "/";
      }
    }
  }

  //multiply button を押したときのメソッド
  function input_multiply(){
    if(equal_flg == 1){
      number_flg = 1;
      monitor_functions.innerHTML = "*";
      equal_flg = 0;
      operation = "*";
    } else {
      if(number_displayed !== ''){
        number_flg = 1;
        monitor_functions.innerHTML = "*";
        number_cache.push(parseFloat(number_displayed));
        number_displayed = '';
        if(operation !== ''){
          calculation();
        }
        operation = "*";
      }
    }
  }

  //計算メソッド
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
  }

  //クリアメソッド
  function clearAll(){
    number_displayed = '';
    operation = '';
    number_flg = 0;
    equal_flg = 0;
    monitor_numbers.innerHTML = number_displayed;
    monitor_functions.innerHTML = operation;
    number_cache.splice(0,2);
  }

  //inputボタンを押したときの変数
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

  //イベント登録
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

// console.log(number_displayed);
// console.log(number_cache);
// console.log(operation);
// console.log(result);
// console.log(equal_flg);
// console.log(number_flg);

})();