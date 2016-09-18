using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Base.Models
{
    public class RoleRepository : IRoleRepository
    {
        
        private BaseContext context;

        public RoleRepository(BaseContext context)
        {
            //Add(new TodoItem { Name = "Item1" });
            this.context = context;
        }

        public IEnumerable<Role> GetAll()
        {
            return context.Roles.Include( r => r.UserRoles);
        }


        public Role Find(int key)
        {
            Role item = null;
            item = context.Roles.Where(d => d.RoleId == key).Include(d => d.UserRoles).SingleOrDefault();
            return item;
        }

    }
}