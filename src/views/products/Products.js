import React, { Component } from 'react'
import { classNames } from 'primereact/utils';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { ProductService } from '../../services/ProductService';

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        };

        this.verifiedBodyTemplate = this.verifiedBodyTemplate.bind(this);

        this.productService = new ProductService();
    }

    componentDidMount() {
        this.productService.getMockProducts().then(data => this.setState({ products: data }));
    }

    verifiedBodyTemplate(rowData) {
        return <i className={classNames('pi', {'true-icon pi-check-circle': rowData.active, 'false-icon pi-times-circle': !rowData.active})}></i>;
    }

    render() {
        return (
            <div>
                <div className="card">
                    <DataTable value={this.state.products} responsiveLayout="scroll">
                        <Column field="code" header="Code"></Column>
                        <Column field="description" header="Description"></Column>
                        <Column field="price" header="Price" dataType="numeric"></Column>
                        <Column field="active" header="Active" dataType="boolean" body={this.verifiedBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
        )
    }
}

export default Products;