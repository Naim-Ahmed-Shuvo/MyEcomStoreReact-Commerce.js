const initialState = {
    value: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_PRODUCTS":
            return "hello";

        default:
            return state;
    }

}

export {
    initialState,
    reducer
}