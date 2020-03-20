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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyYWJsZS1kcm9wZG93bi5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9maWx0ZXJhYmxlLWRyb3Bkb3duLyIsInNvdXJjZXMiOlsibGliL2ZpbHRlcmFibGUtZHJvcGRvd24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFLeEU7SUFBQTtJQVV3QyxDQUFDOztnQkFWeEMsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLDJCQUEyQixFQUFFLGVBQWUsQ0FBQztvQkFDNUQsT0FBTyxFQUFFLENBQUMsV0FBVzt3QkFDbkIsbUJBQW1CO3dCQUNuQixZQUFZO3dCQUNaLFNBQVM7d0JBQ1QsaUJBQWlCO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztpQkFDdkM7O0lBQ3VDLCtCQUFDO0NBQUEsQUFWekMsSUFVeUM7U0FBNUIsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xuaW1wb3J0IHsgTmdiTW9kdWxlIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHsgRmlsdGVyYWJsZURyb3Bkb3duQ29tcG9uZW50IH0gZnJvbSAnLi9maWx0ZXJhYmxlLWRyb3Bkb3duLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNdWx0aVNlbGVjdFBpcGUgfSBmcm9tICcuL211bHRpLXNlbGVjdC1waXBlL211bHRpLXNlbGVjdC1waXBlJztcblxuXG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbRmlsdGVyYWJsZURyb3Bkb3duQ29tcG9uZW50LCBNdWx0aVNlbGVjdFBpcGVdLFxuICBpbXBvcnRzOiBbRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTmdiTW9kdWxlLFxuICAgIEZvbnRBd2Vzb21lTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtGaWx0ZXJhYmxlRHJvcGRvd25Db21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEZpbHRlcmFibGVEcm9wZG93bk1vZHVsZSB7IH1cbiJdfQ==