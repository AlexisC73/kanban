export const exhaustiveGuard = (value: never): never => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  throw new Error(`Exhaustive Guard Error : received value ${value}`)
}
