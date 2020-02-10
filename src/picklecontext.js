//Pickle context component created by Kadir Barış Bozat

class PickleContext {
    /**
     * 
     * @param {object} obj as context object 
     */
    constructor(obj) {
        //target class
        this.target = obj.c_target;
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
        document.body.addEventListener('click', e => {
            let elm = e.target.parentNode;
            //clean menus
            this.cleanMenu();
            setTimeout(() => {
                if (e.target.classList.contains(this.target)) {
                    //build menu id is target
                    this.buildMenu(e.target)
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
    buildMenu(element) {
        //get element location
        let x = element.getBoundingClientRect();
        let origin = {
            node: element,
            left: x.x,
            top: x.y + x.height
        };
        //draw menu
        this.drawMenu(origin)
    }

    drawMenu(obj) {
        //if node is not have id give id
        if (typeof obj.node.id === 'undefined') obj.node.id = Date.now();
        //check if menu already exist
        if (document.getElementById('div_menu_' + obj.node.id) === null) {
            //create menu div
            let menu_item = document.createElement('div');
            //add to body
            document.body.appendChild(menu_item);
            menu_item.id = 'div_menu_' + obj.node.id;
            menu_item.classList.add('menuCont');

            //for each menu item
            let span_item;
            let icon;
            for (let i = 0; i < this.nodeList.length; i++) {
                span_item = document.createElement('span');
                span_item.setAttribute('data-node', obj.node.id);
                icon = this.nodeList[i].icon.trim().length > 0 ? '<i class="' + this.nodeList[i].icon.trim() + '"></i>' : '';
                span_item.innerHTML = icon + ' ' + this.nodeList[i].title.trim();
                //pus span to menu
                menu_item.appendChild(span_item);

                //then add click event for span
                span_item.addEventListener('click', e => {
                    this.nodeList[i].onClick(obj.node);
                });
            }
            //calculate location
            if (screen.width - obj.left < menu_item.offsetWidth) {
                menu_item.style.left = (obj.left - menu_item.offsetWidth) + 'px';
            } else {
                menu_item.style.left = obj.left + 'px';
            }
            menu_item.style.top = obj.top + 'px';
        }

    }
}
