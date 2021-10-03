import axios from 'axios';

export function getAxios() {
  return axios.get(`http://localhost:3000/devices`).then((res) => {
    return res.data;
  });
}

export function deleteAxios(id) {
  if (window.confirm('Are you sure you want to delete this HDD')) {
    return axios
      .delete(`http://localhost:3000/devices/${id}`)
      .then((res) => {
        return res.status;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function putAxios(hdd, id) {
  return axios
    .put(`http://localhost:3000/devices/${id}`, {
      ...hdd,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function postAxios(hdd) {
  return axios
    .post(`http://localhost:3000/devices`, {
      ...hdd,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
