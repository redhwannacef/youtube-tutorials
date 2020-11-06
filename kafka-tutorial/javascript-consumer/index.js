const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "js-app",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "my-group" });

const connect = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "kafka-tutorial", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value.toString();
      if (value.includes("js")) console.log(value);
    },
  });
};

connect().catch((reason) => console.error("Failed to connect ===>", reason));
