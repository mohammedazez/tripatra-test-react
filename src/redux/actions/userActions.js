import axios from "../../APIs/api";
import { FETCH_USER } from "../actionTypes/actionTypes";

const fetchUser = () => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: `/query`,
    });
    dispatch({
      type: FETCH_USER,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

const UserAction = {
  fetchUser,
};

export default UserAction;
