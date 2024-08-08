class EventEmmiter {
    constructor() {
        this.events = {}
    }

    on(type, callback) {
        if (!this.events[type]) {
            this.events[type] = [callback]
        } else {
            this.events[type].push(callback)
        }
    }

    emit(type, ...args) {
        this.events[type] && this.events[type].forEach((event) => {
            event.apply(this, ...args)
        })
    }

    once(type, callback) {
        function fn() {
            callback()
            this.off(type, callback)
        }
        this.on(type, fn)
    }

    off(type, callback) {
        if (!this.events[type]) return;
        this.events[type] = this.events[type].fillter((event) => {
            return event !== callback
        })
    }
}


class EventBus {
    constructor() {
        this.events = {}
    }
    subscribe(eventName, callback, once = false) {
        if (!this.events[eventName]) {
            this.events[eventName] = []
        }
        const subscription = { callback, once };
        this.events[eventName].push(subscription)

        return () => {
            this.unsubscription(eventName, subscription)
        }
    }
    unsubscription(eventName, subscription) {
        if (this.events[eventName]) {
            const index = this.events[eventName].indexOf(subscription);
            if (index !== -1) {
                this.events[eventName].splice(index, 1)
            }
        }
    }

    publish(eventName, ...args) {
        if (this.events[eventName]) {
            //`const subscribers = this.events[eventName].slice();` 这句代码的作用是创建 `eventName` 事件的订阅者的副本。这是为了确保在迭代订阅者并触发它们的回调函数时，不会受到后续订阅和取消订阅的影响。
            //具体来说，它执行了以下操作：
            //1. `this.events[eventName]` 返回事件 `eventName` 的订阅者数组。
            //2. `slice()` 方法创建了一个浅拷贝，生成了一个新数组，包含了原数组中的所有元素。
            //3. 这个副本数组 `subscribers` 是用于迭代和触发事件订阅者的回调函数，而不直接操作原始数组。
            //这是一种常见的做法，以确保在迭代数组时不会受到数组的修改影响，特别是在循环中可能会添加或删除订阅者。
            const subscribers = this.events[eventName].slice();
            for(let subscription of subscribers) {
                subscription.callback(...args)

                if(subscription.once) {
                    this.unsubscription(eventName,subscription)
                }
            }
        }
    }
}

const eventBus = new EventBus();

function handleEvenet1(data) {
}

function handleEvenet2(data) {
}

const unsubscription1 = eventBus.subscribe("event 1", handleEvenet1)
const unsubscription2 = eventBus.subscribe("event 1", handleEvenet2, true)

eventBus.publish('event 1', 'data 1')

class Subject {
    constructor() {
        this.observers = [];
    }
    // 添加观察者
    subscribe(observer) {
        this.observers.push(observer);
    }
    // 移除观察者
    unsubscribe(observer) {
        this.observers = this.observers.filter(subscriber => subscriber !== observer);
    }
    // 通知所有观察者
    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}
class Observer {
    constructor(name) {
        this.name = name;
    }
    // 观察者更新数据的方法
    update(data) {
        console.log(`${this.name} received data: ${data}`);
    }
}
// 使用
const subject = new Subject();
const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');
// 订阅
subject.subscribe(observer1);
subject.subscribe(observer2);
// 通知所有观察者
subject.notify('Hello World!'); // Observer 1 和 Observer 2 都会收到数据
// 取消订阅
subject.unsubscribe(observer1);
// 再次通知，这次只有 Observer 2 会收到更新
subject.notify('New Data');
