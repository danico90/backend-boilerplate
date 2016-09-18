using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Base.Models
{
    public interface IUserRepository
    {
        void Add(User item);
        IEnumerable<User> GetAll();
        User Find(int key);
        User Remove(int key);
        void Update(User item);
    }
}