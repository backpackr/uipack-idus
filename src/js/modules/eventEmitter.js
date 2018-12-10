const events = {};

export const emit = (eventName, data) => {
    if (events[eventName]) {
        events[eventName].forEach((fn) => {
            fn(data);
        });
    }
};

export const listen = (eventName, fn) => {
    events[eventName] = events[eventName] || [];
    events[eventName].push(fn);
};

export const remove = (eventName, fn) => {
    let i;

    if (events[eventName]) {
        for (i = 0; i < events[eventName].length; i += 1) {
            if (events[eventName][i] === fn) {
                events[eventName].splice(i, 1);
                break;
            }
        }
    }
};

export default events;