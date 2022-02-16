import React, { Component } from "react";
import { toast } from "react-toastify";
import { deleteMovies, getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Paginations from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";
import Loading from "./common/loading";
import { Link } from "react-router-dom";
import _ from "lodash";
import "react-toastify/dist/ReactToastify.css";

class Movies extends Component {
  state = {
    loading: true,
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 5,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = data.data;


    const { data: movies } = await getMovies();
    this.setState({});
    demoAsyncCall().then(() =>
      this.setState({ movies, genres, loading: false })
    );
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m.movie_id !== movie.movie_id);
    this.setState({ movies });

    try {
      await deleteMovies(movie.movie_id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Ce film a déjà été supprimé");
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      searchQuery,
      movies: allMovies,
      sortColumn,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre.tag_id)
      filtered = allMovies.filter((m) => m.tag_id === selectedGenre.tag_id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  renderTags() {
    const { pageSize, currentPage, genres, sortColumn } = this.state;

    const { totalCount, data: movies, selectedGenre} = this.getPageData();

    const { user } = this.props;

    return (
      <div className="row">
        <div className="col-sm-3">
          <ListGroup
            items={genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && user.isAdmin && (
            <Link className="btn btn-primary m-2" to="/movies/new">
              Ajouter un film
            </Link>
          )}
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />
          <MoviesTable
            movies={movies}
            genres={genres}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Paginations
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
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
  return new Promise((resolve) => setTimeout(() => resolve(), 1500));
}

export default Movies;
