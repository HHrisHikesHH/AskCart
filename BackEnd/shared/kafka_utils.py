from confluent_kafka import Producer
import os
import json

KAFKA_BROKER = os.getenv("KAFKA_BROKER", "localhost:9092")

producer = Producer({"bootstrap.servers": KAFKA_BROKER})

def produce_event(topic: str, event: dict):
    producer.produce(topic, value=json.dumps(event))
    producer.flush()