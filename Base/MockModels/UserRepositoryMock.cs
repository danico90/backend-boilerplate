using System.Linq;
using System.Collections.Generic;
using Base.Models;

namespace Base.ModelsMock
{
    public class UserRepositoryMock : IUserRepository
    {
        
        private BaseContext context;

        public UserRepositoryMock(BaseContext context)
        {
            //Add(new TodoItem { Name = "Item1" });
            this.context = context;
        }

        public IEnumerable<User> GetAll()
        {
            return new User[] {
                    new User() { UserId= 1, Name= "Daniel", LastName= "Jimenez" },
                    new User() { UserId= 2, Name= "Daniel", LastName= "Jimenez" },
                    new User() { UserId= 3, Name= "Daniel", LastName= "Jimenez" }
                };
        }

        public void Add(User item)
        {
            context.Users.Add(item);
            context.SaveChanges();
        }

        public User Find(int key)
        {
            User item = null;
            item = context.Users.Where(d => d.UserId == key).SingleOrDefault();
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
            User itemToUpdate = this.Find(item.UserId);
            itemToUpdate = item;
            context.SaveChanges();
        }
    }
}