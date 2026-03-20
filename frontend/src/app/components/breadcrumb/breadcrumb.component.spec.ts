import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb.component';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render no items when items is empty', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.breadcrumb__item').length).toBe(0);
  });

  it('should render correct number of items', () => {
    fixture.componentRef.setInput('items', [
      { label: 'Inicio', url: '/' },
      { label: 'Detalle', url: '/cars/1' },
    ]);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.breadcrumb__item').length).toBe(2);
  });

  it('should render correct labels', () => {
    fixture.componentRef.setInput('items', [{ label: 'Inicio', url: '/' }]);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('.breadcrumb__item a')?.textContent,
    ).toContain('Inicio');
  });
});
