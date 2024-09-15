import { twMerge } from 'tailwind-merge'

export function classNames(
  ...classes: (string | boolean | undefined)[]
) {
  return twMerge(classes.filter(Boolean).join(' '))
}
