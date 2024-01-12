const timeoutFallback = 2000;
export const timeout: number =
  process.env.NEXT_PUBLIC_FORM_SUBMIT_TIMEOUT &&
  !isNaN(Number.parseInt(process.env.NEXT_PUBLIC_FORM_SUBMIT_TIMEOUT, 10))
    ? Number.parseInt(process.env.NEXT_PUBLIC_FORM_SUBMIT_TIMEOUT, 10)
    : timeoutFallback;
