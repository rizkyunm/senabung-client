export default function PhonePrefixRemover(phoneNumber: string): string {
  if (phoneNumber.startsWith('+62')) {
    return phoneNumber.slice(3)
  }

  if (phoneNumber.startsWith('08')) {
    return phoneNumber.slice(1)
  }

  if (phoneNumber.startsWith('62')) {
    return phoneNumber.slice(2)
  }

  return phoneNumber
}
