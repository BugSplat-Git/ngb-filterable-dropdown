import { CommonModule } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { take, tap } from 'rxjs/operators';
import { NgbCustomFilterableDropdownComponent } from './ngb-custom-filterable-dropdown.component';
import { NgbFilterableDropdownSelectionMode } from '../ngb-filterable-drop-down-selection-mode';
import { InternalsModule } from '../internals/internals.module';
import { firstValueFrom } from 'rxjs';

describe('NgbCustomFilterableDropdownComponent', () => {
  let component: NgbCustomFilterableDropdownComponent;
  let fixture: ComponentFixture<NgbCustomFilterableDropdownComponent>;

  let filterItem: string;
  let items: Array<string>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule,
        ReactiveFormsModule,
        CommonModule,
        InternalsModule,
      ],
      declarations: [
        NgbCustomFilterableDropdownComponent,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NgbCustomFilterableDropdownComponent);
    component = fixture.componentInstance;
    filterItem = 'foo';
    items = [filterItem, 'bar', 'baz'];
    component.items = items;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate filtered with correct list of filtered items', () => {
    component.searchInput.setValue('oo');
    expect(component.filtered.has(filterItem)).toEqual(true);
    expect(component.filtered.has('baz')).toEqual(false);
  });

  it('should display list of items', () => {
    fixture.detectChanges();
    items.forEach(item => expect(fixture.nativeElement.textContent).toContain(item));
  });

  describe('selection', () => {
    describe('set', () => {
      it('should set nextToggleState to SELECT if input length is 0', () => {
        component.selection = [];

        expect(component.nextToggleState).toEqual(component.SELECT);
      });

      it('should set nextToggleState to DESELECT if input length is greater than 0', () => {
        component.selection = [filterItem];

        expect(component.nextToggleState).toEqual(component.DESELECT);
      });
    });
  });

  describe('isFiltered', () => {
    beforeEach(() => {
      component.searchInput.setValue(filterItem);
    });

    it('should should return true if item is selected', () => {
      expect(component.isFiltered(filterItem)).toEqual(true);
    });

    it('should set selected item when onItemSelect is called', () => {
      expect(component.isFiltered('baz')).toEqual(false);
    });
  });

  describe('isSelected', () => {
    beforeEach(() => {
      component.onItemSelect(filterItem);
    });

    it('should should return true if item is selected', () => {
      expect(component.isSelected(filterItem)).toEqual(true);
    });

    it('should set selected item when onItemSelect is called', () => {
      expect(component.isSelected('baz')).toEqual(false);
    });
  });

  describe('onCreateItem', () => {
    describe('when in mode that does not allow multi select', () => {

      beforeEach(() => component.selectionMode = NgbFilterableDropdownSelectionMode.SingleSelect);

      it('should select created item', () => {
        const item = '🎃';
        component.searchInput.setValue(item);

        component.onCreateItem();

        expect(component.selection).toEqual(item);
      });

      it('should emit created item, selection and items', async () => {
        const resultPromise = firstValueFrom(component.itemCreated)
        const item = '🎃';
        component.searchInput.setValue(item);

        component.onCreateItem();
        const result = await resultPromise;

        expect(result).toEqual(jasmine.objectContaining({
          created: item,
          selection: item,
          items: [...items, item]
        }));
      });
    });

    describe('when in mode that allows multi select', () => {

      beforeEach(() => component.selectionMode = NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone);

      it('should add created item to selection', () => {
        const item = '🎃';
        component.searchInput.setValue(item);
        component.selection = items;
        component.filtered = new Set(items);

        component.onCreateItem();

        expect(component.selection).toEqual([...items, item]);
      });

      it('should emit created item, selection and items', async () => {
        const resultPromise = firstValueFrom(component.itemCreated)
        const item = '🎃';
        component.searchInput.setValue(item);
        component.selection = items;
        component.filtered = new Set(items);

        component.onCreateItem();
        const result = await resultPromise;

        expect(result).toEqual(jasmine.objectContaining({
          created: item,
          selection: [...items, item],
          items: [...items, item]
        }));
      });
    });
  });

  describe('onDropdownClick', () => {
    let event;

    beforeEach(() => {
      component.dropdown = jasmine.createSpyObj('NgbDropdown', ['toggle']);
      event = jasmine.createSpyObj('MouseEvent', ['stopPropagation']);
    });

    describe('when disabled is true', () => {

      beforeEach(() => {
        component.disabled = true;
        component.onDropdownClick(event);
      });

      it('should call stopPropagation on click event', () => {
        expect(event.stopPropagation).toHaveBeenCalled();
      });

      it('should not call toggle on dropdown', () => {
        expect(component.dropdown.toggle).not.toHaveBeenCalled();
      });
    });

    describe('when disabled is false', () => {

      beforeEach(() => {
        component.disabled = false;
        component.onDropdownClick(event);
      });

      it('should not call stopPropagation on click event', () => {
        expect(event.stopPropagation).not.toHaveBeenCalled();
      });
    });
  });

  describe('onEnterKeyPressed', () => {

    describe('when allowCreateItem is false', () => {
      beforeEach(() => component.allowCreateItem = false);

      describe('and in mode that does not allow multi select', () => {
        beforeEach(() => component.selectionMode = NgbFilterableDropdownSelectionMode.SingleSelect);

        it('should select the first entry if filtered is not empty', () => {
          component.selection = '';

          component.onEnterKeyPressed();

          expect(component.selection).toEqual(items[0]);
        });

        it('should emit selection', async () => {
          const resultPromise = firstValueFrom(component.selectionChanged)
          component.selection = '';

          component.onEnterKeyPressed();
          const result = await resultPromise;

          expect(result).toEqual(jasmine.objectContaining({
            selection: items[0]
          }));
        });
      });

      describe('and in mode that allows multi select', () => {
        beforeEach(() => component.selectionMode = NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone);

        it('should add items to selection if filtered is not empty', () => {
          component.selection = [];

          component.onEnterKeyPressed();

          expect(component.selection).toEqual(items);
        });

        it('should emit selection', async () => {
          const resultPromise = firstValueFrom(component.selectionChanged)
          component.selection = [];

          component.onEnterKeyPressed();
          const result = await resultPromise;

          expect(result.selection).toEqual(items);
        });
      });
    });

    describe('when allowCreateItem is true', () => {
      beforeEach(() => component.allowCreateItem = true);

      describe('and in mode that does not allow multi select', () => {
        beforeEach(() => component.selectionMode = NgbFilterableDropdownSelectionMode.SingleSelect);

        it('should create item if filtered is empty', () => {
          const item = '🎃';
          component.filtered = new Set([]);
          component.searchInput.setValue(item);

          component.onEnterKeyPressed();

          expect(component.items).toEqual([...items, item]);
        });

        it('should select created item if filtered is empty', () => {
          const item = '🎃';
          component.filtered = new Set([]);
          component.searchInput.setValue(item);

          component.onEnterKeyPressed();

          expect(component.selection).toEqual(item);
        });

        it('should emit created selection and items', async () => {
          const resultPromise = firstValueFrom(component.itemCreated)
          const item = '🎃';
          component.filtered = new Set([]);
          component.searchInput.setValue(item);

          component.onEnterKeyPressed();
          const result = await resultPromise;

          expect(result).toEqual(jasmine.objectContaining({
            created: item,
            selection: item,
            items: [...items, item]
          }));
        });
      });

      describe('and in mode that allows multi select', () => {
        beforeEach(() => component.selectionMode = NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone);

        it('should create item if filtered is empty', () => {
          const item = '🎃';
          component.filtered = new Set([]);
          component.searchInput.setValue(item);

          component.onEnterKeyPressed();

          expect(component.items).toEqual([...items, item]);
        });

        it('should add created item to selected items if filtered is empty', () => {
          const item = '🎃';
          component.filtered = new Set([]);
          component.searchInput.setValue(item);

          component.onEnterKeyPressed();

          expect(component.selection).toEqual([item]);
        });

        it('should emit created, selection and items', async () => {
          const resultPromise = firstValueFrom(component.itemCreated)
          const item = '🎃';
          component.filtered = new Set([]);
          component.searchInput.setValue(item);

          component.onEnterKeyPressed();
          const result = await resultPromise;

          expect(result).toEqual(jasmine.objectContaining({
            created: item,
            selection: [item],
            items: [...items, item]
          }));
        });
      });
    });

    describe('autoClose', () => {
      beforeEach(() => component.dropdown = jasmine.createSpyObj('NgbDropdown', ['close']));

      it('should close dialog when enter key is pressed if autoClose is true', () => {
        component.autoClose = true;

        component.onEnterKeyPressed();

        expect(component.dropdown.close).toHaveBeenCalled();
      });

      it('should not close dialog when enter key is pressed if autoClose is false', () => {
        component.autoClose = false;

        component.onEnterKeyPressed();

        expect(component.dropdown.close).not.toHaveBeenCalled();
      });
    });
  });

  describe('onItemSelect', () => {

    describe('when in mode that does not allow multi select', () => {
      beforeEach(() => component.selectionMode = NgbFilterableDropdownSelectionMode.SingleSelect);

      it('should set item as selected', () => {
        const item = '🎃';
        component.selection = '';

        component.onItemSelect(item);

        expect(component.selection).toEqual(item);
      });

      it('should emit selected item as a string', async () => {
        const resultPromise = firstValueFrom(component.selectionChanged)
        const item = '🎃';
        component.selection = '';

        component.onItemSelect(item);
        const result = await resultPromise;

        expect(result).toEqual(jasmine.objectContaining({
          selection: item
        }));
      });
    });

    describe('when in mode that supports multi select', () => {
      beforeEach(() => component.selectionMode = NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone);

      it('should add item to selected items if not selected', () => {
        const item = '🎃';
        component.selection = [];

        component.onItemSelect(item);

        expect(component.selection).toEqual([item]);
      });

      it('should remove item from selected items if selected', () => {
        const item = '🎃';
        component.selection = [item];

        component.onItemSelect(item);

        expect(component.selection).toEqual([]);
      });

      it('should emit selected items as an array', async () => {
        const resultPromise = firstValueFrom(component.selectionChanged)
        const item = '🎃';
        component.selection = [];

        component.onItemSelect(item);
        const result = await resultPromise;

        expect(result).toEqual(jasmine.objectContaining({
          selection: [item]
        }));
      });
    });
  });

  describe('onOpenChange', () => {
    it('should emit event with open true if dialog is being opened', async () => {
      const resultPromise = firstValueFrom(component.openChanged)

      component.onOpenChange(true);
      const result = await resultPromise;

      expect(result.open).toEqual(true);
    });

    it('should emit event with open false if dialog is being closed', async () => {
      const resultPromise = firstValueFrom(component.openChanged)

      component.onOpenChange(false);
      const result = await resultPromise;

      expect(result.open).toEqual(false);
    });

    it('should clear filter text if dialog is being closed', () => {
      component.searchForm.controls['searchInput'].setValue(filterItem); // eslint-disable-line  @typescript-eslint/dot-notation
      component.onOpenChange(false);
      expect(component.searchForm.controls['searchInput'].value).toEqual('');  // eslint-disable-line  @typescript-eslint/dot-notation
    });
  });

  describe('onSelectAll', () => {

    beforeEach(() => component.selectionMode = NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone);

    it('should set nextToggleState to DESELECT', () => {
      component.nextToggleState = component.SELECT;

      component.onSelectAll();

      expect(component.nextToggleState).toEqual(component.DESELECT);
    });

    it('should set selected items to all items', () => {
      component.onSelectAll();

      expect(component.selection).toEqual(items);
    });

    it('should emit selected items as an array', async () => {
      const resultPromise = firstValueFrom(component.selectionChanged)

      component.onSelectAll();
      const result = await resultPromise;

      expect(result).toEqual(jasmine.objectContaining({
        selection: items
      }));
    });
  });

  describe('onSelectMultiple', () => {
    beforeEach(() => component.selectionMode = NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone);

    it('should set nextToggleState to DESELECT', () => {
      component.nextToggleState = component.SELECT;

      component.onSelectMultiple();

      expect(component.nextToggleState).toEqual(component.DESELECT);
    });

    it('should set selected items to filtered items', () => {
      component.onSelectMultiple();

      expect(component.selection).toEqual(items);
    });

    it('should emit selected items', async () => {
      const resultPromise = firstValueFrom(component.selectionChanged)

      component.onSelectMultiple();
      const result = await resultPromise;

      expect(result).toEqual(jasmine.objectContaining({
        selection: items
      }));
    });
  });

  describe('onSelectNone', () => {

    beforeEach(() => component.selectionMode = NgbFilterableDropdownSelectionMode.MultiSelectWithSelectAllSelectNone);

    it('should set nextToggledState to SELECT', () => {
      component.nextToggleState = component.DESELECT;

      component.onSelectNone();

      expect(component.nextToggleState).toEqual(component.SELECT);
    });

    it('should set selected items to empty array', () => {
      component.onSelectNone();

      expect(component.selection).toEqual([]);
    });

    it('should emit empty array', async () => {
      const resultPromise = firstValueFrom(component.selectionChanged)

      component.onSelectNone();
      const result = await resultPromise;

      expect(result).toEqual(jasmine.objectContaining({
        selection: []
      }));
    });
  });

  describe('loading', () => {
    it('should be hidden if loading false', () => {
      component.loading = false;

      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('#loading').hidden).toEqual(true);
    });

    it('should not disable searchInput if loading false', () => {
      component.loading = false;

      fixture.detectChanges();

      expect(component.searchInput.disabled).toEqual(false);
    });

    it('should not be hidden if loading true', () => {
      component.loading = true;

      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('#loading').hidden).toEqual(false);
    });

    it('should disable searchInput if loading false', () => {
      component.loading = true;

      fixture.detectChanges();

      expect(component.searchInput.disabled).toEqual(true);
    });
  });

  describe('noItemsToDisplay', () => {
    it('should not be hidden if filteredItems length is 0', () => {
      component.items = ['🍔'];
      component.searchInput.setValue('alsdkjfals');

      fixture.detectChanges();

      expect(component.noItemsToDisplay).toEqual(true);
      expect(fixture.nativeElement.querySelector('#no-items').hidden).toEqual(false);
    });

    it('should be hidden if filteredItems length is not 0', () => {
      const item = '🍕';
      component.items = [item];

      component.searchInput.setValue(item);
      fixture.detectChanges();

      expect(component.noItemsToDisplay).toEqual(false);
      expect(fixture.nativeElement.querySelector('#no-items').hidden).toEqual(true);
    });

    it('should be hidden if loading is true', () => {
      const item = '🍕';
      component.items = [item];
      component.searchInput.setValue('');
      component.loading = true;

      fixture.detectChanges();

      expect(component.noItemsToDisplay).toEqual(false);
      expect(fixture.nativeElement.querySelector('#no-items').hidden).toEqual(true);
    });
  });

  describe('showCreateItem', () => {
    it('should return false if searchInputValue length is 0', () => {
      component.searchInput.setValue('');

      fixture.detectChanges();

      expect(component.showCreateItem).toEqual(false);
      expect(fixture.nativeElement.querySelector('#create-item').hidden).toEqual(true);
    });

    it('should return false if allowCreateItem is false', () => {
      component.searchInput.setValue('🎃');
      component.allowCreateItem = false;

      fixture.detectChanges();

      expect(component.showCreateItem).toEqual(false);
      expect(fixture.nativeElement.querySelector('#create-item').hidden).toEqual(true);
    });

    it('should return false if items contains searchInputValue', () => {
      const item = '🎃';
      component.searchInput.setValue(item);
      component.items = [...items, item];
      component.allowCreateItem = true;

      fixture.detectChanges();

      expect(component.showCreateItem).toEqual(false);
      expect(fixture.nativeElement.querySelector('#create-item').hidden).toEqual(true);
    });

    it('should return false if loading is true', () => {
      const item = '🎃';
      component.searchInput.setValue(item);
      component.allowCreateItem = true;
      component.loading = true;

      fixture.detectChanges();

      expect(component.showCreateItem).toEqual(false);
      expect(fixture.nativeElement.querySelector('#create-item').hidden).toEqual(true);
    });

    it('should return true if searchInputValue length is greater than 0, allowCreateItem is true, loading is false and items does not contain searchInputValue', () => {
      const item = '🎃';
      component.searchInput.setValue(item);
      component.allowCreateItem = true;
      component.loading = false;

      fixture.detectChanges();

      expect(component.showCreateItem).toEqual(true);
      expect(fixture.nativeElement.querySelector('#create-item').hidden).toEqual(false);
    });
  });

  describe('typeToCreateItem', () => {
    it('should return false if filtered length is not 0', () => {
      component.items = items;

      fixture.detectChanges();

      expect(component.typeToCreateItem).toEqual(false);
      expect(fixture.nativeElement.querySelector('#type-to-create').hidden).toEqual(true);
    });

    it('should return false if searchInputValue length is not 0', () => {
      component.items = [];
      component.searchInput.setValue('🎃');

      fixture.detectChanges();

      expect(component.typeToCreateItem).toEqual(false);
      expect(fixture.nativeElement.querySelector('#type-to-create').hidden).toEqual(true);
    });

    it('should return false if allowCreateItem is false', () => {
      component.items = [];
      component.searchInput.setValue('');
      component.allowCreateItem = false;

      fixture.detectChanges();

      expect(component.typeToCreateItem).toEqual(false);
      expect(fixture.nativeElement.querySelector('#type-to-create').hidden).toEqual(true);
    });

    it('should return false if loading is true', () => {
      component.items = [];
      component.searchInput.setValue('');
      component.allowCreateItem = true;
      component.loading = true;

      fixture.detectChanges();

      expect(component.typeToCreateItem).toEqual(false);
      expect(fixture.nativeElement.querySelector('#type-to-create').hidden).toEqual(true);
    });

    it('should return true if filtered length is 0, searchInputValue length is 0, loading is false and allowCreateItem is true', () => {
      component.items = [];
      component.searchInput.setValue('');
      component.allowCreateItem = true;
      component.loading = false;

      fixture.detectChanges();

      expect(component.typeToCreateItem).toEqual(true);
      expect(fixture.nativeElement.querySelector('#type-to-create').hidden).toEqual(false);
    });
  });
});
