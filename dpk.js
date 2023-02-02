const crypto = require("crypto");
const { isString } = require('./utils')

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

function createHash(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

function obtainPartitionKeyValue(partitionKey) {
  return isString(partitionKey)
    ? partitionKey
    : JSON.stringify(partitionKey);
}

exports.deterministicPartitionKey = (event) => {
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event?.partitionKey) {
    const { partitionKey } = event;
    candidate = obtainPartitionKeyValue(partitionKey);
  } else if (event) {
    const data = JSON.stringify(event);
    candidate = createHash(data);
  }

  return candidate.length > MAX_PARTITION_KEY_LENGTH ? createHash(candidate) : candidate
};

exports.TRIVIAL_PARTITION_KEY = TRIVIAL_PARTITION_KEY;
exports.MAX_PARTITION_KEY_LENGTH = MAX_PARTITION_KEY_LENGTH;