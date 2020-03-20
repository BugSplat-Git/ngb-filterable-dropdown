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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LXBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9maWx0ZXJhYmxlLWRyb3Bkb3duLyIsInNvdXJjZXMiOlsibGliL211bHRpLXNlbGVjdC1waXBlL211bHRpLXNlbGVjdC1waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFpQixJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNcEQsTUFBTSxPQUFPLGVBQWU7Ozs7O0lBSzFCLFNBQVMsQ0FBQyxHQUFrQjtRQUMxQixJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLE9BQU8sZUFBZSxDQUFDLGdCQUFnQixDQUFDO1NBQ3pDO2FBQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUMzQixPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNmO2FBQU07WUFDTCxPQUFPLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQztTQUM5QztJQUNILENBQUM7O0FBWHNCLGdDQUFnQixHQUFHLEtBQUssQ0FBQztBQUN6QixxQ0FBcUIsR0FBRyxVQUFVLENBQUM7O1lBTjNELElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsYUFBYTthQUNwQjs7OztJQUdDLGlDQUFnRDs7SUFDaEQsc0NBQTBEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZVRyYW5zZm9ybSwgUGlwZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEZpbHRlcmFibGVJdGVtIH0gZnJvbSAnLi4vZmlsdGVyYWJsZS1kcm9wZG93bi5jb21wb25lbnQnO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdtdWx0aVNlbGVjdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE11bHRpU2VsZWN0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEFMTF9JVEVNU19TVFJJTkcgPSBcIkFsbFwiO1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTVVMVElQTEVfSVRFTVNfU1RSSU5HID0gXCJNdWx0aXBsZVwiO1xyXG5cclxuICB0cmFuc2Zvcm0odmFsOiBBcnJheTxzdHJpbmc+KTogc3RyaW5nIHtcclxuICAgIGlmICh2YWwubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBNdWx0aVNlbGVjdFBpcGUuQUxMX0lURU1TX1NUUklORztcclxuICAgIH0gZWxzZSBpZiAodmFsLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICByZXR1cm4gdmFsWzBdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIE11bHRpU2VsZWN0UGlwZS5NVUxUSVBMRV9JVEVNU19TVFJJTkc7XHJcbiAgICB9XHJcbiAgfVxyXG59Il19