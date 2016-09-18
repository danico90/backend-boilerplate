using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Base.Models
{
    public interface IRoleRepository
    {
        IEnumerable<Role> GetAll();
        Role Find(int key);
   }
}