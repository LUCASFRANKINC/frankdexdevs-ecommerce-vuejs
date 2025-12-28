/*
 * Copyright (c) 2025.
 * Last Modified :12/24/25, 9:41 AM.
 * Frank Dex Devs.
 * All rights Reserved to Lucas Francis K.
 */

interface Rating {
  rate: number
  count: number
}
export default interface Product {
  id: number
  image: string
  rating: Rating
  title: string
  category: string
  price: number
  description: string
}
