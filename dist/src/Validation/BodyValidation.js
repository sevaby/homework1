"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearErrorsMessages = exports.isCorrectDate = exports.isCorrectAge = exports.validateEnum = exports.validateSimple = void 0;
let ApiErrorResult = {
    errorsMessages: []
};
function validateSimple(value, fieldName, maxLength) {
    if (!value) {
        ApiErrorResult.errorsMessages.push({
            message: fieldName + ' is required',
            field: fieldName,
        });
        return ApiErrorResult;
    }
    else if (value.length > maxLength) {
        ApiErrorResult.errorsMessages.push({
            message: fieldName + ' is too long',
            field: fieldName,
        });
        return ApiErrorResult;
    }
    else if (value.length < 1) {
        ApiErrorResult.errorsMessages.push({
            message: fieldName + ' is too low',
            field: fieldName,
        });
        return ApiErrorResult;
    }
    return ApiErrorResult;
}
exports.validateSimple = validateSimple;
function validateEnum(values, fieldName, enumValues) {
    if (!values) {
        return ApiErrorResult;
    }
    const invalidValues = values.filter(value => !enumValues.includes(value));
    if (invalidValues.length > 0) {
        ApiErrorResult.errorsMessages.push({
            message: fieldName + ' wrong data',
            field: fieldName
        });
    }
    return ApiErrorResult;
}
exports.validateEnum = validateEnum;
function isCorrectAge(age, fieldName, minAge, maxAge) {
    if (age < minAge || age > maxAge) {
        ApiErrorResult.errorsMessages.push({
            message: fieldName + ' wrong age',
            field: fieldName
        });
    }
    return ApiErrorResult;
}
exports.isCorrectAge = isCorrectAge;
function isDateString(value) {
    try {
        const dateObject = new Date(value);
        return !isNaN(dateObject.getTime());
    }
    catch (error) {
        return false;
    }
}
function isCorrectDate(dateString) {
    if (!isDateString(dateString)) {
        ApiErrorResult.errorsMessages.push({
            message: 'publicationDate' + ' wrong data',
            field: 'publicationDate'
        });
    }
    return ApiErrorResult;
}
exports.isCorrectDate = isCorrectDate;
function clearErrorsMessages() {
    ApiErrorResult.errorsMessages.length = 0;
}
exports.clearErrorsMessages = clearErrorsMessages;
