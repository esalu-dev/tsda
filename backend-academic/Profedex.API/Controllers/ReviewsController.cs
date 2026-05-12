using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Profedex.Application.DTOs.Review;
using Profedex.Application.UseCases;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Profedex.API.Controllers;

[ApiController]
[Route("api/")]
[Authorize]
public class ReviewsController : ControllerBase
{
    private readonly CreateReviewUseCase _createReviewUseCase;
    private readonly GetTeacherReviewsUseCase _getTeacherReviewsUseCase;
    private readonly DeleteReviewUseCase _deleteReviewUseCase;

    public ReviewsController(
        CreateReviewUseCase createReviewUseCase,
        GetTeacherReviewsUseCase getTeacherReviewsUseCase,
        DeleteReviewUseCase deleteReviewUseCase)
    {
        _createReviewUseCase = createReviewUseCase;
        _getTeacherReviewsUseCase = getTeacherReviewsUseCase;
        _deleteReviewUseCase = deleteReviewUseCase;
    }

    [HttpPost("teachers/{teacherId}/reviews")]
    public async Task<IActionResult> CreateReview(int teacherId, [FromBody] CreateReviewDto dto)
    {
        try
        {   
            // JWT "sub" claim contains the user ID in NestJS
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var review = await _createReviewUseCase.ExecuteAsync(dto, userId, teacherId);
            return Ok(review);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("teachers/{id}/reviews")]
    public async Task<IActionResult> GetTeacherReviews(int id)
    {
        var reviews = await _getTeacherReviewsUseCase.ExecuteAsync(id);
        return Ok(reviews);
    }

    [HttpDelete("reviews/{id}")]
    public async Task<IActionResult> DeleteReview(int id)
    {
        try
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();
            
            var isAdmin = User.IsInRole("ADMIN");

            await _deleteReviewUseCase.ExecuteAsync(id, userId, isAdmin);
            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
