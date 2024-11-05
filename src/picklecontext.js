//Pickle context component created by Kadir Barış Bozat

class PickleContext {
    /**
     * 
     * @param {object} obj as context object 
     */
    constructor(obj) {
        this.obj      = obj;
        this.event    = obj.event !== undefined ? obj.event : 'click';
        //target class
        this.target   = obj.c_target;
        //available nodes list
        this.nodeList = obj.c_nodes;

        //start events
        this.staticEvents();
    }

    /**
     * this method will trigger events for the context menu
     */
    staticEvents() {
        //if click is target then create menu else clean other menus in dom
        document.body.addEventListener('click', e=> {
            //clean menus
            this.cleanMenu();
        });
        document.body.addEventListener(this.event, e => {
            if (e.target.classList.contains(this.target)) e.preventDefault();
            setTimeout(() => {
                if (e.target.classList.contains(this.target)) {
                    //build menu id is target
                    const menu = this.buildMenu(e.target, e)
                    
                    const bounding = menu.getBoundingClientRect();
                    //for page height
                    if (!(bounding.top >= 0 && bounding.left >= 0 && bounding.right <= window.innerWidth && bounding.bottom <= window.innerHeight)) {
                        const diff = (bounding.bottom - window.innerHeight);
                        menu.style.top = (parseFloat(menu.style.top.split('px')[0]) - diff)+'px';
                    }

                }
            }, 50);

        });
    }

    /**
     * this menu will remove menu nodes from dom
     */
    cleanMenu() {
        //each menu in dom
        let menu_items = document.querySelectorAll('.menuCont');
        for (let i = 0; i < menu_items.length; i++) {
            //clean
            menu_items[i].outerHTML = '';
        }
    }

    /**
     * this method will start building element 
     * first it will take target location
     * @param {html element} element 
     */
    buildMenu(element, e) {
        //get element location
        let x = element.getBoundingClientRect();
        let origin = {
            node: element,
            left: e.clientX-65,
            top: e.clientY+10
                /*left: x.x,
                top: x.y + x.height*/
        };
        //draw menu
        return this.drawMenu(origin);
    }

    drawMenu(obj) {
        //if node is not have id give id
        if (typeof obj.node.id === 'undefined') obj.node.id = Date.now();
        //check if menu already exist
        if (document.getElementById('div_menu_' + obj.node.id) === null) {
            //create menu div
            let menu_item = document.createElement('div');

            menu_item.id = 'div_menu_' + obj.node.id;
            menu_item.classList.add('menuCont');
            if(this.obj?.width != '') menu_item.style.width = this.obj?.width;
            //for each menu item
            let span_item;
            let icon;
            
            for (let i = 0; i < this.nodeList.length; i++) {
                span_item = document.createElement('div');
                span_item.classList.add('menu-row');
                span_item.setAttribute('data-node', obj.node.id);

                if(this.nodeList[i].icon.trim().length > 0){
                    const iconItm = document.createElement('i');
                    iconItm.classList.add(...this.nodeList[i].icon.trim().split(' '));
                    span_item.appendChild(iconItm);
                }
                


                const titleSpn = document.createElement('span');
                titleSpn.style.width = '100%';
                titleSpn.innerHTML =  this.nodeList[i].title.trim();
                
                span_item.appendChild(titleSpn);

                

                if(this.nodeList[i]?.hasSub){
                    const subItm = document.createElement('span');
                    subItm.innerHTML = this.nodeList[i]?.subContent;
                    span_item.appendChild(subItm);

                    //then add click event for title
                    titleSpn.onclick = () => {
                        this.nodeList[i].onClick(obj.node);
                        this.cleanMenu();
                    }
                }else{
                    //then add click event for main container
                    span_item.onclick = () => {
                        this.nodeList[i].onClick(obj.node);
                        this.cleanMenu();
                    }
                }

                
                
                //push span to menu
                menu_item.appendChild(span_item);

                if(this.nodeList[i]?.hasGroup && (obj.node.dataset?.group === undefined || !obj.node.dataset?.group?.includes(this.nodeList[i]?.hasGroup)))  span_item.remove();
               
                //if(this.nodeList[i]?.hasGroup && obj.node.dataset?.group !== undefined && !obj.node.dataset?.group?.includes(this.nodeList[i]?.hasGroup)) span_item.remove();
            }
            //calculate location
            if (screen.width - obj.left < menu_item.offsetWidth) {
                menu_item.style.left = (obj.left - menu_item.offsetWidth) + 'px';
            } else {
                menu_item.style.left = obj.left + 'px';
            }
            menu_item.style.top = obj.top + 'px';
            //add to body
            document.body.appendChild(menu_item);

            return menu_item;
        }

        return false;
    }
}
