using System;

namespace Profedex.Domain.Entities;

public class Materia
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Carrera { get; set; } = string.Empty;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; }

    public System.Collections.Generic.ICollection<Review> Reviews { get; set; } = new System.Collections.Generic.List<Review>();
}
