export interface BaseData {
    startDate?: Date,
    endDate?: Date,
}

export interface Entry<T  extends BaseData = object> {
    id: string;
    content: string
    data?: T
}