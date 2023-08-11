package com.exam.service.imple;

import com.exam.model.exam.Category;
import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.repo.CategoryRepository;
import com.exam.service.CategoryService;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class CategoryServiceImpl  implements CategoryService {

    @Autowired
    private QuizService quizService;
    @Autowired
    private QuestionService questionService;
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public Category addCategory(Category category)
    {
        return this.categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Category category)
    {
        return this.categoryRepository.save(category);
    }

    @Override
    public Set<Category> getCategories()
    {
        return  new LinkedHashSet<>(this.categoryRepository.findAll());
    }

    @Override
    public Category getCategory(Long categoryId)
    {
        return this.categoryRepository.findById(categoryId).get();
    }

    @Override
    public void deleteCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        if (category != null) {
            Set<Quiz> quizzes = quizService.getQuizzesByCategory(category);
            if (!quizzes.isEmpty()) {
                for (Quiz quiz : quizzes) {
                    Set<Question> questions = quiz.getQuestions();
                    if (!questions.isEmpty()) {
                        for (Question question : questions) {
                            question.setQuiz(null);
                            questionService.updateQuestion(question);
                        }
                    }
                    quiz.setCategory(null);
                    quizService.updateQuiz(quiz);
                    quizService.deleteQuiz(quiz.getqId());
                }
            }
            categoryRepository.delete(category);
        }
    }


}



