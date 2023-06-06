let index = 0
grove_lcd.init()
basic.forever(function () {
    for (let index = 0; index <= 9; index++) {
        grove_lcd.printTextXY("test!", index, 1)
        basic.pause(1000)
        grove_lcd.clear()
        basic.pause(1000)
    }
})
