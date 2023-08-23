export const isEquals = (a, b) => {
    return a === b;
};

export const isNotEquals = (a, b) => {
    return a !== b;
};

export const and = (...args) => {

    for (var i = 0; i < args.length - 1; i++) {
        if (!args[i]) {
            return false;
        }
    }
    return true;
};

export const or = (...args) => {
    for (var i = 0; i < args.length - 1; i++) {
        if (args[i]) {
            return true;
        }
    }
    return false;
}