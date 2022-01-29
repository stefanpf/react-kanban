export function modalReducer(modal = null, action) {
    if (action.type === "modal/receiveModalVisibility") {
        modal = action.payload;
    } else if (action.type === "modal/toggleModalVisibility") {
        return { ...modal, modalIsVisible: !modal.modalIsVisible };
    } else if (action.type === "modal/setActiveModal") {
        return { ...modal, modalType: action.payload.modalType };
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

export function setActiveModal(modalType) {
    return {
        type: "modal/setActiveModal",
        payload: modalType,
    };
}
