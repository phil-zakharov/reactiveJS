type SubscriberFn<T> = (...values: T[]) => void;

export class Subscriber<T = unknown> {
  private subs = new Set<SubscriberFn<T>>();

  subscribe(sub: SubscriberFn<T>) {
    this.subs.add(sub);
  }

  unsubscribe(sub: SubscriberFn<T>) {
    this.subs.delete(sub);
  }

  runSubs(...values: T[]) {
    this.subs.forEach((sub) => sub(...values));
  }
}