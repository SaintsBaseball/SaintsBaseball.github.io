import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let sidebarComponent: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let nativeElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    sidebarComponent = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(sidebarComponent).toBeTruthy();
  });

  it('should have the Sidebar Title at the top of the sidebar', function () {
    expect(sidebarComponent.title).toBe('Menu');
    expect(nativeElement.querySelector('nav.w3-sidebar h4.w3-bar-item b').textContent).toBe(sidebarComponent.title)
  });

  it('should have an X that closes the sidebar', function () {
    spyOn(sidebarComponent, "closeSidebar");

    const xButton = nativeElement.querySelector('nav.w3-sidebar button');
    xButton.click();

    expect(sidebarComponent.closeSidebar).toHaveBeenCalledTimes(1);
  });
});
