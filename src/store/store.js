import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useProduct = create(persist((set) => (
    {
        product: [],
        setProduct: (arry) => set(state => ({product: arry}))
    }
),
{
    name: "ecommerce-state"
}))

export default useProduct