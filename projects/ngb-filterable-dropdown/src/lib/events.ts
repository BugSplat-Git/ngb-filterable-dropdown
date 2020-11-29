
export interface ItemCreatedEvent extends SelectionChangedEvent {
    created: string;
    items: Array<string>;
}

export interface SelectionChangedEvent {
    selection: string | Array<string>;
}

export interface OpenChangedEvent {
    open: boolean;
}
