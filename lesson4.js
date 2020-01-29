// Задание 1
let number = prompt('Введите трёхзначное число')

function transfer(units, doz = '0', hun = '0') {
    let result = {
        единицы: units,
        десятки: doz,
        сотни: hun
    }
    console.log(result)
}

function swap(num) {
    if (!isNaN(num) && num.length <= 3) {
        num = num.split('').reverse().join('')
        return transfer(...num)
    } else {
        console.log('Вы ввели неверное число')
        return {}
    }
}

swap(number)

// Задание 2(Быки и коровы)
function game(secretNumber) {
    secretNumber = secretNumber.toString().split('')
    let guess = prompt('Введите четырёхзначное число').split('')
    let cow = 0
    let bull = 0
    while (bull != 4) {
        cow = 0
        bull = 0
        guess.forEach(function (el) {
            if (secretNumber.includes(el) && (secretNumber.indexOf(el) == guess.indexOf(el))) {
                bull++
            } else if (secretNumber.includes(el)) {
                cow++
            }
        })
        if (bull == 4) {
            break
        }


    guess = prompt('Вы угадали ' + cow + ' коров и ' + bull + ' быков. Введите новое число').split('')
}


console.log(cow + ' ' + bull)
console.log('Вы угадали число ' + guess.join(''))
}
game(5287)