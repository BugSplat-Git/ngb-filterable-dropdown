/**
 * @fileoverview added by tsickle
 * Generated from: lib/multi-select-pipe/multi-select-pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from "@angular/core";
var MultiSelectPipe = /** @class */ (function () {
    function MultiSelectPipe() {
    }
    /**
     * @param {?} val
     * @return {?}
     */
    MultiSelectPipe.prototype.transform = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
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
    };
    MultiSelectPipe.ALL_ITEMS_STRING = "All";
    MultiSelectPipe.MULTIPLE_ITEMS_STRING = "Multiple";
    MultiSelectPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'multiSelect'
                },] }
    ];
    return MultiSelectPipe;
}());
export { MultiSelectPipe };
if (false) {
    /** @type {?} */
    MultiSelectPipe.ALL_ITEMS_STRING;
    /** @type {?} */
    MultiSelectPipe.MULTIPLE_ITEMS_STRING;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LXBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9maWx0ZXJhYmxlLWRyb3Bkb3duLyIsInNvdXJjZXMiOlsibGliL211bHRpLXNlbGVjdC1waXBlL211bHRpLXNlbGVjdC1waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFpQixJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHcEQ7SUFBQTtJQTJCQSxDQUFDOzs7OztJQW5CQyxtQ0FBUzs7OztJQUFULFVBQVUsR0FBMkI7UUFDbkMsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7WUFDM0IsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDUixPQUFPLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQzthQUN6QztpQkFDSTtnQkFDSCxPQUFPLEdBQUcsQ0FBQzthQUNaO1NBQ0Y7YUFDSSxJQUFJLEdBQUcsWUFBWSxLQUFLLEVBQUU7WUFDN0IsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDcEIsT0FBTyxlQUFlLENBQUMsZ0JBQWdCLENBQUM7YUFDekM7aUJBQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDM0IsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDZjtpQkFBTTtnQkFDTCxPQUFPLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQzthQUM5QztTQUNGO0lBQ0gsQ0FBQztJQXJCc0IsZ0NBQWdCLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLHFDQUFxQixHQUFHLFVBQVUsQ0FBQzs7Z0JBTjNELElBQUksU0FBQztvQkFDSixJQUFJLEVBQUUsYUFBYTtpQkFDcEI7O0lBeUJELHNCQUFDO0NBQUEsQUEzQkQsSUEyQkM7U0F4QlksZUFBZTs7O0lBRTFCLGlDQUFnRDs7SUFDaEQsc0NBQTBEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZVRyYW5zZm9ybSwgUGlwZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEZpbHRlcmFibGVJdGVtIH0gZnJvbSAnLi4vZmlsdGVyYWJsZS1kcm9wZG93bi5jb21wb25lbnQnO1xyXG5cclxuQFBpcGUoe1xyXG4gIG5hbWU6ICdtdWx0aVNlbGVjdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE11bHRpU2VsZWN0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEFMTF9JVEVNU19TVFJJTkcgPSBcIkFsbFwiO1xyXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTVVMVElQTEVfSVRFTVNfU1RSSU5HID0gXCJNdWx0aXBsZVwiO1xyXG5cclxuICB0cmFuc2Zvcm0odmFsOiBBcnJheTxzdHJpbmc+IHwgc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGlmICh0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGlmICghdmFsKSB7XHJcbiAgICAgICAgcmV0dXJuIE11bHRpU2VsZWN0UGlwZS5BTExfSVRFTVNfU1RSSU5HO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHZhbCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgIGlmICh2YWwubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIE11bHRpU2VsZWN0UGlwZS5BTExfSVRFTVNfU1RSSU5HO1xyXG4gICAgICB9IGVsc2UgaWYgKHZhbC5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICByZXR1cm4gdmFsWzBdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBNdWx0aVNlbGVjdFBpcGUuTVVMVElQTEVfSVRFTVNfU1RSSU5HO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59Il19