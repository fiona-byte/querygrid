package resterror

import "net/http"

type RestError struct {
	Message string      `json:"message"`
	Status  int         `json:"status"`
	Error   interface{} `json:"errors"`
}

func Forbidden(message string) *RestError {
	return &RestError{
		Message: message,
		Status:  http.StatusForbidden,
		Error:   "forbidden_request",
	}
}

func BadRequest(message string, error interface{}) *RestError {
	return &RestError{
		Message: message,
		Status:  http.StatusBadRequest,
		Error:   error,
	}
}

func BadJSONRequest() *RestError {
	return &RestError{
		Message: "invalid json",
		Status:  http.StatusBadRequest,
	}
}

func BadQueryRequest() *RestError {
	return &RestError{
		Message: "invalid query",
		Status:  http.StatusBadRequest,
	}
}

func NotFound(message string) *RestError {
	return &RestError{
		Message: message,
		Status:  http.StatusNotFound,
		Error:   "not_found",
	}
}

func UnAuthorized(message string) *RestError {
	return &RestError{
		Message: message,
		Status:  http.StatusUnauthorized,
		Error:   "un_authorized",
	}
}

func InternalServerError() *RestError {
	return &RestError{
		Message: "something went wrong",
		Status:  http.StatusInternalServerError,
		Error:   "internal_server_error",
	}
}
