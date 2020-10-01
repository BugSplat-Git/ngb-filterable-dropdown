
export interface ItemCreatedEvent extends ItemsSelectedEvent {
    created: string;
    items: Array<string>;
}

export interface ItemsSelectedEvent {
    selectedItems: string | Array<string>;
}