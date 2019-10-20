# Laravel Pagination with ReactJS (customizable)
[![](https://img.shields.io/npm/dt/react-laravel-paginex.svg)](https://www.npmjs.com/package/react-laravel-paginex)
[![](https://img.shields.io/npm/v/react-laravel-paginex.svg)](https://www.npmjs.com/package/react-laravel-paginex)

`react-laravel-paginex` will provide you ability to easily
create pagination from Laravel Pagination object. 


Fork of project react-laravel-paginex with some improvements and corrections

#### Creators:
- [Garik Harutyunyan](https://github.com/GHarutyunyan)
- [Lionix Team](https://github.com/lionix-team)

## Installation

`npm i react-laravel-paginex`

or

`yarn add react-laravel-paginex`

## Usage

First import the Pagination component inside 
your React component.
```react
import {Pagination} from 'react-laravel-paginex'
```

Then you'll be able to use pagination component.

#### Example:

```html
<Pagination changePage={this.getData} data={data}/>
```
`changePage` prop will run the function 
( in our case is `getData()`) when new page selected.
##### getData() function example with axios.
```javascript
    getData=(data)=>{
        axios.get('getDataEndpoint?page=' + data.page).then(response => {
            this.setState({data:data});
        });
    }
```
`data`  object must be Laravel default or API Resource Pagination object.
##### Example:
```javascript
{
    current_page: 1
    data: [{id: 25600, brand_id: 14, number: "47609-253286", name: "Mall of Africa", type: "Licensed",…},…]
    first_page_url: "http://example.com/getDataEndpoint?page=1"
    from: 1
    last_page: 10
    last_page_url: "http://example.com/getDataEndpoint?page=10"
    next_page_url: "http://example.com/getDataEndpoint?page=2"
    path: "http://example.com/getDataEndpoint"
    per_page: 20
    prev_page_url: null
    to: 20
    total: 200
}
```
or
```javascript
{
    data: [
        {
            id: 1,
            name: "Eladio Schroeder Sr.",
            email: "therese28@example.com",
        },
        {
            id: 2,
            name: "Liliana Mayert",
            email: "evandervort@example.com",
        }
    ],
    links:{
        first: "http://example.com/pagination?page=1",
        last: "http://example.com/pagination?page=1",
        prev: null,
        next: null
    },
    meta:{
        current_page: 1,
        from: 1,
        last_page: 1,
        path: "http://example.com/pagination",
        per_page: 15,
        to: 10,
        total: 10
    }
}
```

## Customizations

You can customize your pagination styles by overwriting default values. 
If you do not want to use icons or do not have the default icon source (mdi) used in the project, 
you can pass false as the value of iconButtons

Available props for component:

Prop Name           | Default Value
-------------       | -------------
containerClass      | pagination
iconButtons         | true
prevButtonClass     | page-item
prevButtonText      | Prev
prevIconButton      | mdi mdi-chevron-left
nextButtonClass     | page-item
nextButtonText      | Next
nextIconButton      | mdi mdi-chevron-right
numberButtonClass   | page-item
numberClass         | page-link
numbersCountForShow | 2
activeClass         | active

##### Example:
`<Pagination changePage={this.getData} data={data} containerClass={"pagination-container"}/>`

You can use `options` prop by passing options object into it.

##### Example:
You have to define here only props which you want to overwrite.
```javascript
options:{
    containerClass: "pagination-container",
    prevButtonClass: "prev-button-class",
    nextButtonText: "Next Page",
    iconButtons: false,
    ...
}
```
`<Pagination changePage={this.getData} data={data} options={options}/>`

##### Example:
You can set your own request params for request
```javascript
params=()=>{
    return {
       keyword:this.state.keyword
    }
}
```
`<Pagination changePage={this.getData} data={data} options={options} iconButtons={false} requestParams={this.params()}/>`

## Credits

- [Luis Arce](https://github.com/luilliarcec)