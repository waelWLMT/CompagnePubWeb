import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {

  @Input() menus:any;

  public parentMenus:any;
  public childMenus: any;

  public displayMenusList: any;

  constructor() { }

  ngOnInit(): void {
    this.initMenusList();
  }

  initMenusList(){
    this.displayMenusList = false;
    
    let parents = [];
    
    this.menus.forEach(menu => {
      if(menu.isParent) {

        let parentMenu = {
          parent: menu,
          childs: []
        }
        parents.push(parentMenu);  
      }        
    });

    parents.forEach(parentMenu=>{
      
      this.menus.forEach(menu => {
        if(!menu.isParent && menu.parentMenuId === parentMenu.parent.id)
        parentMenu.childs.push(menu);
      });

    });
    this.parentMenus = parents;
    this.displayMenusList = true;

    console.log(this.parentMenus);
  }

}
