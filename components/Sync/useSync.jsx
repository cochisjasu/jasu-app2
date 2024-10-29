import { ApolloError, useMutation } from "@apollo/client"
import { useSnackbar } from "notistack"
import { useMemo } from "react"
import {syncAll, syncFruitCategory, syncPresentationCategory, syncFruit, syncFruitVariety, syncPresentation, syncProduct, syncPricesData, syncHarvestsData} from "../Queries/sync.graphql"

export default function useSync() {
    const {enqueueSnackbar} = useSnackbar()

    /**
     * Despliega error apollo
     * @param {ApolloError} error 
     */
    const onError = (error) => {
        enqueueSnackbar(error.message, {variant:'error'})
    }

    const [allMutation, {loading: allLoading}] = useMutation(syncAll, {onError})
    const [fruitCategoryMutation, {loading: fruitCategoryLoading}] = useMutation(syncFruitCategory, {onError})
    const [presentationCategoryMutation, {loading: presentationCategoryLoading}] = useMutation(syncPresentationCategory, {onError})
    const [fruitMutation, {loading: fruitLoading}] = useMutation(syncFruit, {onError})
    const [fruitVarietyMutation, {loading: fruitVarietyLoading}] = useMutation(syncFruitVariety, {onError})
    const [presentationMutation, {loading: presentationLoading}] = useMutation(syncPresentation, {onError})
    const [productMutation, {loading: productLoading}] = useMutation(syncProduct, {onError})
    const [priceMutation, {loading: priceLoading}] = useMutation(syncPricesData, {onError})
    const [harvestMutation, {loading: harvestLoading}] = useMutation(syncHarvestsData, {onError})

    /**
     * @type {Boolean}
     */
    const loading = useMemo(() =>
        allLoading || fruitCategoryLoading || presentationCategoryLoading || fruitLoading || fruitVarietyLoading || presentationLoading || productLoading || priceLoading || harvestLoading,
        [allLoading, fruitCategoryLoading, presentationCategoryLoading, fruitLoading, fruitVarietyLoading, presentationLoading, productLoading, priceLoading, harvestLoading]
    )

    return {
        allMutation,
        fruitCategoryMutation,
        presentationCategoryMutation,
        fruitMutation,
        fruitVarietyMutation,
        presentationMutation,
        productMutation,
        priceMutation,
        harvestMutation,
        loading
    }
}