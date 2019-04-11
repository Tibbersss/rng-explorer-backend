const http = require('http');
const get = function (method, params = []) {
  let data = {"jsonrpc": "2.0", "id": 0, "method": method, "params": params};
  data = JSON.stringify(data);
  let opt = {
    host: '127.0.0.1',
    port: '6553',
    method: 'POST',
    path: '/',
    headers: {
      "Content-Type": 'application/json',
      "Accept": 'application/json',
      "Content-Length": data.length
    }
  }
  return new Promise( (resolve, reject) => {
    let request = http.request(opt, function (result) {
      let rpcResult = '';
      let datas = '';
      result.on('data', function (data) {
        try {
          datas += data;  // 注意：返回json数据量大时，会截取分批返回
        } catch (e) {
          console.log(e);
        }
      }).on('end', function () {
        rpcResult = JSON.parse(datas);
        resolve(rpcResult);
      });
    }).on('error', function (e) {
      console.log("error: " + e.message);
      reject(e);
    });

    request.write(data);
    request.end();
  });
}

module.exports = {
  get: get
}
