using System;
using System.Linq;
using System.Collections.Generic;

namespace Base.Models
{
    public class UserRepository : IUserRepository
    {
        
        private BaseContext context;

        public UserRepository(BaseContext context)
        {
            //Add(new TodoItem { Name = "Item1" });
            this.context = context;
        }

        public IEnumerable<User> GetAll()
        {
            return context.Users;
        }

        public void Add(User item)
        {
            context.Users.Add(item);
            context.SaveChanges();
        }

        public User Find(int key)
        {
            User item = null;
            item = context.Users.Where(d => d.Id == key).SingleOrDefault();
            return item;
        }

        public User Remove(int key)
        {
            //User item;
            //context.Users.TryRemove(key, out item);
            //context.SaveChanges();
            //return item;
            return null;
        }

        public void Update(User item)
        {
            User itemToUpdate = this.Find(item.Id);
            itemToUpdate = item;
            context.SaveChanges();
        }
    }
}