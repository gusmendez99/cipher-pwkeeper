var keychainModule = require("../keeper/keychain");
const { request, response } = require("express");

const keyChainClass = keychainModule.keychain;

const keychain = new keyChainClass();

const init = (request, response) => {
  const password = request.body;

  keychain.init(password);

  if (keychain.keys.salt === null && keychain.keys.authKey === null 
    && keychain.keys.hmacKey === null && keychain.keys.gcmKey === null){
    response.status(400).json("{ error: Keychain failed to be initialized}")
  } else {
    response.status(200).json("{ message: keychain initialized successfully }");
  }
};

const set = (request, response) => {
  const {name, value} = request.body;
  if (name === "" || value === ""){
    response.status(400).json("{ error: Name and value must not be empty}")
  } else {
    keychain.set(name,value)
    response.status(200).json("message: Set executed correctly");
  }
};

const getByName = (request, response) => {
  const name = request.body;
  console.log(name)
  const decrypted = keychain.get(name);
  console.log(decrypted)
  response.status(200).json(`message: ${decrypted}`)
}

const remove = (request, response) => {
  const name = request.params.name;
  const result = keychain.remove(name);
  if (!result){
    response.status(400).json('message: Service not found'); // ver que ondas con este error
  } else {
    response.status(200).json(`Removed password for service: ${name}`);
  }

}

const dump = (request, response) => {
  const data = keychain.dump();
  if (data === null){
    response.status(400).json('message: No data to dump'); // ver que ondas con este error
  } else {
    response.status(200).json(data)
  }
}

const load = (request, response) => {
  const { password, representation, trustedDataCheck } = request.body;
  const newKeychain = new keyChainClass();
  // console.log(password)
  // console.log(representation)
  // console.log(trustedDataCheck)
  const loadDone = newKeychain.load(password, representation, trustedDataCheck);
  if (!loadDone){
    response.status(400).json('message: Load failed'); // ver que ondas con este error
  } else {
    response.status(200).json('load made successfully');
  }

}

module.exports = {
  init,
  load,
  set,
  getByName,
  remove,
  dump
}