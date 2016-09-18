using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Base.Models
{
    /// <summary>
    /// User class
    /// </summary>
    public class UserRole
    {
        public UserRole()
        {
        }
        
        [Key]
        public int UserId { get; set; }

        public User User { get; set; }

        [Key]
        public int RoleId { get; set; }

        public Role Role { get; set; }
        
        
    }
}

