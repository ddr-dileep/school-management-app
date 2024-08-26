export const apiSuccess = (data: any, message = "Success") => {
  const response = {
    data,
    success: true,
    message,
    status: 200,
  };

  return response;
};

export const apiError = (error: any, message = "Error") => {
  const response = {
    error,
    success: false,
    message,
    status: 400,
  };

  return response;
};

export const apiOtherError = (error: any) => {
  if (error.code === 11000) {
    const duplicateKey = Object.keys(error.keyValue)[0];
    const duplicateValue = error.keyValue[duplicateKey];
    const errorMessage = `Duplicate value for key: ${duplicateKey} ${duplicateValue}`;

    return apiError("duplicate_error", errorMessage);
  } else {
    return apiError("Something went wrong", "error");
  }
};
