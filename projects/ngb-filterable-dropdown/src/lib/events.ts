
export interface ItemCreatedEvent extends SelectionChangedEvent {
    created: string;
    items: Array<string>;
}

export interface SelectionChangedEvent {
    selectedItems: string | Array<string>;
}

export interface OpenChangedEvent {
    open: boolean;
}