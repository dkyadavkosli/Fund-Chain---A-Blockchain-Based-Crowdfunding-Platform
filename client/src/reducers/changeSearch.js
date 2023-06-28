const initialState = null;

const changeSearch = (state = initialState , action) => {
    switch(action.type){
        case "SEARCH": return action.search;
        default: return state;
    }
}

export default changeSearch; 