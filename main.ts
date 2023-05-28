namespace grove_lcd {
    const chipAdress = 0x3E

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

    function charPrint2(char: number) {
        let buf = pins.createBuffer(2)
        buf[0] = 0x40
        buf[1] = char
        pins.i2cWriteBuffer(chipAdress, buf, false)
    }


    //% block="Init display"
    export function init() {
        command(0b00111100);
        command(0b00001100);
        command(0b00000001);
        command(0b00000111);
    }

    //% block="Test display"
    export function test() {
        charPrint(0x68);
        charPrint(0x65);
        charPrint(0x6C);
    }

    //% block="text = $text"
    export function printText(text: string) {
        for (let i = 0; i < text.length; i++) {
            charPrint2(text.charCodeAt(i))
        }
    }

    //% block="text = $text on X = $x Y = $y"
    export function printTextXY(text: string, x: number, y: number) {
        x = (y == 0 ? x | 0x80 : x | 0xc0);
        let buf = pins.createBuffer(2)
        buf[0] = 0x80
        buf[1] = x
        pins.i2cWriteBuffer(chipAdress, buf, false)

        for (let i = 0; i < text.length; i++) {
            charPrint2(text.charCodeAt(i))
        }
    }

}

// x = (y == 0 ? x | 0x80 : x | 0xc0);
// let buf = pins.createBuffer(2)
// buf[0] = 0x40
// buf[1] = x
// pins.i2cWriteBuffer(chipAdress, buf, false)

//col = (row == 0 ? col | 0x80 : col | 0xc0);
//unsigned char dta[2] = { 0x80, col };