export function userDataReducer(userData = null, action) {
    if (action.type == "userData/received") {
        userData = action.payload.userData;
    }
    return userData;
}

export function receiveUserData(userData) {
    return {
        type: "userData/received",
        payload: {
            userData,
        },
    };
}
