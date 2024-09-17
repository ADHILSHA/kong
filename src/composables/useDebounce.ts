export function useDebounce<T>(func: (args: T) => void, delay: number) {
  let timer: any
  return (args: T) => {
    clearTimeout(timer)
    timer = setTimeout(() => func(args), delay)
  }
}