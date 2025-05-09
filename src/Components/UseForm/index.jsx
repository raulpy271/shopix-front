
import { useState } from "react";

import api from "@Controllers/api";

export default function useForm(defaultObj = {}) {
  const [data, setData] = useState(defaultObj);
  const [error, setError] = useState({});
  const [processing, setProcessing] = useState(false);

  const set = (key, value) => {
    setData({...data, [key]: value});
  }

  const submit = async (method, url, options) => {
    try {
      setProcessing(true);
      setError({});
      const res = await api.request({url, method, data, ...options});
      return res;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data);
      } else {
        setError({"message": "Ocorreu um erro inesperado"});
      }
    } finally {
      setProcessing(false);
    }
  }
  return {
    data,
    setData: set,
    error,
    processing,
    get: (url, options) => submit("GET", url, options),
    post: (url, options) => submit("POST", url, options),
    put: (url, options) => submit("PUT", url, options),
    patch: (url, options) => submit("PATCH", url, options),
    delete: (url, options) => submit("DELETE", url, options),
  }
}
