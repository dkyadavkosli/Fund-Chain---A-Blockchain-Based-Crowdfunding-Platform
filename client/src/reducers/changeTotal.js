const initialState = null;

const changeTotal = (state = initialState , action) => {
    switch(action.type){
        case "CURRTOTAL": return action.total;
        default: return state;
    }
}

export default changeTotal; 