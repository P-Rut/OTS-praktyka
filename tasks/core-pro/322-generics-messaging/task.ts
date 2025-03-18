interface Message {
  type: MessageType;
}

interface MessageMap {
  orderCreated: OrderCreatedMessage;
  orderCancelled: OrderCancelledMessage;
}
type MessageType = keyof MessageMap;

interface Order {
  orderId: string;
  items: { productId: string; quantity: number }[];
}

export interface OrderCreatedMessage {
  type: 'orderCreated';
  payload: Order;
}

export interface OrderCancelledMessage {
  type: 'orderCancelled';
  payload: { orderId: string };
}

type Orders = {
  type: MessageType;
  value: [];
};

export class MessageBus {
  private subscribers: Partial<Record<MessageType, Array<(message: any) => void>>> = {};

  subscribe<T extends MessageType>(type: T, subscriber: (message: MessageMap[T]) => void): void {
    this.subscribers[type] = this.subscribers[type] || [];
    this.subscribers[type].push(subscriber);
  }

  publish<T extends Message>(message: T): void {
    const subs = this.subscribers[message.type as keyof MessageType];
    if (subs) {
      subs.forEach((f) => {
        f(message);
      });
    }
  }
}

export class InventoryStockTracker {
  private orders: Record<string, Order> = {};
  constructor(
    private bus: MessageBus,
    private stock: Record<string, number>,
  ) {
    this.subscribeToMessages();
  }

  private subscribeToMessages(): void {
    this.bus.subscribe('orderCreated', (message: OrderCreatedMessage) => {
      this.orders[message.payload.orderId] = message.payload;

      message.payload.items.forEach((item) => {
        this.stock[item.productId] = this.getStock(item.productId) - item.quantity;
      });
    });

    this.bus.subscribe('orderCancelled', (message: OrderCancelledMessage) => {
      const order = this.orders[message.payload.orderId];

      order.items.forEach((item) => {
        this.stock[item.productId] = this.getStock(item.productId) + item.quantity;
      });

      delete this.orders[message.payload.orderId];
    });
  }

  getStock(productId: string): number {
    return this.stock[productId] || 0;
  }
}
