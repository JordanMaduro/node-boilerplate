import { delayMillis, foo, greet } from "./main";

afterEach(() => {
  jest.useRealTimers();
});

test("greeting", () => {
  expect(greet("Foo")).toBe("Hello Foo");
});

test("delayMillis", (done) => {
  jest.useFakeTimers();
  const mockFn = jest.fn();

  delayMillis(1000)
    .then(mockFn)
    .then(() => expect(mockFn).toBeCalledTimes(1))
    .then(done);

  expect(mockFn).not.toBeCalled();
  jest.advanceTimersByTime(1001);
});

test("foo", done => {
  jest.spyOn(global.console, 'log').mockImplementation()
  jest.useFakeTimers();
  const mockFn = jest.fn();

  foo().then(value => {
    expect(value).toBe(true)
  }).finally(done)
 
  expect(mockFn).not.toBeCalled();
  jest.advanceTimersByTime(1001);
})
