namespace grove_lcd {
    const chipAdress = 0x3E

    const LCD_CLEARDISPLAY = 0x01

    const LCD_RETURNHOME = 0x02
    const LCD_ENTRYMODESET = 0x07
    let LCD_DISPLAYCONTROL = 0x0C
    const LCD_CURSORSHIFT = 0x10
    const LCD_FUNCTIONSET = 0x3C

    // flags for display on/off control
    const LCD_DISPLAYON = 0x04
    const LCD_CURSORON = 0x02
    const LCD_BLINKON = 0x01


    function command(cmd: number) {
        let buf = pins.createBuffer(2)
        buf[0] = 0x80
        buf[1] = cmd
        pins.i2cWriteBuffer(chipAdress, buf, false)
    }

    function charPrint(char: number) {
        let buf = pins.createBuffer(2)
        buf[0] = 0x40
        buf[1] = char
        pins.i2cWriteBuffer(chipAdress, buf, false)
    }

    //% block="Blink On"
    export function BlinkOn() {
        command((LCD_DISPLAYCONTROL | LCD_BLINKON))
        basic.pause(1)
    }

    //% block="Blink Off"
    export function BlinkOff() {
        command((LCD_DISPLAYCONTROL &= ~LCD_BLINKON))
        basic.pause(1)
    }

    //% block="Cursor On"
    export function CursorOn() {
        command((LCD_DISPLAYCONTROL | LCD_CURSORON))
        basic.pause(1)
    }

    //% block="Cursor Off"
    export function CursorOff() {
        command((LCD_DISPLAYCONTROL &= ~LCD_CURSORON))
        basic.pause(1)
    }

    //% block="Clear"
    export function clear() {
        command(LCD_CLEARDISPLAY)
        basic.pause(2)
    }

    //% block="text = $text on X = $x Y = $y"
    export function printTextXY(text: string, x: number, y: number) {
        x = (y == 0 ? x | 0x80 : x | 0xc0);
        let buf = pins.createBuffer(2)
        buf[0] = 0x80
        buf[1] = x
        pins.i2cWriteBuffer(chipAdress, buf, false)

        for (let i = 0; i < text.length; i++) {
            charPrint(text.charCodeAt(i))
        }
    }

    //% block="Init display"
    export function init() {
        command(LCD_FUNCTIONSET);       //Function set
        command(LCD_DISPLAYCONTROL);    //On/Off control
        command(LCD_CLEARDISPLAY);      //Clear
        command(LCD_ENTRYMODESET);      //Entry mode set
        basic.pause(1)
    }

    // //% block="text = $text"
    // export function printText(text: string) {
    //     for (let i = 0; i < text.length; i++) {
    //         charPrint(text.charCodeAt(i))
    //     }
    // }

}