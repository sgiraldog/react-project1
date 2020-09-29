import { actionTypes } from '../actions/navBarActions';

const initialState = {
  searchContent: "",
  isMobileItemsActive: false
}


const navBarReducer = (state = initialState, action) => {
  switch (action.type){
    case actionTypes.UPDATE_SEARCH_CONTENT:
      return {
        ...state, 
        ...action.payload
      }
    
    case actionTypes.CHANGE_MOBILE_ITEMS_STATUS:
      return {
        ...state,
        isMobileItemsActive: !state.isMobileItemsActive
      }
    default:
      return state
  }
}

export default navBarReducer;