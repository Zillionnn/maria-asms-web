
export const formatTime = (ms) => {
  if (ms) {
    let t = new Date(ms)
    const year = t.getFullYear()
    const month = t.getMonth() + 1
    const date = t.getDate()
    let hour = t.getHours()
    let minute = t.getMinutes()
    let second = t.getSeconds()
    if (hour < 10) {
      hour = '0' + hour
    }
    if (minute < 10) {
      minute = '0' + minute
    }
    if (second < 10) {
      second = '0' + second
    }
    const localTime = `${year}-${month}-${date} ${hour}:${minute}:${second}`
    return localTime
  }
}

export const toLocalDate = (ms) => {
  if (ms) {
    let t = new Date(ms)
    const year = t.getFullYear()
    const month = t.getMonth() + 1
    const date = t.getDate()
    let hour = t.getHours()
    let minute = t.getMinutes()
    let second = t.getSeconds()
    if (hour < 10) {
      hour = '0' + hour
    }
    if (minute < 10) {
      minute = '0' + minute
    }
    if (second < 10) {
      second = '0' + second
    }
    const localTime = `${year}-${month}-${date}`
    return localTime
  }
}

export const toLocalTime = (ms) => {
  if (ms) {
    let t = new Date(ms)
    // const year = t.getFullYear()
    // const month = t.getMonth() + 1
    // const date = t.getDate()
    let hour = t.getHours()
    let minute = t.getMinutes()
    let second = t.getSeconds()
    if (hour < 10) {
      hour = '0' + hour
    }
    if (minute < 10) {
      minute = '0' + minute
    }
    if (second < 10) {
      second = '0' + second
    }
    const localTime = `${hour}:${minute}:${second}`
    return localTime
  }
}
