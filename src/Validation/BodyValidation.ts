let ApiErrorResult: { errorsMessages: { message: string, field: string }[] } = {
    errorsMessages: []
}

export function validateSimple(value: string, fieldName: string, maxLength: number)
    : { errorsMessages: { message: string, field: string }[] } {
    if (value === null) {
        ApiErrorResult.errorsMessages.push({
            message: fieldName + ' is cannot be null',
            field: fieldName,
        });
        return ApiErrorResult;
    }

    if (!value) {
        ApiErrorResult.errorsMessages.push({
            message: fieldName + ' is required',
            field: fieldName,
        });
        return ApiErrorResult;
    } else if (value.length > maxLength) {
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

export function validateEnum(values: string[], fieldName: string, enumValues: string[])
    : { errorsMessages: { message: string, field: string }[] } {
    if (!values) {
        return ApiErrorResult;
    }
        const invalidValues = values.filter(value => !enumValues.includes(value));

        if (invalidValues.length > 0) {
            ApiErrorResult.errorsMessages.push({
                            message: fieldName + ' wrong data',
                            field: fieldName
                        })
        }
    return ApiErrorResult;
}

export function isCorrectAge(age: number, fieldName: string, minAge: number, maxAge: number)
    : { errorsMessages: { message: string, field: string }[] } {

        if (age < minAge || age > maxAge) {
            ApiErrorResult.errorsMessages.push({
                message: fieldName + ' wrong age',
                field: fieldName
            })
        }
    return ApiErrorResult;
    }

function isDateString(value: string | number | Date) {
    try {
        const dateObject = new Date(value);
        return !isNaN(dateObject.getTime());
    } catch (error) {
        return false;
    }
}

export function isCorrectDate(dateString: string ): { errorsMessages: { message: string, field: string }[] } {
    if (!isDateString(dateString)) {
        ApiErrorResult.errorsMessages.push({
            message: 'publicationDate' + ' wrong data',
            field: 'publicationDate'
        })
    }
    return ApiErrorResult;
}

export function isCorrectCanBeDownloaded(canBeDownloaded: any)
{
    if (canBeDownloaded === null) {
        return ApiErrorResult;
    }
    if (typeof canBeDownloaded !== 'boolean')
    {
        ApiErrorResult.errorsMessages.push({
            message: 'canBeDownloaded' + ' wrong data' + canBeDownloaded,
            field: 'canBeDownloaded'
        })
    }
    return ApiErrorResult;
}


export function  clearErrorsMessages() {
   ApiErrorResult.errorsMessages.length = 0 ;
    }







