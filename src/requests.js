import { useEffect } from "react";

// get all categories
const [selectedCategory, setSelectedCategory] = useState([]);

const getAllCategories = useEffect(() => {
  fetch("https://opentdb.com/api_category.php")
    .then((response) => response.json())
    .then((data) => {
      setSelectedCategory(response.data.trivia_categories);
    })
    .catch((error) => console.log(error));
  // you can do error handling to check if the name of the category is empty string, just to be extra sure that UX will be nice
}, []);

// get all 15 questions from the selected difficulty and category
const [questions, setQuestions] = useState([]);
const getQuestions = useEffect(() => {
  fetch(
    `https://opentdb.com/api.php?amount=15&category=${Number(
      category
    )}&difficulty=${difficulty.toLowerCase()}&type=multiple`
  );
  setQuestions(response.data.results);
  // check if the returning results array contains 15q, if less advise on chosing another categorry or  difficulty, or you can advise the person to add questions to the free api
}, []);
