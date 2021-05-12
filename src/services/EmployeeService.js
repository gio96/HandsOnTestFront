export const clientService = () => {
  const urlApi = "http://localhost:8080/api/clientes";
  const requestOptions = {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
  };
  return fetch(urlApi, requestOptions);
};

  export const getEmployee = (idEmployee) => {
  const urlApi = `http://localhost:8080/api/clientes/${idEmployee}`;
      const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
      };
      return fetch(urlApi, requestOptions);
    };
  