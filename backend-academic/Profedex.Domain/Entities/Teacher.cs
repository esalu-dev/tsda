using System;
using System.Collections.Generic;
using System.Text;

namespace Profedex.Domain.Entities;

public class Teacher
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string ApellidoPaterno { get; set; }
    public string ApellidoMaterno { get; set; }
    public string Shortname { get; set; }
    public bool Active { get; set; } = true;

    public ICollection<Review> Reviews { get; set; } = new List<Review>();
}
