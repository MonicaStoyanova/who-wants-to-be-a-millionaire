import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  questions: [],
  correctAnswer: "",
  incorrectAnswers: [],
  status: "idle",
  error: null,
  answeredQuestionsCount: 0,
  difficulty: "",
  categories: [],
  categoryId: "",
  gameStage: "running",
  fiftyFiftyJoker: {
    used: false,
    questionIndex: null,
  },
  audienceHelpJoker: {
    used: false,
    questionIndex: null,
  },
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
  async ({ categoryId, difficulty }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=15&category=${Number(
          categoryId
        )}&difficulty=${difficulty}&type=multiple`
      );
      return response.data.results;
    } catch (error) {
      return rejectWithValue({ message: "Error fetching questions", error });
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
    updateCorrectAnswer: (state, action) => {
      state.correctAnswer = action.payload;
    },
    updateIncorrectAnswers: (state, action) => {
      state.incorrectAnswers = action.payload;
    },
    // we are counting the correctly answered questions
    updateUserStatistics: (state, action) => {
      state.answeredQuestionsCount += 1;
    },
    //the user select one of 3 options
    updateDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
    // the user have selects a category and we save the id
    updateCategory: (state, action) => {
      state.categoryId = action.payload;
    },

    updateGameStage: (state, action) => {
      state.gameStage = action.payload;
    },
    // resetting the state, when the user clicks play again button
    resetGame: (state, action) => {
      state.difficulty = initialState.difficulty;
      state.categories = initialState.categories;
      state.answeredQuestionsCount = initialState.answeredQuestionsCount;
      state.fiftyFiftyJoker = initialState.fiftyFiftyJoker;
    },
    applyFiftyFifty: (state, action) => {
      state.fiftyFiftyJoker.used = action.payload.used;
      state.fiftyFiftyJoker.questionIndex = action.payload.questionIndex;
    },
    applyAudienceHelp: (state, action) => {
      state.audienceHelpJoker.used = action.payload.used;
      state.audienceHelpJoker.questionIndex = action.payload.questionIndex;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder
      .addCase(fetchQuestionsAndAnswers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestionsAndAnswers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
      })
      .addCase(fetchQuestionsAndAnswers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const {
  updateQuestions,
  updateCorrectAnswer,
  updateIncorrectAnswers,
  updateUserStatistics,
  updateDifficulty,
  updateCategory,
  updateGameStage,
  resetGame,
  applyFiftyFifty,
  applyAudienceHelp,
} = gamePlaySlice.actions;

export default gamePlaySlice.reducer;
