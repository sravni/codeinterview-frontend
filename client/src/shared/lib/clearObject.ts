export const clearObject = (data: Record<string, any>) => { 
    // @ts-ignore
    return  Object.entries(data).reduce((a,[k,v]) => (v !== '' && typeof v !== "undefined" && v !== null ? (a[k]=v, a) : a), {})
}