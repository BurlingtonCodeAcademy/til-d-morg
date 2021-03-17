const { MongoClient, ObjectId } = require("mongodb");

class DataStore {
  constructor(dbUrl, database, collection) {
    (this.url = dbUrl), (this.dbName = database);
    this.collName = collection;
    this.isConnected = false;
  }
  //------------------------------opens connection to db-----------------------------------//
  async openConnect() {
    if (!this.isConnected) {
      const client = new MongoClient(this.url, { useUnifiedTopology: true });
      await client.connect();
      const dataBase = client.db(this.dbName);
      const collection = dataBase.collection(this.collName);
      this.isConnected = client;

      return collection;
    } else {
      const client = new MongoClient(this.url, { useUnifiedTopology: true });
      await client.connect();
      const dataBase = client.db(this.dbName);
      const collection = dataBase.collection(this.collName);
      this.isConnected = client;

      return collection;
    }
  }
  //--------------------------function to return all items in collection---------------------------//
  async getAll() {
    const collection = await this.openConnect();

    let cursor = await collection.find({});

    let resultArr = [];

    await cursor.forEach((document) => {
      resultArr.push(document);
    });

    return resultArr;
  }
  //------------------------search by specific key--------------------------------//

  async searchByKey(searchType, value) {
    const collection = await this.openConnect();
    //square brackets allow variables to be used as keys
    let cursor = await collection.find({ [searchType]: value });

    //iterate over cursor to store all documents
    let resultArr = [];

    await cursor.forEach((document) => {
      resultArr.push(document);
    });

    return resultArr;
  }
//-----------------------------made a specific function to search by _id----------------//
  async searchById(id) {
    const collection = await this.openConnect();

    let cursor = await collection.find({ _id: ObjectId(id) });

    let resultArr = [];

    await cursor.forEach((document) => {
      resultArr.push(document);
    });

    return resultArr;
  }

  //-----------------------------function to update----------------------------------//
  async updateEntry(targetId, update) {
    const collection = await this.openConnect();

    //update method takes two arguments
    //{looks for doc that matches criteria} {Update to be applied}
    await collection.updateOne({ _id: ObjectId(targetId) }, { $set: update });
  }
  //----------------------------function to remove entry--------------------------------------/

  async removeEntry(targetId) {
    const collection = await this.openConnect();

    //delete doc that matches query
    await collection.deleteOne({ _id: ObjectId(targetId) });
  }

  //--------------------------closes open connection--------------------------------//
  async closeConnect() {
    if (this.isConnected) {
      await this.isConnected.close();
    } else {
      console.log("No active connection");
    }
  }
}

module.exports = DataStore;
