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
        if (val.length === 0) {
            return MultiSelectPipe.ALL_ITEMS_STRING;
        }
        else if (val.length === 1) {
            return val[0];
        }
        else {
            return MultiSelectPipe.MULTIPLE_ITEMS_STRING;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LXBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9maWx0ZXJhYmxlLWRyb3Bkb3duLyIsInNvdXJjZXMiOlsibGliL211bHRpLXNlbGVjdC1waXBlL211bHRpLXNlbGVjdC1waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFpQixJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHcEQ7SUFBQTtJQWlCQSxDQUFDOzs7OztJQVRDLG1DQUFTOzs7O0lBQVQsVUFBVSxHQUFrQjtRQUMxQixJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLE9BQU8sZUFBZSxDQUFDLGdCQUFnQixDQUFDO1NBQ3pDO2FBQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUMzQixPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNmO2FBQU07WUFDTCxPQUFPLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQztTQUM5QztJQUNILENBQUM7SUFYc0IsZ0NBQWdCLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLHFDQUFxQixHQUFHLFVBQVUsQ0FBQzs7Z0JBTjNELElBQUksU0FBQztvQkFDSixJQUFJLEVBQUUsYUFBYTtpQkFDcEI7O0lBZUQsc0JBQUM7Q0FBQSxBQWpCRCxJQWlCQztTQWRZLGVBQWU7OztJQUUxQixpQ0FBZ0Q7O0lBQ2hELHNDQUEwRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGVUcmFuc2Zvcm0sIFBpcGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBGaWx0ZXJhYmxlSXRlbSB9IGZyb20gJy4uL2ZpbHRlcmFibGUtZHJvcGRvd24uY29tcG9uZW50JztcclxuXHJcbkBQaXBlKHtcclxuICBuYW1lOiAnbXVsdGlTZWxlY3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuXHJcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBBTExfSVRFTVNfU1RSSU5HID0gXCJBbGxcIjtcclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IE1VTFRJUExFX0lURU1TX1NUUklORyA9IFwiTXVsdGlwbGVcIjtcclxuXHJcbiAgdHJhbnNmb3JtKHZhbDogQXJyYXk8c3RyaW5nPik6IHN0cmluZyB7XHJcbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gTXVsdGlTZWxlY3RQaXBlLkFMTF9JVEVNU19TVFJJTkc7XHJcbiAgICB9IGVsc2UgaWYgKHZhbC5sZW5ndGggPT09IDEpIHtcclxuICAgICAgcmV0dXJuIHZhbFswXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBNdWx0aVNlbGVjdFBpcGUuTVVMVElQTEVfSVRFTVNfU1RSSU5HO1xyXG4gICAgfVxyXG4gIH1cclxufSJdfQ==