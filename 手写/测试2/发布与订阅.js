//todo 1.发布订阅:有（事件总线/消息代理）,低耦合，松散的订阅与发布关系,不需要维护直接关系
class EventBus {
    constructor() {
        this.listeners = {};
    };

    subcribe(typeName, callback, once = false) {
        if(!this.listeners[typeName]) {
            this.listeners[typeName] = []
        };
        const listener = {
            callback,
            once
        };
        this.listeners.push(listener);

        return () => {
            this.unSubcribe(typeName,listener);
        };
    };

    unSubcribe(typeName, listener) {
        if(this.listeners[typeName]) {
            const idx = this.listeners[typeName].indexOf(listener);
            if(idx !== -1) {
                this.listeners[typeName].splice(idx, 1);
            }
        }
    };

    publish(typeName, ...args) {
        if(this.listeners[typeName]) {
            const listeners = this.listeners[typeName].slice();

            for(let listener of listeners) {
                const { callback, once } = listener;
                callback(...args);

                if(once) {
                    this.unSubcribe(typeName, listener);
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

    //todo subscribe
    add(observer) {
        this.observers.push(observer);
    };

    unSubscribe(observer) {
        this.observers = this.observers.filter((item) => item !== observer)
    }

    //todo notify
    publish(age) {
        for(let observer of this.observers) {
            observer.update(age);
        }
    }

};

class Observer {
    constructor(name) {
        this.name = name;
    }

    update(age) {
        console.log(age + this.name)
    }
}