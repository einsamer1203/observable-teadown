interface Observer<T> {
  next(value: T): void;
  error(err: any): void;
  complete(): void;
}

type Teardown = () => void;

class Observable<T> {
  constructor(private init: (observer: Observer<T>) => Teardown) {}

  subscribe(observer: Observer<T>) {
    return this.init(observer);
  }
}

const myOnservable = new Observable((observer: Observer<number>) => {
  let i = 1;

  const id = setInterval(() => {
    observer.next(i++);
  }, 1000);

  return () => {
    clearInterval(id);
  };
});

const teardown = myOnservable.subscribe({
  next: (d) => console.log(d),
  error: (err) => console.error(err),
  complete: () => console.log('completed!'),
});
setTimeout(() => {
  teardown();
}, 5001);
