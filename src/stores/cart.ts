/*
 * Copyright (c) 2025.
 * Last Modified :12/28/25, 9:59 AM.
 * Frank Dex Devs.
 * All rights Reserved to Lucas Francis K.
 */
import { reactive } from 'vue'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

export const useCartStore = defineStore('cart', () => {
  const cartObjects = reactive(new Map())

  function addObject(k: string | number, method: string = 'add') {
    if (cartObjects.has(k)) {
      const init = cartObjects.get(k)
      const val = method === 'add' ? init + 1 : init - 1
      if (val < 1) {
       return deleteObj(k)
      }
      return cartObjects.set(k, val)
    }
    cartObjects.set(k, 1)
    Swal.fire({
      toast: true,
      timerProgressBar: true,
      position: 'top-end',
      timer: 3000,
      title: 'Cheers',
      text: 'Item successfully added to cart',
      topLayer: true,
      icon: 'success',
    })
    return cartObjects
  }

  function deleteObj(k: string | number) {
    Swal.fire({
      title: 'Clear Item',
      text: `Remove item ${k} from cart`,
      icon: 'error',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Proceed?',
      denyButtonText: 'Cancel',
      footer: 'Powered by Frank Dex Devs&reg;',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          cartObjects.delete(k)
          Swal.fire({
            toast: true,
            position: 'top-end',
            timer: 3000,
            timerProgressBar: true,
            title: 'Success',
            text: 'Item removed from cart',
            icon: 'success',
            topLayer: true,
          })
        } catch (e) {
          if (e instanceof Error) console.error(e.message)
        }
      }
    })
    return cartObjects
  }

  return { cartObjects, addObject, deleteObj }
})
