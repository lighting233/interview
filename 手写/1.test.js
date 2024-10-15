let Foo = (function() {
    //todo 
    // this.n = 0;
    let times = 0;
    return function() {
        if(!new.target) {
            //if(!this instanceof Foo)
            return new Foo();
        };
        //todo 
        // this.n++;
        times++;
        this.id = times;
    }
}());
const a = Foo();
console.log("%c Line:17 🥚 a", "color:#ed9ec7", a);
const b = new Foo();
console.log("%c Line:19 🌮 b", "color:#7f2b82", b);