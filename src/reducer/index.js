export const INIT = "INIT";
export const CREATE = "CREATE";
export const REMOVE = "REMOVE";
export const EDIT = "EDIT";

const reducer = (state, action) => {
  switch (action.type) {
    case INIT: {
      return action.data;
    }

    case CREATE: {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }

    case REMOVE:
      return state.filter((item) => item.id !== action.data);
    case EDIT:
      return state.map((e) =>
        e.id === action.data.id ? { ...e, content: action.data.content } : e
      );
    default:
      return state;
  }
};

export default reducer;
