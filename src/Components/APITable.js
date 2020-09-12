import React, { Component } from 'react'
import axios from 'axios'

export class APITable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            menu: []


        }
    }
    getCategory = () => {
        const url = "http://stream-restaurant-menu-svc.herokuapp.com/category";
        axios.get(url)
            .then((res) => {
                const categoryData = res.data;
                this.setState({
                    category: categoryData
                })
                console.log("Category Detail here", categoryData);
            })
    }
    getMenu = (short_name) => {
        const url = "http://stream-restaurant-menu-svc.herokuapp.com/item?category=${category}";
        axios.get(url)
            .then((res) => {
                const categoryMenu = res.data;
                this.setState({
                    menu: categoryMenu,
                    

                })
                console.log("Menu detail here", categoryMenu);
            })
    }

    componentDidMount = () => {
        return this.getCategory();

    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Menu Categories</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.category.map((ele, id) => (
                            <tr key={id}>
                                <td onClick={(ele) => this.getMenu(ele[0].short_name)}>{ele.name}{"-"} {ele.short_name}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className="table">

                    <tbody>
                        {this.state.menu.map((value, id) => (
                            <tr key={id}>
                                <td>{value.id}</td>
                                <td>{value.name}</td>
                                <td>{value.description}</td>
                                <td>{value.short_name}</td>
                                <td>{value.small_portion_name}</td>
                                <td>{value.large_portion_name}</td>
                                <td>{value.price_small}</td>
                                <td>{value.price_large}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>


            </div >
        )
    }
}

export default APITable
