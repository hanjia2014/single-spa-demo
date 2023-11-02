const handlePromise = (promiseObj: Promise<any>) => {
  return promiseObj.then(async resp => {
    if (resp.data) {
      return {
        response: resp.data,
        error: null
      }
    }
  }).catch(error => Promise.resolve({
    response: null,
    error
  }));
}

export default handlePromise;