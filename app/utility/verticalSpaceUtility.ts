
export function splitVerticalSpace(a: number, b: number, max: number) {

  if (a ==0 || b === 0) {
    return [max, max]
  }
  else {
    return [max / 2, max / 2]
  }
}
