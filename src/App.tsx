

// https://reactjs.org/docs/thinking-in-react.html

import * as React from 'react';
// import * as ReactDOM from 'react-dom';

import './think.css';


// interface IProductCategoryRowProps extends React.Props<any> {
//  category: any
// }

class ProductCategoryRow extends React.Component {
  // <IProductCategoryRowProps> {

  public props: {
    category?: string;
  }

  public render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan={2}>
          {category}
        </th>
      </tr>
    );
  }
}

interface IProductRowProps extends React.Props<any> {
  product: any
}

class ProductRow extends React.Component<IProductRowProps> {
  public render() {
    const product = this.props.product;
    const name = product.stocked ?
      <span style={{ color: 'green' }}>
       {product.name}
      </span>
      :
      <span style={{ color: 'red' }}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    )
  }
}


class ProductTable extends React.Component {

  public props: {
     products: any,
     filterText: string,
     inStockOnly: boolean
  }


  public render() {

    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows: any = [];
    let lastCategory: any = null;

    this.props.products.forEach((product: any) => {

      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      
      if (inStockOnly && !product.stocked) {
        return;
      }

      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

class SearchBar extends React.Component {
  public props: {
    filterText?: string,
    inStockOnly: boolean,
    onFilterTextChange: any,
    onInStockChange: any
  }

  constructor(props: any) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  public handleFilterTextChange(e: any) {
    this.props.onFilterTextChange(e.target.value);
  }
  
  public handleInStockChange(e: any) {
    this.props.onInStockChange(e.target.checked);
  }

  public render() {
    return (
      <form>
        <input type="text" placeholder="Search..." 
          value={this.props.filterText} 
          onChange={this.handleFilterTextChange} />
        <p>
          <input type="checkbox" 
          checked={this.props.inStockOnly} 
          onChange={this.handleInStockChange} />
          {' '}
          Only show products in stock
          </p>
      </form>
    )
  }
}


export class FilterableProductTable extends React.Component {

  public props: 
  {
    products?: any
  }

  public state: {
    filterText: string,
    inStockOnly: boolean
  }

  constructor(props: any) {
    super(props)

    this.state = {
      filterText: '',
      inStockOnly: false
    }
    
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    this.handleInStockChange = this.handleInStockChange.bind(this)
  }

  public handleFilterTextChange(filterText: string) {
    this.setState({
      filterText
    });
  }
  
  public handleInStockChange(inStockOnly: boolean) {
    this.setState({
      inStockOnly
    })
  }

  public render() {
    return (
      <div>
        <SearchBar filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange} />

        <ProductTable 
          products={this.props.products} 
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          />
      </div>
    )
  }
}

export const PRODUCTS = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
]

 // ReactDOM.render(
 //   <FilterableProductTable products={PRODUCTS} />,
 //   document.getElementById('container')

// export default App;

// export FilterableProductTable;