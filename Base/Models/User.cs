using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

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
        
        [Key]
        public int UserId { get; set; }
        
        [MaxLength(30)]
        public string Name { get; set; }
        
        [MaxLength(50)]
        public string LastName { get; set; }

        public List<UserRole> UserRoles { get; set; }
    }
}

