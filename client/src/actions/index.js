export const changeTotal = (total) => {
    return{
        type:"CURRTOTAL",
        total:total
    }
}

export const changeSearch = (search) => {
    return{
        type:"SEARCH",
        search:search
    }
}

export const changeCategory = (category) => {
    return{
        type:"CATEGORY",
        category:category
    }
}

export const changeUser = (user) => {
    return{
        type:"CURRUSER",
        user:user
    }
}
