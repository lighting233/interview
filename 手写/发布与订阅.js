//todo 1.发布订阅:有（事件总线/消息代理）,低耦合，松散的订阅与发布关系,不需要维护直接关系
//适用场景:当系统中多个模块之间需要进行解耦。;需要将事件广播到多个订阅者，且不希望发布者了解订阅者的存在。;更适合复杂的事件驱动架构或消息系统。
class EventBus {
    // 事件总线
    constructor() {
        this.event = {};
    };

    subscribe(eventName, callback, once = false) {
        if (!this.event[eventName]) {
            this.event[eventName] = [];
        };
        const listener = { callback, once };
        this.event[eventName].push(listener);

        return () => {
            this.unSubscribe(eventName, listener);
        };
    };

    unSubscribe(eventName, listener) {
        if (this.event[eventName]) {
            const idx = this.event[eventName].indexOf(listener);
            if (idx !== -1) {
                this.event[eventName].splice(idx, 1);
            }
        }
    };

    //`const subscribers = this.events[eventName].slice();` 这句代码的作用是创建 `eventName` 事件的订阅者的副本。
    //这是为了确保在迭代订阅者并触发它们的回调函数时，不会受到后续订阅和取消订阅的影响。
    //具体来说，它执行了以下操作：
    //1. `this.events[eventName]` 返回事件 `eventName` 的订阅者数组。
    //2. `slice()` 方法创建了一个浅拷贝，生成了一个新数组，包含了原数组中的所有元素。
    //3. 这个副本数组 `subscribers` 是用于迭代和触发事件订阅者的回调函数，而不直接操作原始数组。
    //这是一种常见的做法，以确保在迭代数组时不会受到数组的修改影响，特别是在循环中可能会添加或删除订阅者。
    publish(eventName, ...args) {
        const listeners = this.event[eventName].slice();

        for (let listener of listeners) {
            const { callback, once } = listener;
            callback(...args);

            if (once) {
                this.unSubscribe(eventName, listener);
            }
        }
    }
};

const eventBus = new EventBus();

function handleEvenet1(data) {
}

function handleEvenet2(data) {
}

const unsubscription1 = eventBus.subscribe("event 1", handleEvenet1)
const unsubscription2 = eventBus.subscribe("event 1", handleEvenet2, true)

eventBus.publish('event 1', 'data 1');

//todo 2.观察者模式:相对耦合，观察者与被观察者直接相关;观察者与被观察者的依赖较强
//适用场景:当有明确的对象依赖关系，比如某对象状态变化时，需要自动通知并更新其他对象。;适用于对象之间存在一对多关系，且这些关系是稳定的、明确的。;更适合简单的依赖关系，而非事件广播场景。
// 被观察者
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
            observer.update(...args);
        })
    }
};

// 观察者
class Observer {
    constructor(name) {
        this.name = name;
    };

    update(data) {
        console.log(`${this.name} received data: ${data}`);
    }
};
// 使用
const subject = new Subject();
const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');
// 订阅
subject.subscribe(observer1);
subject.subscribe(observer2);
// 被观察者通知所有观察者
subject.notify('Hello World!'); // Observer 1 和 Observer 2 都会收到数据
// 取消订阅
subject.unsubscribe(observer1);
// 再次通知，这次只有 Observer 2 会收到更新
subject.notify('New Data');