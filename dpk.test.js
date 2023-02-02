const { deterministicPartitionKey, TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH } = require("./dpk");

const HASH_FOR_EMPTY_OBJECT =
  "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862";

const HASH_FOR_MAX_PARTITION_KEY_LENGTH_A_CHARACTER =
  "5008048b64c14975181175f157be4a780c3d443d2177edf323d57884bc7e3979b9b53bca1325e880df3da0d97c435693441cb5527fbe950f5585678dfbb37785";

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const key = deterministicPartitionKey();
    expect(key).toBe(TRIVIAL_PARTITION_KEY);
  });

  describe('handle different partitionKey values', () => {
    it("Returns the same partitionKey if passed an string", () => {
      const partitionKey = '123'
      const trivialKey = deterministicPartitionKey({ partitionKey });
      expect(trivialKey).toBe(partitionKey);
    });

    it("Returns the JSON.stringify of the partitionKey if a non string value is provided", () => {
      const partitionKey = {}
      const trivialKey = deterministicPartitionKey({ partitionKey });
      expect(trivialKey).toBe('{}');
    });
  
    it("Returns the hash key when the partitionKey string is bigger than the max length", () => {
      const longString = 'a'.repeat(MAX_PARTITION_KEY_LENGTH + 1)
      const trivialKey = deterministicPartitionKey({ partitionKey: longString });
      expect(trivialKey).toBe(HASH_FOR_MAX_PARTITION_KEY_LENGTH_A_CHARACTER);
    });
  })

  describe('handle different event values', () => {
    it("Returns the correct key for the empty object value", () => {
      const trivialKey = deterministicPartitionKey({});
      expect(trivialKey).toBe(HASH_FOR_EMPTY_OBJECT);
    });
  })
});
