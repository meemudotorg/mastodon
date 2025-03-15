export function uuid(a?: string): string {
  const randomValues = new Uint8Array(1);
  return a
    ? (
        (a as unknown as number) ^
        (crypto.getRandomValues(randomValues)[0] >> ((a as unknown as number) / 4))
      ).toString(16)
    : // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      ('' + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
}
