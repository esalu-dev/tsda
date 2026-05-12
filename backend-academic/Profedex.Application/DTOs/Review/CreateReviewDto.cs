namespace Profedex.Application.DTOs.Review;

public record CreateReviewDto(
    int MateriaId,
    string Body,
    int Rating,
    int Difficulty,
    bool WouldTakeAgain,
    int LearningLevel
);
