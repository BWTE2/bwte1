class ThreeLevelMenuComponent extends HTMLElement {


    menuContent;

    constructor() {
        super();
        this.menuContent = {
            "id": "",
            "title": "",
            "path": "",
            "child": [],
        }
        this.dom = this.attachShadow({mode: 'open'});
        this.loadHtml().then(text => {
            this.dom.innerHTML = text;
            this.loadMenuContent().then(json => {
                this.menuContent = json.menuContent;
                this.crateListFromMenuContent();
            });
        });


    }

    async loadHtml() {
        const response = await fetch("app/three-level-menu/three-level-menu.component.html")
        return await response.text();
    }

    getElementById(id) {
        return this.dom.querySelector('#' + id);

    }

    async loadMenuContent() {
        const response = await fetch("app/three-level-menu/menu-content.json");
        return await response.json();
    }

    createHtmlList() {
        let list = document.createElement("ul");
        list.classList.add("navigation-bar-inner-row");
        return list;
    }

    createHtmlListItem() {
        let listItem = document.createElement("li");
        listItem.classList.add("item");
        return listItem;
    }

    createHtmlLink() {
        return document.createElement("a");
    }


    createHtmlDiv() {
        let div = document.createElement("div");
        div.classList.add("item-link");
        return div;
    }

    setAttributeAndTextOfLinkFromItem(link, item) {
        link.setAttribute("href", item.path)
        link.innerText = item.title;
    }

    crateListFromMenuContent() {
        let list = this.getElementById("menu");
        this.menuContent.forEach((item) => {
            this.createList(list, item);
        });
    }

    searchInChildrenAndCreateListForGrandChildren(item, listItem) {
        let newList = this.createHtmlList();
        item.child.forEach((child) => {
            listItem.appendChild(newList);
            this.createList(newList, child);
        })
    }

    createList(list, item) {
        let listItem = this.createHtmlListItem();
        let link = this.createHtmlLink();
        let div = this.createHtmlDiv();
        this.setAttributeAndTextOfLinkFromItem(link, item);
        div.appendChild(link)
        listItem.appendChild(div);
        list.appendChild(listItem);

        if (item.child) {
            this.searchInChildrenAndCreateListForGrandChildren(item, listItem);
        }

    }


}
