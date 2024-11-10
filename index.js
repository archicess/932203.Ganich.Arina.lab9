const numbers = document.querySelectorAll('.btn_number')
const plcHolder = document.getElementById('area')
const clear = document.getElementById('delete')
const clearOne = document.getElementById('deleteOne')
const point = document.getElementById('point')
const operations = document.querySelectorAll('.btn_op')
const result = document.getElementById('result')

result.addEventListener('click', () => calcResult())
for(op of operations){
    const opId = op.getAttribute('id')
    op.addEventListener('click', () => addOperation(opId))
}
point.addEventListener('click', () => addPoint())
clearOne.addEventListener('click', () => deleteOne())
clear.addEventListener('click', () => deleteAll())
for (number of numbers){
    const numberId = number.getAttribute('id')
    number.addEventListener('click', () => addNumber(numberId))
}

let pointFlag = true
let opFlag = false

const oper = {
    '/': '/',
    '*': '*',
    '-': '-',
    '+': '+'
}

function addNumber(id){
    const val ={
        '0': 0,
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9
    }
    if (plcHolder.value === '0'){
        plcHolder.value = ''
    }
    plcHolder.value += val[id]
    opFlag = true
}

function addPoint(){
    if(pointFlag){
        plcHolder.value += '.'
        pointFlag = false
    }
    else{
        return
    }
}

function addOperation(id){
    if(opFlag){
        plcHolder.value += oper[id]
        opFlag = false
        pointFlag = true
    }
    else{
        return
    }
}

function calcResult(){
    let tmp1 = ''
    let tmp2 = ''
    let resultTmp = ''
    plcHolder.value = '#' + plcHolder.value + '#'
    for(let i=0; i <= plcHolder.value.length - 1; i++){
        tmp1 = ''
        tmp2 = ''
        resultTmp = ''
        if(plcHolder.value[i]==='/' || plcHolder.value[i]==='*'){
            let j = i
            let opTmp = plcHolder.value[i]
            while(!(plcHolder.value[j-1] in oper) && plcHolder.value[j-1] !== plcHolder.value.charAt(0)){
                tmp1 = plcHolder.value[j-1] + tmp1
                j--
            }
            while(!(plcHolder.value[i+1] in oper) && plcHolder.value[i+1] !== plcHolder.value.charAt(plcHolder.value.length-1)){
                tmp2 += plcHolder.value[i+1]
                i++
            }
            resultTmp = Result(tmp1, tmp2, opTmp)
            plcHolder.value = plcHolder.value.replace(`${tmp1+opTmp+tmp2}`, `${resultTmp}`)
            i=0
        }
    }
    for(let i = 0; i <= plcHolder.value.length - 1; i++){
        if(plcHolder.value[i]==='+' || plcHolder.value[i]==='-'){
            opTmp = plcHolder.value[i]
            tmp2 = ''
            while(!(plcHolder.value[i+1] in oper) && plcHolder.value[i+1] !== plcHolder.value.charAt(plcHolder.value.length-1)){
                tmp2+=plcHolder.value[i+1]
                i++
            }
            resultTmp = Result(tmp1, tmp2, opTmp)
            plcHolder.value = plcHolder.value.replace(`${tmp1+opTmp+tmp2}`, `${resultTmp}`)
            tmp1=''
            i = 0
        }
        else if(plcHolder.value[i] !== '#'){
            tmp1 += plcHolder.value[i]
        }
    }
    plcHolder.value = plcHolder.value.replace(/#/gi, '')
}

function Result(val1, val2, operation){
    if(operation === '/'){
        return String(Number(val1)/Number(val2))
    }
    if(operation === '*'){
        return String(Number(val1)*Number(val2))
    }
    if(operation === '+'){
        return String(Number(val1)+Number(val2))
    }
    if(operation === '-'){
        return String(Number(val1)-Number(val2))
    }
}

function deleteAll(){
    plcHolder.value = '0'
    let pointFlag = true
    let opFlag = false
}

function deleteOne(){
    if(oper[plcHolder.value[plcHolder.value.length-1]]){
        opFlag = true
    }
    if(plcHolder.value[plcHolder.value.length-1] === '.'){
        pointFlag = true
    }
    plcHolder.value = plcHolder.value.slice(0, -1)
}
