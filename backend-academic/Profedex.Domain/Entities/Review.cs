using System;

namespace Profedex.Domain.Entities;

public class Review
{
    public int Id { get; set; }
    
    // Identificador lógico del usuario en NestJS
    public string UserId { get; set; } = string.Empty; 
    
    public int TeacherId { get; set; }
    public int MateriaId { get; set; }
    
    public string Body { get; set; } = string.Empty;
    public int Rating { get; set; }
    public int Difficulty { get; set; }
    public bool WouldTakeAgain { get; set; }
    public int LearningLevel { get; set; }
    public bool Published { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; }

    // Navigation Properties
    public Teacher Teacher { get; set; } = null!;
    public Materia Materia { get; set; } = null!;
}
