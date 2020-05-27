

# Pickle Context Menu

> Pickle context menu is a simple menu component written as completely pure javascript. Just set some settings to object and have fun :-D 

> Pickle context menu does't need anything except you !

**Badges Falan**

- Simple javascript ability
- Simple css ability for some style editing for your project




## Initiation And Using Example 

> Initiate like this :

```javascript


const context1 = new PickleContext({
    //target
    c_target: 'contextTrigger',
    //nodes
    c_nodes: [{
        icon: 'fa fa-edit',
        title: 'Edit',
        //context button click event
        onClick: (node) => {
            console.log('edit - ' + node.id);
        }
    }, {
        icon: 'fa fa-trash',
        title: 'Delete',
        onClick: (node) => {
            console.log('delete - ' + node.id);
        }
    }]
});

```

---


## Installation

- Just include js and css file to your project then you can use it

### Clone

- Clone this repo to your local machine using `https://github.com/freakazoid41/pickle_context.git`

