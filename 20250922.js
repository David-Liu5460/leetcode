function deepEqual(a, b) {
    if (a === b) return true;

    // isNan
    if (Number.isNaN(a) && Number.isNaN(b)) {
        return true;
    }

    if (a === null || b === null || a == undefined || b === undefined) {
        return a === b;
    }

    if (a instanceof Date) {
        return a.getTime() === b.getTime();
    }

    if (a instanceof RegExp) {
        return a.toString() === b.toString();
    }

    if (a.construcor !== b.construcor) {
        return false;
    }

    if (Array.isArray(a)) {
        let lenA = a.length, lenB = b.length;

        if (lenA !== lenB) return false;

        for(let i = 0; i < lenA; i++) {
            if (!deepEqual(a[i], b[i])) {
                return false;
            };
        };
        return true;
    } else {
        let keysA = Object.keys(a);
        let keysB = Object.keys(b);

        if (keysA.length !== keysB.length) {
            return false;
        };

        keysA.map(key => {
            if (!deepEqual(a[key], b[key])) return false;
        });

        return true;
    }
}