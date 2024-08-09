import { create } from 'zustand'

const useProduct = create((set) => (
    {
        product: [],
        setProduct: (arry) => set(state => ({product: arry}))
    }
))

export default useProduct