using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Base.Models
{
    /// <summary>
    /// User class
    /// </summary>
    public class Role
    {
        public Role()
        {
        }
        
        [Key]
        public int RoleId { get; set; }
        
        [MaxLength(30)]
        public string Description { get; set; }

        public List<UserRole> UserRoles { get; set; }
    }
}

