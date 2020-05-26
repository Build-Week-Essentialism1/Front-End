const RegisterSubmit = (e) => {
  e.preventDefault();
  axiosWithAuth()
    .post("https://essentialismapi.herokuapp.com/api/users/register", user)
    .then((res) => {
      console.log(res);
      localStorage.setItem("token", res.data.payload);
      push("/");
    });
};

const LoginSubmit = (e) => {
  e.preventDefault();
  axiosWithAuth()
    .post("https://essentialismapi.herokuapp.com/api/users/login", user)
    .then((res) => {
      console.log(res);
      localStorage.setItem("token", res.data.payload);
      push("/essetialism");
    });
};
