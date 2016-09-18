using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Base.Models
{
    /// <summary>
    /// User class
    /// </summary>
    public class User
    {
        public User()
        {
        }
        
        public int Id { get; set; }
        
        [MaxLength(30)]
        public string Name { get; set; }
        
        [MaxLength(50)]
        public string LastName { get; set; }
    }
}

