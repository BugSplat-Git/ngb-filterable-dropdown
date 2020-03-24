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
export class FilterableDropdownModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyYWJsZS1kcm9wZG93bi5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9maWx0ZXJhYmxlLWRyb3Bkb3duLyIsInNvdXJjZXMiOlsibGliL2ZpbHRlcmFibGUtZHJvcGRvd24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFZeEUsTUFBTSxPQUFPLHdCQUF3Qjs7O1lBVnBDLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxlQUFlLENBQUM7Z0JBQzVELE9BQU8sRUFBRSxDQUFDLFdBQVc7b0JBQ25CLG1CQUFtQjtvQkFDbkIsWUFBWTtvQkFDWixTQUFTO29CQUNULGlCQUFpQjtpQkFDbEI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsMkJBQTJCLENBQUM7YUFDdkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRm9udEF3ZXNvbWVNb2R1bGUgfSBmcm9tICdAZm9ydGF3ZXNvbWUvYW5ndWxhci1mb250YXdlc29tZSc7XHJcbmltcG9ydCB7IE5nYk1vZHVsZSB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcclxuaW1wb3J0IHsgRmlsdGVyYWJsZURyb3Bkb3duQ29tcG9uZW50IH0gZnJvbSAnLi9maWx0ZXJhYmxlLWRyb3Bkb3duLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE11bHRpU2VsZWN0UGlwZSB9IGZyb20gJy4vbXVsdGktc2VsZWN0LXBpcGUvbXVsdGktc2VsZWN0LXBpcGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtGaWx0ZXJhYmxlRHJvcGRvd25Db21wb25lbnQsIE11bHRpU2VsZWN0UGlwZV0sXHJcbiAgaW1wb3J0czogW0Zvcm1zTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIE5nYk1vZHVsZSxcclxuICAgIEZvbnRBd2Vzb21lTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbRmlsdGVyYWJsZURyb3Bkb3duQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmlsdGVyYWJsZURyb3Bkb3duTW9kdWxlIHsgfVxyXG4iXX0=