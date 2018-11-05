
import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'eosjs';

const defaultPrivateKey = ["5JbuZx3MFvUY1FkYoWdR1o8b4TRCZwQJQzCvrT6JwVdQgLzscVo", '5J4j8MJdhiHGmJ26CGTHvqMWYeYNMTEL6itTaxXFPAUpPfPm61L']; // useraaaaaaaa
const defaultRpcUrl = 'http://127.0.0.1:8000';

class EosManager {

  constructor({prviateKeys, rpcUrl }) {
    console.log("===== EosManager::constructor - ");

    this.signatureProvider = new JsSignatureProvider(prviateKeys || defaultPrivateKey);
    this.rpc = new JsonRpc(rpcUrl || defaultRpcUrl, { fetch });
    this.api = new Api({  rpc: this.rpc,  signatureProvider: this.signatureProvider, /*textDecoder: new TextDecoder(), textEncoder: new TextEncoder()*/ });
  
    this.RpcError = RpcError;
  }

  async getinfo() {

    try {

      const result = await this.rpc.get_info();
      console.log('\n===== EOS get_info : ' + JSON.stringify(result));
      
      return {info: result};

    } catch (e) {
      console.log('\nCaught exception: ' + e);
      if (e instanceof this.RpcError)
        console.log(JSON.stringify(e.json, null, 2));
      return {error: e.json};
    }
    return 'ok';
  }

};

export default new EosManager({});