using API_DotNet.Models.Product;
using API_DotNet.Models.User;
using Microsoft.EntityFrameworkCore;

namespace API_DotNet.Infrastructures
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Users> Users { get; set; }
        public DbSet<Products> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Users>(e =>
            {
                e.HasKey(e => e.Id);

                e.HasIndex(h => new { h.Id, h.CPF })
                    .IsUnique();
            });

            modelBuilder.Entity<Products>(e =>
            {
                e.HasKey(e => e.Id);

                e.HasIndex(h => new { h.Id })
                    .IsUnique();

                e.Property(e => e.Preco)
                    .HasColumnType("DECIMAL(18,2)");
            });
        }

    }
}
