class EventEmmiter {
    constructor() {
        this.events = {}
    }

    on(type,callback) {
        if(!this.events[type]) {
            this.events[type] = [callback]
        }else {
            this.events[type].push(callback)
        }
    }

    emit(type,...args) {
        this.events[type] && this.events[type].forEach((event) => {
            event.apply(this,...args)
        })
    }

    once(type,callback) {
        function fn() {
            callback()
            this.off(type, callback)
        }
        this.on(type,fn)
    }

    off(type,callback) {
        if(!this.events[type]) return;
        this.events[type] = this.events[type].fillter((event) => {
            return this.events !== callback
        })
    }
}