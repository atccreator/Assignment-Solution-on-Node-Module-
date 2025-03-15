function isPrimitive(value) {
    return (value === null) || (typeof value !== 'object' && typeof value !== 'function');
}

function isStrictlyEqual(a, b) {
    if (typeof a !== typeof b) return false;
    if (a === b) return true;

    // Handle NaN case
    if (typeof a === 'number' && typeof b === 'number' && Number.isNaN(a) && Number.isNaN(b)) {
        return true;
    }

    if (a === null || b === null) return false;

    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!isStrictlyEqual(a[i], b[i])) return false;
        }
        return true;
    }

    if (Array.isArray(a) || Array.isArray(b)) return false;

    if (typeof a === 'object' && typeof b === 'object') {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length) return false;
        for (const key of aKeys) {
            if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
            if (!isStrictlyEqual(a[key], b[key])) return false;
        }
        return true;
    }

    return false;
}

function union(arr1, arr2) {
    const combined = [...arr1, ...arr2];
    const result = [];
    const primitiveSet = new Set();
    const nonPrimitives = [];

    combined.forEach(element => {
        if (isPrimitive(element)) {
            if (!primitiveSet.has(element)) {
                primitiveSet.add(element);
                result.push(element);
            }
        } else {
            const isDuplicate = nonPrimitives.some(existing => isStrictlyEqual(existing, element));
            if (!isDuplicate) {
                nonPrimitives.push(element);
                result.push(element);
            }
        }
    });

    return result;
}

module.exports = union;