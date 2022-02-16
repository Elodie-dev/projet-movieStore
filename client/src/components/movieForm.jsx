import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "./../services/genreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      tag_id: "",
      image: "",
      stock: "",
      rating: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    movie_id: Joi.number(),
    title: Joi.string().required().label("Titre"),
    tag_id: Joi.number().required().label("Genre"),
    image: Joi.string().required().label("Image"),
    stock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Quantité en stock"),
    rating: Joi.number().required().min(0).max(10).label("Note"),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      movie_id: movie.movie_id,
      title: movie.title,
      tag_id: movie.tag_id,
      image: movie.image,
      stock: movie.stock,
      rating: movie.rating,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.history.push("/movies");
  };
  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Titre")}
          {this.renderSelect("tag_id", "Genre", this.state.genres)}
          {this.renderInput("image", "Image")}
          {this.renderInput("stock", "Quantité en stock", "number")}
          {this.renderInput("rating", "Note", "number")}
          {this.renderButton("Enregistrer")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
