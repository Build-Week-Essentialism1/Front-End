const RegisterSubmit = (e) => {
  e.preventDefault();
  axiosWithAuth()
    .post(
      "https://essentialismapi.herokuapp.com/api/users/register",
      credentials
    )
    .then((res) => {
      // console.log(res);
      localStorage.setItem("token", res.data.payload);
      push("/essetialism");
    });
};

const LoginSubmit = (e) => {
  e.preventDefault();
  axiosWithAuth()
    .post("https://essentialismapi.herokuapp.com/api/users/login", credentials)
    .then((res) => {
      // console.log(res);
      localStorage.setItem("token", res.data.payload);
      push("/essetialism");
    });
};
