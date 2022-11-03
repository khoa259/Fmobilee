import axios from "axios";
export const createOrUpdateUser = async (authToken) => {
  return await axios.post(
    // `http://localhost:8000/api/create-or-update-user`,
    `${process.env.REACT_APP_API}/create-or-update-user`,

    {},
    {
      headers: {
        authToken,
      },
    }
  );
};

export const currentUser = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    // `http://localhost:8000/api/current-user`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};

export const currentAdmin = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};
