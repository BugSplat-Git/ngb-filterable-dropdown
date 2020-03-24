/**
 * @fileoverview added by tsickle
 * Generated from: lib/filterable-dropdown.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterableDropdownComponent } from './filterable-dropdown.component';
import { MultiSelectPipe } from './multi-select-pipe/multi-select-pipe';
var FilterableDropdownModule = /** @class */ (function () {
    function FilterableDropdownModule() {
    }
    FilterableDropdownModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [FilterableDropdownComponent, MultiSelectPipe],
                    imports: [FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        NgbModule,
                        FontAwesomeModule
                    ],
                    exports: [FilterableDropdownComponent]
                },] }
    ];
    return FilterableDropdownModule;
}());
export { FilterableDropdownModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyYWJsZS1kcm9wZG93bi5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9maWx0ZXJhYmxlLWRyb3Bkb3duLyIsInNvdXJjZXMiOlsibGliL2ZpbHRlcmFibGUtZHJvcGRvd24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFFeEU7SUFBQTtJQVV3QyxDQUFDOztnQkFWeEMsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLDJCQUEyQixFQUFFLGVBQWUsQ0FBQztvQkFDNUQsT0FBTyxFQUFFLENBQUMsV0FBVzt3QkFDbkIsbUJBQW1CO3dCQUNuQixZQUFZO3dCQUNaLFNBQVM7d0JBQ1QsaUJBQWlCO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztpQkFDdkM7O0lBQ3VDLCtCQUFDO0NBQUEsQUFWekMsSUFVeUM7U0FBNUIsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xyXG5pbXBvcnQgeyBOZ2JNb2R1bGUgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XHJcbmltcG9ydCB7IEZpbHRlcmFibGVEcm9wZG93bkNvbXBvbmVudCB9IGZyb20gJy4vZmlsdGVyYWJsZS1kcm9wZG93bi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNdWx0aVNlbGVjdFBpcGUgfSBmcm9tICcuL211bHRpLXNlbGVjdC1waXBlL211bHRpLXNlbGVjdC1waXBlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbRmlsdGVyYWJsZURyb3Bkb3duQ29tcG9uZW50LCBNdWx0aVNlbGVjdFBpcGVdLFxyXG4gIGltcG9ydHM6IFtGb3Jtc01vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBOZ2JNb2R1bGUsXHJcbiAgICBGb250QXdlc29tZU1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW0ZpbHRlcmFibGVEcm9wZG93bkNvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZpbHRlcmFibGVEcm9wZG93bk1vZHVsZSB7IH1cclxuIl19