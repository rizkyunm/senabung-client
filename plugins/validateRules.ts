import { defineNuxtPlugin} from '#app'
import { defineRule } from 'vee-validate'

export default defineNuxtPlugin((nuxtApp) => {
  defineRule('email', (value: string) => {
    // Field is empty, should pass
    if (!value || !value.length) {
      return true
    }
    // Check if email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    if (!regex.test(value)) {
      return 'Format harus email'
    }
    return true
  })

  defineRule('required', (value: string) => {
    if (!value || !value.length) {
      return ` Field ini harus diisi`
    }
    return true
  })

  defineRule('minLength', (value: string, [limit]: number[]) => {
    if (!value || !value.length) {
      return true
    }

    if (value.length < limit) {
      return `Field ini tidak boleh kurang dari ${limit} karakter`
    }
    return true
  })

  defineRule('maxLength', (value: string, [limit]: number[]) => {
    if (!value || !value.length) {
      return true
    }

    if (value.length > limit) {
      return `Field ini tidak boleh lebih dari ${limit} karakter`
    }
    return true
  })

  defineRule('password', (value: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i
    if (!value || !value.length) {
      return true
    }

    if (!regex.test(value)) {
      return 'Password minimal 8 karakter, mengandung huruf besar, huruf kecil, angka, dan karakter spesial'
    }
    return true
  })

  defineRule('number', (value: string) => {
    const regex = /^\d+$/
    if (!value || !value.length) {
      return true
    }

    if (!regex.test(value)) {
      return 'Field ini harus berisi angka'
    }
    return true
  })

  defineRule('confirmed', (value: string, [target]: string[], ctx) => {
    if (!value || !value.length) {
      return true
    }

    if (value === ctx.form[target]) {
      return true
    }

    return 'Password tidak sama'
  })
})
