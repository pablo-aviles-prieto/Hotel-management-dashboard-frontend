export function mockAPICall<T>(data: T , time = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), time));
}
