import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@WebSocketGateway()
export class RoutesGateway implements OnModuleInit {
  private kafkaProducer: Producer;

  constructor(
    @Inject('KAFKA_SERVICE')
    private kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaProducer = await this.kafkaClient.connect();
  }
  @SubscribeMessage('new-direction')
  handleMessage(client: any, payload: any): any {
    // this.kafkaProducer.send({
    //   topic: 'route.new-direction',
    //   messages: [
    //     {
    //       key: 'route.new-direction',
    //       value: JSON.stringify({ routeId: id, clientId: '' }),
    //     },
    //   ],
    // });
    console.log(payload);
  }
}
