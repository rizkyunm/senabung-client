export function convertTimestamp(timestamp: string): string {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${day} ${mapMonth(month)} ${year} ${hours}:${minutes}`
}

const mapMonth = (month: number) => {
  switch (month) {
    case 1:
      return 'Januari'
    case 2:
      return 'Februari'
    case 3:
      return 'Maret'
    case 4:
      return 'April'
    case 5:
      return 'Mei'
    case 6:
      return 'Juni'
    case 7:
      return 'Juli'
    case 8:
      return 'Agustus'
    case 9:
      return 'September'
    case 10:
      return 'Oktober'
    case 11:
      return 'November'
    case 12:
      return 'Desember'
  }
}
