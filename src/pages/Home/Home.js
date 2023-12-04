import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Button from "@mui/joy/Button";

import {
  updateDifficulty,
  fetchCategories,
  updateCategory,
} from "store/slices/gamePlaySlice";
import styles from "./Home.module.css";
import logo from "assets/images/logo.png";

export default function Home() {
  const { difficulty, categories, categoryId } = useSelector(
    (state) => state.gamePlay
  );

  // State to track the user's selected category as a name
  const [selectedCategory, setSelectedCategory] = useState("");

  const dispatch = useDispatch();
  let navigate = useNavigate();

  // Fetch categories when the component mounts
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleChangeDifficulty = (event) => {
    if (event && event.target) {
      const selectedDifficulty = event.target.textContent;
      dispatch(updateDifficulty(selectedDifficulty.toLowerCase()));
    }
  };

  const handleChangeCategory = (event) => {
    if (event && event.target) {
      const selectedCategory = event.target.textContent;
      const categoryId = event.target.id; // it will be needed in the next request

      setSelectedCategory(selectedCategory);
      dispatch(updateCategory(categoryId));
    }
  };

  const routeChange = () => {
    let path = "/game";
    navigate(path, { state: { categoryId, difficulty } });
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="logo" />
        </div>
        {/* Difficulty Dropdown */}
        <div className={styles.dropdown}>
          <Select
            onChange={handleChangeDifficulty}
            color="neutral"
            disabled={false}
            placeholder="Difficulty"
            size="sm"
            variant="solid"
            value={difficulty.toLowerCase()} // this should be exact match as the value
          >
            <Option value="easy">Easy</Option>
            <Option value="medium">Medium</Option>
            <Option value="hard">Hard</Option>
          </Select>
          {/* Categories Dropdown */}
          <Select
            onChange={handleChangeCategory}
            color="neutral"
            disabled={false}
            placeholder="Category"
            size="sm"
            variant="solid"
            value={selectedCategory} // this should be exact match as the value => in this case:name
          >
            {categories.map((category) => (
              <Option key={category.id} id={category.id} value={category.name}>
                {category.name}
              </Option>
            ))}
          </Select>
          {/* Start Game button */}
          {difficulty && selectedCategory ? (
            <Button color="success" onClick={routeChange}>
              Start
            </Button>
          ) : (
            <Button disabled>Please choose Difficulty and Category</Button>
          )}
        </div>
      </div>
    </main>
  );
}
