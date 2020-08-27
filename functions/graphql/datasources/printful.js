const { RESTDataSource } = require('apollo-datasource-rest');

class PrintfulAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.printful.com';
  }

  willSendRequest(request) {
    // console.log(Buffer.from(process.env.PRINTFUL_API_KEY).toString('base64'))

    request.headers.set(
      'Authorization',
      `Basic dmk2eGN1cWUtNTgxdi1mMmV0OmtiejgteHB2ZnhpZDVobW5q`
    );
  }

  async createOrder({ external_id, items, recipient }) {
    try {
      const { result: data } = await this.post(`orders`, {
        external_id,
        items,
        recipient,
      });

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  async estimateOrderCosts({ items, recipient }) {
    try {
      const { result: data } = await this.post(`orders/estimate-costs`, {
        items,
        recipient,
      });

      return undefined;
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = PrintfulAPI;
