using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
 
namespace Base.Models
{ 
    // >dotnet ef migration add testMigration
    public class BaseContext : DbContext
    {
        public BaseContext(DbContextOptions<BaseContext> options) :base(options)
        { }
         
        public DbSet<User> Users { get; set; }
 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .ToTable("User");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            //optionsBuilder.UseMySql(optionsBuilder);
        }
      
    }
}

// using System;
// using System.Linq;
// using System.Collections.Generic;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.Configuration;

// namespace Base.Models
// {
//     /// <summary>
//     /// The entity framework context with a Employees DbSet
//     /// </summary>
//     public class BaseContext : DbContext
//     {
//         public BaseContext(DbContextOptions<BaseContext> options) : base(options)
//         {
//         }
    
//         public DbSet<User> Users { get; set; }

//         protected override void OnModelCreating(ModelBuilder modelBuilder)
//         {
//             modelBuilder.Entity<User>()
//                 .ToTable("User");
//         }

//     }
 
   
// }


 
