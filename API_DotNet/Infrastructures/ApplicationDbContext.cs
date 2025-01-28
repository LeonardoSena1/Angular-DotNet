using API_DotNet.Models.User;
using Microsoft.EntityFrameworkCore;

namespace API_DotNet.Infrastructures
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Users> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Users>(e =>
            {
                e.HasKey(e => e.Id);

                e.HasIndex(h => new { h.Id, h.CPF })
                    .IsUnique();
            });
        }

    }
}
