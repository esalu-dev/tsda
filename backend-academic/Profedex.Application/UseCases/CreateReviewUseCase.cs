using Profedex.Application.DTOs.Review;
using Profedex.Domain.Entities;
using Profedex.Domain.Interfaces;
using System;
using System.Threading.Tasks;

namespace Profedex.Application.UseCases;

public class CreateReviewUseCase
{
    private readonly IReviewRepository _reviewRepository;
    private readonly ITeacherRepository _teacherRepository;
    private readonly IMateriaRepository _materiaRepository;

    public CreateReviewUseCase(
        IReviewRepository reviewRepository,
        ITeacherRepository teacherRepository,
        IMateriaRepository materiaRepository)
    {
        _reviewRepository = reviewRepository;
        _teacherRepository = teacherRepository;
        _materiaRepository = materiaRepository;
    }

    public async Task<Review> ExecuteAsync(CreateReviewDto dto, string userId, int teacherId)
    {
        var teacher = await _teacherRepository.GetByIdAsync(teacherId);
        if (teacher == null) throw new Exception("Profesor no encontrado.");

        var materia = await _materiaRepository.GetByIdAsync(dto.MateriaId);
        if (materia == null) throw new Exception("Materia no encontrada.");

        var review = new Review
        {
            TeacherId = teacherId,
            MateriaId = dto.MateriaId,
            UserId = userId,
            Body = dto.Body,
            Rating = dto.Rating,
            Difficulty = dto.Difficulty,
            WouldTakeAgain = dto.WouldTakeAgain,
            LearningLevel = dto.LearningLevel,
            Published = true
        };

        return await _reviewRepository.AddAsync(review);
    }
}
