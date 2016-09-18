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
        {
            this.Database.EnsureCreated();
        }
         
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }

        public DbSet<UserRole> UserRoles { get; set; }
 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>()
            .ToTable("User")
            .HasMany(d => d.UserRoles);

            modelBuilder.Entity<Role>()
            .ToTable("Role")
            .HasKey(d => d.RoleId);
            

            modelBuilder.Entity<Role>()
            .HasMany(d => d.UserRoles);
            

            modelBuilder.Entity<UserRole>()
                .ToTable("UserRole")
                .HasKey(t => new { t.UserId, t.RoleId });

            modelBuilder.Entity<UserRole>()
                .HasOne(pt => pt.User)
                .WithMany(p => p.UserRoles)
                .HasForeignKey(pt => pt.UserId);

            modelBuilder.Entity<UserRole>()
                .HasOne(pt => pt.Role)
                .WithMany(p => p.UserRoles)
                .HasForeignKey(pt => pt.RoleId);

                base.OnModelCreating(modelBuilder);
                
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            //optionsBuilder.UseMySql(optionsBuilder);
        }
      
    }
}


 
