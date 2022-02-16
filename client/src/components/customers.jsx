import React, {Component} from "react";
import Table from "./common/table";
import Paginations from "./common/pagination";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";
import Loading from "./common/loading";
import {getCustomers }from "../services/customersService.js";
import { paginate } from "../utils/paginate";
import auth from "../services/authService";
import _ from "lodash";
import { IoMdCreate } from "react-icons/io";
import {updateCustomer} from "../services/customersService";

class Customers extends Component {
  state = {  
    loading: true,
    customers: [],
    currentPage: 1,
    pageSize: 10,
    sortColumn: { path: "lastname", order: "asc" },
  }



  columns = [
    {path: 'lastname', label: 'Nom'},
    {path: 'firstname', label: 'Prénom'},
    {path:'email', label: 'Email'},
    {path:'isAdmin', label: 'Statut'},
  ]
  showChangeStatus = {
    label: "Modifier statut",
    key: "changeStatus",
    content: (customer) => (
      <button
        className="btn btn-success"
        onClick={() => this.handleUpdate(customer)}
      >
        <IoMdCreate />
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if(user){
      this.columns.push(this.showChangeStatus);
    }
  }

  async componentDidMount() {
    const {data} = await getCustomers();
    const customers = [...data];
    
    demoAsyncCall().then(() => this.setState({customers, loading: false }));
  }

  async handleUpdate (customer){
    try {
      await updateCustomer(customer.user_id, !customer.isAdmin).then(() => window.location.reload());
    } catch (ex) {
      if (ex.response && ex.response.status === 400) { 
        toast.error("Erreur lors de la modification du statut");
      }
    }
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      searchQuery,
      customers: allCustomers,
      sortColumn,
    } = this.state;

    let filtered = allCustomers;
    if (searchQuery)
      filtered = allCustomers.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
   
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const customers = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: customers };
  };
  
  renderTags() { 
    const { pageSize, currentPage, sortColumn } = this.state;
    
    const { totalCount, data: customers } = this.getPageData();

    
    return (
      <React.Fragment>
        <SearchBox
          value={this.state.searchQuery}
          onChange={this.handleSearch}
        />
        <Table
          onSort={this.handleSort}
          columns={this.columns}
          data={customers}
          sortColumn={sortColumn}
        />
        <Paginations
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <Loading />; //render null when app is not ready
    }
    return <React.Fragment>{this.renderTags()}</React.Fragment>;
  }
}


function demoAsyncCall() {
  return new Promise((resolve) => setTimeout(() => resolve(), 2000));
}
 
export default Customers;
