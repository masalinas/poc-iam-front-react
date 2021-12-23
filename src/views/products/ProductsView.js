import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

import { classNames } from 'primereact/utils';

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import AuthService from "../../services/AuthService";
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
        this.productService.getProducts()
            .then(data => 
                this.setState({ products: data }
            ));
    }

    verifiedBodyTemplate(rowData) {
        return <i className={classNames('pi', {'true-icon pi-check-circle': rowData.active, 'false-icon pi-times-circle': !rowData.active})}></i>;
    }

    logoutClick() {                
        AuthService.logout().then(
            response => {
                // navigate to logon view
                this.props.history.push("/login");
            },
            error => {
                console.log(error);

                this.props.history.push("/login");
            }
        );
    }

    render() {
        return (
            <div>                
                <div className="card">
                    <Button label="Sign Out" icon="pi pi-sign-out" className="w-full" onClick={(e) => this.logoutClick(e)}/>                  

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

//export default Products;
export default withRouter(Products);