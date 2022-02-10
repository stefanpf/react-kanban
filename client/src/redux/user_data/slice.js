export function userDataReducer(userData = null, action) {
    if (action.type === "userData/received") {
        userData = action.payload.userData;
    } else if (action.type === "userData/addProfileData") {
        return { ...userData, profileData: action.payload };
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

export function addProfileData(profileData) {
    return {
        type: "userData/addProfileData",
        payload: profileData,
    };
}
