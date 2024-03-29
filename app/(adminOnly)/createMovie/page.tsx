"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaDoorOpen } from "react-icons/fa";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface createMovieInterface {
  categoryId: number;
  movieName: string;
  thumbNailUrl: string;
  properties: string[];
  match: number;
  minAge: number;
  seriesCount: number;
  quality: string;
  releaseYear: number;
  actors: string[];
  duration: string;
  description: string;
  genres: string[];
}

const CreateMovie = () => {
  const [isMovieSelected, setIsMovieSelected] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState<createMovieInterface>({
    categoryId: 1,
    movieName: "",
    thumbNailUrl: "",
    properties: [],
    actors: [],
    match: 0,
    minAge: 0,
    seriesCount: 0,
    quality: "HD",
    releaseYear: 0,
    duration: "",
    description: "",
    genres: [],
  });
  const { data: session } = useSession();

  if (session?.user?.email !== "admin@admin.cz" || !session || !session.user) {
    router.push("/");
    return;
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "properties" || name === "actors" || name === "genres") {
      const propertiesArray = value.split(",");
      setFormData({
        ...formData,
        [name]: propertiesArray,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const dataToSend = {
        ...formData,
        categoryId: Number(formData.categoryId),
        match: Number(formData.match),
        minAge: Number(formData.minAge),
        seriesCount: Number(formData.seriesCount),
        releaseYear: Number(formData.releaseYear),
      };
      await axios.post("/api/movie", {
        email: session.user?.email,
        formData: dataToSend,
      });
      toast.success("Film vytvořen");
      router.push("/browse");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav className="w-full flex justify-center py-4">
        <Link href="/" className="underline text-red-700 tex-center">
          Back to home page
          <FaDoorOpen size={20} className="text-white  mx-auto" />
        </Link>
      </nav>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-2/3 mx-auto gap-1"
      >
        <label htmlFor="categoryId">Kategorie: </label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={(e) => {
            handleChange(e);
            setIsMovieSelected(!isMovieSelected);
          }}
          required
          className="w-2/3 bg-neutral-700 py-1 rounded-md"
        >
          <option value="1">Pořady</option>
          <option value="2">fillmy</option>
        </select>
        <label htmlFor="movieName">Název: </label>
        <input
          type="text"
          id="movieName"
          name="movieName"
          value={formData.movieName}
          onChange={handleChange}
          className="w-2/3 bg-neutral-700 py-1 rounded-md"
          required
        />
        <label htmlFor="movieName">Odkaz na obrázek: </label>
        <input
          type="text"
          id="thumbNailUrl"
          name="thumbNailUrl"
          value={formData.thumbNailUrl}
          onChange={handleChange}
          className="w-2/3 bg-neutral-700 py-1 rounded-md"
          required
        />
        <label htmlFor="movieName">Popis: </label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-2/3 bg-neutral-700 py-1 rounded-md"
          required
        />
        <label htmlFor="movieName">Obsazení: </label>
        <input
          type="text"
          id="actors"
          name="actors"
          value={formData.actors}
          onChange={handleChange}
          className="w-2/3 bg-neutral-700 py-1 rounded-md"
          required
        />
        <label htmlFor="movieName">Žánry: </label>
        <input
          type="text"
          id="genres"
          name="genres"
          value={formData.genres}
          onChange={handleChange}
          className="w-2/3 bg-neutral-700 py-1 rounded-md"
          required
        />
        <label htmlFor="movieName">Vlastnosti: </label>
        <input
          type="text"
          id="properties"
          name="properties"
          value={formData.properties}
          onChange={handleChange}
          className="w-2/3 bg-neutral-700 py-1 rounded-md"
          required
        />

        <label htmlFor="movieName">Shoda: </label>
        <input
          type="number"
          id="match"
          name="match"
          value={formData.match}
          onChange={handleChange}
          className="w-2/3 bg-neutral-700 py-1 rounded-md"
          min={0}
          max={99}
          required
        />
        <label htmlFor="movieName">Rok vydání: </label>
        <input
          type="number"
          id="releaseYear"
          name="releaseYear"
          value={formData.releaseYear}
          onChange={handleChange}
          className="w-2/3 bg-neutral-700 py-1 rounded-md"
          min={1940}
          max={new Date().getFullYear()}
          required
        />
        <label htmlFor="movieName">Doba trvání: </label>
        <input
          type="text"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-2/3 bg-neutral-700 py-1 rounded-md"
          required
        />
        <label htmlFor="movieName">Minimální věk: </label>
        <input
          type="number"
          id="minAge"
          name="minAge"
          value={formData.minAge}
          onChange={handleChange}
          className="w-2/3 bg-neutral-700 py-1 rounded-md"
          min={0}
          max={21}
          required
        />

        {!isMovieSelected && (
          <>
            <label htmlFor="movieName">Počet sérií: </label>
            <input
              type="number"
              id="seriesCount"
              name="seriesCount"
              value={formData.seriesCount}
              onChange={handleChange}
              className="w-2/3 bg-neutral-700 py-1 rounded-md"
              min={0}
              required
            />
          </>
        )}

        <label htmlFor="categoryId">Kvalita: </label>
        <select
          id="quality"
          name="quality"
          value={formData.quality}
          onChange={handleChange}
          required
          className="w-2/3 bg-neutral-700 py-1 rounded-md"
        >
          <option value="HD">HD</option>
          <option value="FHD">FHD</option>
          <option value="QHD">QHD</option>
          <option value="4K">4K</option>
          <option value="8K">8K</option>
        </select>

        {/* Submit button */}
        <button
          className="bg-red-700 w-1/3 p-2 mt-4 rounded-md hover:bg-red-800"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;

