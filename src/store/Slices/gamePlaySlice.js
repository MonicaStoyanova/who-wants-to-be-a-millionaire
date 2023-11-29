import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  questions: [],
  answeredQuestions: 0,
  difficulty: "",
  categories: [],
  categoryId: "",
};

export const fetchCategories = createAsyncThunk(
  "gamePlay/fetchCategory",
  async () => {
    try {
      const response = await axios.get("https://opentdb.com/api_category.php");
      return response.data.trivia_categories;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchQuestionsAndAnswers = createAsyncThunk(
  "gamePlay/fetchQuestionsAndAnswers",
  async (categoryId, difficulty) => {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=15&category=${Number(
          categoryId
        )}&difficulty=${difficulty.toLowerCase()}&type=multiple`
      );
      console.log(response.data.results);
      return response.data.results;
    } catch (error) {
      throw error;
    }
  }
);

const gamePlaySlice = createSlice({
  name: "gamePlay",
  initialState,
  reducers: {
    //we should receive the requested questions
    updateQuestions: (state, action) => {
      state.questions = action.payload;
    },
    // we are counting the correctly answered questions
    updateUserStatistics: (state, action) => {
      state.answeredQuestions += 1;
    },
    //the user select one of 3 options
    updateDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
    // the user have selects a category and we save the id
    updateCategory: (state, action) => {
      state.categoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(fetchQuestionsAndAnswers.fulfilled, (state, action) => {
      state.questions = action.payload;
    });
  },
});

export const {
  updateQuestions,
  updateUserStatistics,
  updateDifficulty,
  updateCategory,
} = gamePlaySlice.actions;

export default gamePlaySlice.reducer;
