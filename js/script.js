
//`field`と`display`という変数が作成され、それぞれクラスが
//`middle-part`と`display`で指定されたDOM要素へのリファレンスを保持します。

const field = document.querySelector('.middle-part')
const display = document.querySelector('.display')

// `arr`は電卓のボタンへのリファレンスを保持し、`num1`、`num2`、`act`は
// 計算を実行する際に数値と演算子を格納するために使用されます。`finalDisp`は計算結果を格納します。

let arr = []
let num1 = ''
let num2 = ''
let act = ''
let finalDisp = '0'

display.innerText = '0'

// ループを使用して、17個の電卓ボタンが作成され、それらが`field`に追加されます。

for (let i = 0; i < 17; i++) {
  let elem = document.createElement('div')
  elem.classList.add('button')
  field.append(elem)
  arr.push(elem)
}

// 各ボタンにはテキストが割り当てられ、必要に応じて識別のためのクラスが追加されます。

arr[0].innerText = '1'
arr[1].innerText = '2'
arr[2].innerText = '3'
arr[3].innerText = '4'
arr[4].innerText = '5'
arr[5].innerText = '6'
arr[6].innerText = '7'
arr[7].innerText = '8'
arr[8].innerText = '9'
arr[9].innerText = '0'
arr[10].innerText = '+'
arr[10].classList.add('act')
arr[11].innerText = '-'
arr[11].classList.add('act')
arr[12].innerText = '*'
arr[12].classList.add('act')
arr[13].innerText = '/' 
arr[13].classList.add('act')
arr[14].innerText = '.'
arr[14].classList.add('act')
arr[15].innerText = 'C'
arr[15].classList.add('act')
arr[16].innerText = '='
arr[16].classList.add('actGreen')
arr[16].classList.add('bottom-button')

// イベントハンドラでは、ボタンのタイプと`act`（最後の操作）の現在の状態を確認します。
// - もし`act`が空で、ボタンが操作ボタン（`act`クラスを持つ）の場合、`display`のテキストは"0"にリセットされます。
// - もし`act`が空でなく、ボタンが数字である場合、その数字が`num2`に追加され、`display`に表示されます。
// - もし`act`が空でなく、ボタンが"."である場合、"."が`num2`に追加され、結果が`display`に表示されます。
// - もし`act`が空で、ボタンが数字である場合、その数字が`num1`に追加され、`display`に表示されます。
// - もし`act`が空で、ボタンが"."であり、かつ`num1`が空でない場合、"."が`num1`に追加され、結果が`display`に表示されます。
// - もし`act`が空で、ボタンが数字でない場合、その操作が`act`に追加され、`display`に表示されます。

for (let i = 0; i < arr.length; i++) {
    arr[i].addEventListener('click', () => {
        if(act.length == 0 && arr[i].classList.innerText == 'act'){
          display.innerText='0';
          console.log(display.innerText)
        }
        if (act.length == 1 && arr[i].innerText == parseInt(arr[i].innerText)){
          num2 += arr[i].innerText
          console.log(num2)
          display.innerText = num2 
        } else if (arr[i].innerText == '.' && act.length == 1 ){
          num2 += arr[i].innerText
          console.log(num2)
          display.innerText = (Math.abs(parseInt(num2))+'.')
                              .toString()
                              .split('')
                              .reverse()
                              .join('')
        } else if (arr[i].innerText == parseInt(arr[i].innerText)){
          num1 += arr[i].innerText
          console.log(num1)
          display.innerText = num1
        } else if (arr[i].innerText == '.' && num1 != '' ){
          num1 += arr[i].innerText
          console.log(num1)
          display.innerText = (Math.abs(parseInt(num1))+'.')
                              .toString()
                              .split('.')
                              .reverse()
                              .join('.')
        } else if (arr[i].innerText != parseInt(arr[i].innerText) && num1 != '' ){
          act += arr[i].innerText
          display.innerText = act 
        }
        
        // もし`act`が"="操作（つまり、ユーザーが"="ボタンを押した）を含んでいる場合、`eval`を使用して計算が行われ、
        // 結果が`finalDisp`に保存されます。結果が負の場合、マイナス記号が表示され、そうでなければ表示されません。
        // `num1`、`num2`、`act`の変数はリセットされます。

        if(act[1] == '='){
          finalDisp = (eval(`${(num1)}${act[0]}${(num2)}`)).toFixed(2);
          if(parseInt(finalDisp) < 0){
            display.innerText = Math.abs(finalDisp.slice(1,-1)) + '-';
            num1 = '';
            num2 = '';
            act = '';
          }else{
            display.innerText = Math.abs(finalDisp)
            num1 = '';
            num2 = '';
            act = '';
          }
        }

        // ユーザーが"C"ボタンを押した場合、すべての変数がリセットされ、`display`は再び"0"に設定されます。

        if (arr[i].innerText === 'C') {
          num1 = '';
          num2 = '';
          act = '';
          display.innerText = '0';
        };
    }); 
};