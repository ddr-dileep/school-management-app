export const apiSuccess = (data: any, message = "Success") => {
    const response = {
        data,
        success: true,
        message,
        status: 200,
    }

    return response;
};

export const apiError = (error: any, message = "Error") => {
    const response = {
        error,
        success: false,
        message,
        status: 400,
    }

    return response;
};