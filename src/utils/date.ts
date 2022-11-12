export const stringToTime = (time: string) => {
  return new Date(time).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  })
}
