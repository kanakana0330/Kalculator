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

    number_displayed = '',
    //num = "";
    number_cache = [],
    flg = 0,
    operation = '',
    result = ''
  ;

  //1〜9の数字を押したときのメソッド
  function inputBasic(arg){
    if(flg !== 0){
      number_displayed = arg;
      flg = 0;
    } else{
      if (number_displayed !== '0') {
        number_displayed += arg;
        flg = 0;
      }else {
        number_displayed = arg;
        flg = 0;
      }
    }
    monitor_numbers.innerHTML = number_displayed;
  }

  //0を押したときのメソッド
  function inputZero(arg){
    if(number_displayed !== '0'){
      number_displayed += arg;
      monitor_numbers.innerHTML = number_displayed;
    }
  }

  //clear button を押したときのメソッド
  function input_clear(){
    number_displayed = '';
    operation = '';
    flg = 0;
    monitor_numbers.innerHTML = number_displayed;
    monitor_functions.innerHTML = operation;
    number_cache.splice(0,2);
  }

  //equal button を押したときのメソッド
  function input_equal(){
    if(number_displayed !== '' && operation !== ''){
      number_cache.push(parseInt(number_displayed));
      calculation();
    }
  }

  //plus button を押したときのメソッド
  function input_plus(){
    if(number_displayed !== ''){
      flg = 1;
        monitor_functions.innerHTML = "+";
        number_cache.push(parseInt(number_displayed));
      if(operation !== ''){
        calculation();
      }
      operation = "+";
    }
  }

  //minus button を押したときのメソッド
  function input_minus(){
    if(number_displayed !== ''){
      flg = 1;
        monitor_functions.innerHTML = "-";
        number_cache.push(parseInt(number_displayed));
      if(operation !== ''){
        calculation();
      }
      operation = "-";
    }
  }

  //計算ロジック
  function calculation(){
    if(operation === '+'){
      result = number_cache[0] + number_cache[1];
    } else if(operation === '-'){
      result = number_cache[0] - number_cache[1];
    }
      monitor_numbers.innerHTML = result;
      number_cache.splice(0,2);
      number_cache.push(parseInt(result));
      //number_displayed = '';
      
      console.log('ディスプレイに表示するのは' + number_displayed);
      console.log('キャッシュは'+number_cache);
      console.log('計算方法は'+operation);
      console.log('結果は'+result);
      console.log('フラグは'+flg);
  }

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

  btn_clear.addEventListener('click',input_clear,false);
  btn_plus.addEventListener('click',input_plus,false);
  btn_minus.addEventListener('click',input_minus,false);
  btn_equal.addEventListener('click',input_equal,false);

})();