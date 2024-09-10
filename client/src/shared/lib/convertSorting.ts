import { SorterResult } from "antd/lib/table/interface";

type RecordType = Record<string, string>
type TResult = string | string[];

export const convertFromAntd = (data: SorterResult<RecordType> | SorterResult<RecordType>[]): TResult | undefined => { 
    if (Array.isArray(data)) {
        console.log('Мультисортировка не реализована')
        return;
    }

    if (typeof data.order === "undefined") return;

    const direction = data.order === "ascend" ? '' : '-';
    return `${direction}${data.field}`
}