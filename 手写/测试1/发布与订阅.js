//todo 1.发布订阅:有（事件总线/消息代理）,低耦合，松散的订阅与发布关系,不需要维护直接关系
class Emmitor {
    constructor() {
        this.events = {}
    };

    //todo 
    subscribe(typeName, callback, once = false) {
        if(!this.events[typeName]) {
            this.events[typeName] = []
        };
        const listener = {
            once,
            // once: false,
            callback
        };
        this.events[typeName].push(listener);

        return () => {
            this.unSubscribe(typeName, listener);
        }
    };

    unSubscribe(typeName, listener) {
        if(this.events[typeName]) {
            const idx = this.events[typeName].indexOf(listener);
            if(idx !== -1) {
                this.events[typeName].splict(idx, 1);
            }
        }
    };

    publish(typeName, ...args) {
        if(this.events[typeName]) {
            const listeners = this.events[typeName].slice();
            for(let listener of listeners) {
                //todo
                // listener(...args);
                const { callback, once } = listener;
                callback(...args);
                if(once) {
                    this.unSubscribe(typeName, listener);
                }
            }
        }
    }
}
//todo 2.观察者模式:相对耦合，观察者与被观察者直接相关;观察者与被观察者的依赖较强

class Subject {
    constructor() {
        this.observers = [];
    };

    subscribe(observer) {
        this.observers.push(observer);
    };

    unSubscribe(observer) {
        this.observers = this.observers.filter((item) => item !== observer);
    };

    notify(...args) {
        this.observers.forEach((observer) => {
            observer.upDate(...args);
        })
    }
}

class Observer {

    upDate(data) {
        console.log(data);
    }
}