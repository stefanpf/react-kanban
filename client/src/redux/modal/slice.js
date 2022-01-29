export function modalReducer(modal = null, action) {
    if (action.type === "modal/receiveModalVisibility") {
        modal = action.payload;
    } else if (action.type === "modal/toggleModalVisibility") {
        return { ...modal, modalIsVisible: !modal.modalIsVisible };
    }
    return modal;
}

export function receiveModalVisibility(modalIsVisible) {
    return {
        type: "modal/receiveModalVisibility",
        payload: modalIsVisible,
    };
}

export function toggleModalVisibility() {
    return {
        type: "modal/toggleModalVisibility",
    };
}
