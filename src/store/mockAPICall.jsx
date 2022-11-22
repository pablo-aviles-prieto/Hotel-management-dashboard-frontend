export function mockAPICall(data, time = 500) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(data), time)
  );
}
