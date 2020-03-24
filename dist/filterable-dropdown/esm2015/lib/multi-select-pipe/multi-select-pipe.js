/**
 * @fileoverview added by tsickle
 * Generated from: lib/multi-select-pipe/multi-select-pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from "@angular/core";
export class MultiSelectPipe {
    /**
     * @param {?} val
     * @return {?}
     */
    transform(val) {
        if (typeof val === "string") {
            if (!val) {
                return MultiSelectPipe.ALL_ITEMS_STRING;
            }
            else {
                return val;
            }
        }
        else if (val instanceof Array) {
            if (val.length === 0) {
                return MultiSelectPipe.ALL_ITEMS_STRING;
            }
            else if (val.length === 1) {
                return val[0];
            }
            else {
                return MultiSelectPipe.MULTIPLE_ITEMS_STRING;
            }
        }
    }
}
MultiSelectPipe.ALL_ITEMS_STRING = "All";
MultiSelectPipe.MULTIPLE_ITEMS_STRING = "Multiple";
MultiSelectPipe.decorators = [
    { type: Pipe, args: [{
                name: 'multiSelect'
            },] }
];
if (false) {
    /** @type {?} */
    MultiSelectPipe.ALL_ITEMS_STRING;
    /** @type {?} */
    MultiSelectPipe.MULTIPLE_ITEMS_STRING;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LXBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9maWx0ZXJhYmxlLWRyb3Bkb3duLyIsInNvdXJjZXMiOlsibGliL211bHRpLXNlbGVjdC1waXBlL211bHRpLXNlbGVjdC1waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFpQixJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNcEQsTUFBTSxPQUFPLGVBQWU7Ozs7O0lBSzFCLFNBQVMsQ0FBQyxHQUEyQjtRQUNuQyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtZQUMzQixJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNSLE9BQU8sZUFBZSxDQUFDLGdCQUFnQixDQUFDO2FBQ3pDO2lCQUNJO2dCQUNILE9BQU8sR0FBRyxDQUFDO2FBQ1o7U0FDRjthQUNJLElBQUksR0FBRyxZQUFZLEtBQUssRUFBRTtZQUM3QixJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNwQixPQUFPLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQzthQUN6QztpQkFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUMzQixPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNmO2lCQUFNO2dCQUNMLE9BQU8sZUFBZSxDQUFDLHFCQUFxQixDQUFDO2FBQzlDO1NBQ0Y7SUFDSCxDQUFDOztBQXJCc0IsZ0NBQWdCLEdBQUcsS0FBSyxDQUFDO0FBQ3pCLHFDQUFxQixHQUFHLFVBQVUsQ0FBQzs7WUFOM0QsSUFBSSxTQUFDO2dCQUNKLElBQUksRUFBRSxhQUFhO2FBQ3BCOzs7O0lBR0MsaUNBQWdEOztJQUNoRCxzQ0FBMEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlVHJhbnNmb3JtLCBQaXBlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRmlsdGVyYWJsZUl0ZW0gfSBmcm9tICcuLi9maWx0ZXJhYmxlLWRyb3Bkb3duLmNvbXBvbmVudCc7XHJcblxyXG5AUGlwZSh7XHJcbiAgbmFtZTogJ211bHRpU2VsZWN0J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3RQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQUxMX0lURU1TX1NUUklORyA9IFwiQWxsXCI7XHJcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBNVUxUSVBMRV9JVEVNU19TVFJJTkcgPSBcIk11bHRpcGxlXCI7XHJcblxyXG4gIHRyYW5zZm9ybSh2YWw6IEFycmF5PHN0cmluZz4gfCBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgaWYgKCF2YWwpIHtcclxuICAgICAgICByZXR1cm4gTXVsdGlTZWxlY3RQaXBlLkFMTF9JVEVNU19TVFJJTkc7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodmFsIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gTXVsdGlTZWxlY3RQaXBlLkFMTF9JVEVNU19TVFJJTkc7XHJcbiAgICAgIH0gZWxzZSBpZiAodmFsLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIHJldHVybiB2YWxbMF07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIE11bHRpU2VsZWN0UGlwZS5NVUxUSVBMRV9JVEVNU19TVFJJTkc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0iXX0=