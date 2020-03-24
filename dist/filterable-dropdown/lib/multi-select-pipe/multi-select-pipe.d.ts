import { PipeTransform } from "@angular/core";
export declare class MultiSelectPipe implements PipeTransform {
    static readonly ALL_ITEMS_STRING = "All";
    static readonly MULTIPLE_ITEMS_STRING = "Multiple";
    transform(val: Array<string> | string): string;
}
