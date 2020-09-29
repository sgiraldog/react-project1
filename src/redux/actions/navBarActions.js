export const actionTypes = {
  UPDATE_SEARCH_CONTENT: 'UPDATE_SEARCH_CONTENT',
  CHANGE_MOBILE_ITEMS_STATUS: 'CHANGE_MOBILE_ITEMS_STATUS'
}

export const updateSearch = (searchContent) => {
  return {
    type: actionTypes.UPDATE_SEARCH_CONTENT,
    payload: {
      searchContent
    }
  }
}


export const changeMobileItemsStatus = () => {
  return {
    type: actionTypes.CHANGE_MOBILE_ITEMS_STATUS
  }
}