export const successResponse = function (data, message){
    return {
        success: true,
        message: message || 'Success',
        data: data,
        err: {}
    };
}

export const internalErrorResponse = function (error){
    return {
        success: false,
        message: 'Internal Server Error',
        err: error,
        data: {}
    }
}

export const customErrorResponse = function (error){
    if(!error.message || !error.explanation){
        return internalErrorResponse(error);
    }
    return {
        success: false,
        message: error.message,
        err: error.explanation,
        data: {}
    }
}

