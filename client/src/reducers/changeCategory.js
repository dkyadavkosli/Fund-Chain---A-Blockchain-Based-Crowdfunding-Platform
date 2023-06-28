const initialState = null;

const changeCategory = (state = initialState , action) => {
    switch(action.type){
        case "CATEGORY": return action.category;
        default: return state;
    }
}

export default changeCategory; 