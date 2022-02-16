import React, { Component } from "react";
import auth from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import {store, addCart} from "../utils/shared-state.js";

class MoviesTable extends Component {

  
  columns =  [
    {path: "title", label: "Titre"},
    {
      path: "image", 
      label: "Poster",
      content: (movie) => (
        <img src={movie.image} alt={movie.title} width="150" />
      )
    },
    { path: "tag", label: "Genre" },
    { path: "stock", label: "Stock" },
    { path: "price", label: "Prix (€)" },
    { path: "rating", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
  ];
  

  showDeleteButton = {
    key: "delete",
    content: (movie) => (
      <button
        className="btn btn-danger"
        onClick={() => this.props.onDelete(movie)}
      >
        Supprimer
      </button>
    ),
  };
  showUpdateButton = {
    key: "update",
    content: (movie) => (
      <Link to={`/movies/${movie.movie_id}`} className="btn btn-primary">Modifier</Link>
    ),
  };
  showAddButton = {
    key: "AddToCart",
    content: (movie) => (
      <button className="btn btn-success" 
                        onClick={() => store.dispatch(addCart({title:movie.title, image: movie.image, description: movie.description, quantity:1, price: movie.price, movie_id:movie.movie_id}))} >
                        Ajouter au panier
      </button>
    )
  };

  constructor(props) {
    super(props);
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.showUpdateButton, this.showDeleteButton);
    }
    if (user && !user.isAdmin) {
      this.columns.push(this.showAddButton);
    }
  }

  render() {
    const { movies, onSort, sortColumn, genres } = this.props;
    movies.forEach(movie => {
      movie.tag = genres.find((g) => g.tag_id === movie.tag_id)?.name;
    });
    
    return (
      <Table
        onSort={onSort}
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
      />
    );
  }
}

export default MoviesTable;
