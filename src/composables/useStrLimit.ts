/*
 * Copyright (c) 2025.
 * Last Modified :12/22/25, 8:52 AM.
 * Frank Dex Devs.
 * All rights Reserved to Lucas Francis K.
 */

export function useStrLimit() {
  function limit(text:string, count:number) {
    return text.slice(0, count) + (text.length > count ? '...' : '')
  }

  return { limit }
}
